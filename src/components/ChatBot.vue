<template>
  <div class="min-h-[100svh] h-dvh w-full bg-gray-100 flex flex-col overflow-hidden chat-root">
    <!-- Header -->
    <div class="w-full p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center text-lg font-semibold shadow">
      アルファセプの入国後講習
    </div>

    <!-- Chat box -->
    <div id="chat-box" ref="chatBox" class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-for="(m,i) in messages"
        :key="i"
        class="animate-fadeInUp"
        :class="m.role==='user' ? 'flex justify-end' : 'flex items-start'"
      >
        <div
          class="p-3 rounded-2xl shadow msg-bubble"
          :class="m.role==='user' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-800'"
          v-html="m.text"
        />
      </div>
    </div>

    <!-- Input (ẩn khi phase==='done') -->
    <form
      v-if="phase !== 'done'"
      @submit.prevent="onSubmit"
      class="p-3 flex items-center border-t bg-white z-10"
    >
      <input
        v-model.trim="input"
        :placeholder="placeholder"
        type="text"
        class="flex-1 p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        :disabled="isSending"
        autofocus
      />
      <button
        type="submit"
        class="ml-2 bg-indigo-500 text-white px-4 py-2 rounded-full shadow disabled:opacity-50"
        :disabled="isSending || !input"
      >
        Gửi
      </button>
    </form>

    <!-- Thanh cảm ơn khi xong -->
    <div v-else class="p-4 text-center text-sm text-gray-700 border-t bg-white">
      ありがとうございました。入国後講習のQ&amp;Aは以上です。ご協力に感謝いたします。🙏
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { RateLimiter } from "@/utils/rateLimiter";

// Bộ câu hỏi (backup client). Server là nguồn chuẩn.
const QUESTIONS = {
  student: [],
  company: [],
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function makeIdKey(sessionId, code, data = "") {
  const raw = `${sessionId}:${code}:${data.slice(0, 200)}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) { h = (h << 5) - h + raw.charCodeAt(i); h |= 0; }
  return `${code}-${sessionId}-${Math.abs(h)}`;
}

const limiter = new RateLimiter({ capacity: 2, refillIntervalMs: 2500, tokensPerInterval: 1 });

export default {
  name: "ChatBot",
  data() {
    return {
      messages: [],
      input: "",
      placeholder: "1（学生）または2（ビジネス）を入力してください...",
      phase: "picking", // picking -> asking -> done
      track: null,      // 'student' | 'company'
      sessionId: null,
      questions: [],
      idx: -1,
      isSending: false,
      answers: [],      // {code,q,a,idempotencyKey}
    };
  },
  mounted() {
    // Animation CSS nội tuyến
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeInUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
      .animate-fadeInUp { animation: fadeInUp .35s ease-out both; }
    `;
    document.head.appendChild(style);

    // Lời chào & hướng dẫn chọn nhóm
    this.bot("こんにちは👋。質問グループを選択してください:<br/>1) 受講者向け<br/>2) 企業向け");
  },
  methods: {
    // --- Scroll helpers (chỉ cuộn khi đang ở gần đáy) ---
    isNearBottom() {
      const el = this.$refs.chatBox;
      if (!el) return true;
      const threshold = 60; // px
      return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    },
    scrollToBottom() {
       this.$nextTick(() => {
          const el = this.$refs.chatBox;
          if (el) {
            el.scrollTop = el.scrollHeight;
          }
        });
    },

    // --- UI helpers ---
    bot(html) {
      this.messages.push({ role: "bot", text: html });
      this.scrollToBottom();
    },
    user(text) {
      this.messages.push({ role: "user", text });
      this.scrollToBottom();
    },
    escape(s) {
      return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
    },

    // --- Submit flow ---
    async onSubmit() {
      const text = this.input;
      if (!text) return;
      this.input = "";
      this.user(this.escape(text));

      if (this.phase === "picking") {
        if (text === "1" || /học viên|受講者/i.test(text)) this.track = "student";
        else if (text === "2" || /doanh nghiệp|企業/i.test(text)) this.track = "company";
        else { this.bot("<b>1</b> または <b>2</b> を入力してください."); return; }

        await this.createSession();
        await this.loadQuestions();
        this.phase = "asking";
        this.placeholder = "回答を入力してください…";
        this.idx = -1;
        await this.askNext();
        return;
      }

      if (this.phase === "asking") {
        const q = this.questions[this.idx];
        if (!q) return;

        const idk = makeIdKey(this.sessionId, q.code, text);
        const item = { code: q.code, q: q.text || q.q, a: text, idempotencyKey: idk };
        this.answers.push(item);

        await this.sendOne(item);   // gửi từng câu (có limiter + backoff)
        await sleep(300);
        await this.askNext();
        return;
      }

      // phase === 'done' -> input đã ẩn, không còn nhận submit
    },

    // --- API calls ---
    async createSession() {
      const res = await api.post("/qa/session", { track: this.track });
      this.sessionId = res.data.session_id;
      sessionStorage.setItem("qa_session_id", this.sessionId);
    },

    async loadQuestions() {
      try {
        const res = await api.get(`/qa/questions`, { params: { track: this.track } });
        this.questions = (res.data?.items || []).map(x => ({ code: x.code, q: x.text, text: x.text }));
      } catch {
        // Fallback nếu API lỗi
        this.questions = QUESTIONS[this.track] || [];
      }
    },

    async askNext() {
      this.idx++;
      if (this.idx >= this.questions.length) {
        // KẾT THÚC: ẩn input (phase='done') & gửi lời cảm ơn tiếng Nhật
        this.phase = "done";
        this.input = "";
        this.bot("ご回答ありがとうございました。入国後講習のQ&Aは以上です。ご協力に感謝いたします。🙏");
        return;
      }
      const q = this.questions[this.idx];
      this.bot(q.text || q.q);
    },

    async sendOne({ code, q, a, idempotencyKey }) {
      this.isSending = true;
      const payload = {
        session_id: this.sessionId,
        track: this.track,
        question_code: code,
        question_text: q,
        answer: a,
        idempotency_key: idempotencyKey,
        ts: Date.now(),
      };
      const doPost = () => api.post("/qa/answer", payload);

      try {
        const res = await this.withRetries(() => limiter.schedule(doPost));
        if (res?.data?.status === "duplicate") {
          this.bot("✔️ Đã ghi nhận (idempotent).");
        }
      } catch (e) {
        this.bot("⚠️ 送信エラーが発生しました。システムは引き続き質問しますので、後で返信してください。");
      } finally {
        this.isSending = false;
      }
    },

    async withRetries(fn, { retries = 3, base = 600 } = {}) {
      let attempt = 0;
      for (;;) {
        try {
          return await fn();
        } catch (err) {
          attempt++;
          if (attempt > retries) throw err;
          const status = err?.response?.status;
          const jitter = Math.floor(Math.random() * 200);
          const delay = (status === 429 || status === 503)
            ? base * attempt * 2 + jitter
            : base * attempt + jitter;
          await sleep(delay);
        }
      }
    },

    reset() {
      this.messages = [];
      this.phase = "picking";
      this.placeholder = "1（学生）または2（ビジネス）を入力してください...";
      this.track = null;
      this.sessionId = null;
      this.questions = [];
      this.idx = -1;
      this.answers = [];
      this.bot("こんにちは👋。質問グループを選択してください:<br/>1) 受講者向け<br/>2) 企業向け");
    },
  },
};
</script>

<!-- Global (không scoped): khoá body, chống giật scroll, chống tràn -->
<style>
html, body, #app { height: 100%; }
body {
  margin: 0;
  overflow: hidden;                     /* chỉ chat-box cuộn */
  scrollbar-gutter: stable both-edges;  /* tránh layout nhảy do scrollbar */
}
.chat-root { overscroll-behavior: contain; }
#chat-box { overflow-anchor: none; scroll-behavior: smooth; }
.msg-bubble {
  max-width: 75%;
  width: fit-content;
  word-break: break-word;
  overflow-wrap: anywhere;
}
</style>

<!-- Scoped: animation nhỏ -->
<style scoped>
@keyframes fadeInUp { 0%{opacity:0;transform:translateY(20px)} 100%{opacity:1;transform:translateY(0)} }
.animate-fadeInUp { animation: fadeInUp .35s ease-out both; }
</style>
