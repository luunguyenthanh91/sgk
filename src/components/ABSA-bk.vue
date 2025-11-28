<template>
  <div ref="exportRoot">
    <section class="page" v-for="(pg, idx) in groups" :key="idx">
      <div class="header-page">
        <span class="title-sgk">Level SA</span>
        <span class="title-sgk">Abacus Arithmetic</span>
        <span class="page-sgk"></span>
      </div>

      <!-- TRANG LẺ: 40 câu — Nhân / Chia -->
      <template v-if="pg.mode === 'muldiv40'">
        <main class="muldiv-grid">
          <!-- BÊN TRÁI: NHÂN -->
          <div class="half">
            <table class="md-table">
              <thead>
                <tr>
                  <th class="no-col">No.</th>
                  <th
                    style="
                      font-size: 19px;
                      font-weight: bold;
                      line-height: 18px;
                      font-family: 'STIX Two Math', 'Cambria Math', 'Noto Sans Math',
                        'Segoe UI Symbol', 'Apple Symbols', serif;
                    "
                  >
                    &times;
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(q, i) in pg.mul" :key="'m-' + i">
                  <td class="no-col">{{ i + 1 }}</td>
                  <td class="expr">
                    {{ formatNumberForClient(q.a) }} × {{ formatNumberForClient(q.b) }} =
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- BÊN PHẢI: CHIA -->
          <div class="half">
            <table class="md-table">
              <thead>
                <tr>
                  <th class="no-col">No.</th>
                  <th
                    style="
                      font-size: 20px;
                      font-weight: bold;
                      line-height: 20px;
                      font-family: 'STIX Two Math', 'Cambria Math', 'Noto Sans Math',
                        'Segoe UI Symbol', 'Apple Symbols', serif;
                    "
                  >
                    &divide;
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(q, i) in pg.div" :key="'d-' + i">
                  <td class="no-col">{{ i + 1 }}</td>
                  <td class="expr">
                    {{ formatNumberForClient(q.dividend) }} ÷
                    {{ formatNumberForClient(q.divisor) }} =
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

        <div class="header-page align-end">
          <span class="page-sgk"></span>
          <span class="page-sgk">{{ pg.pageIndex }}</span>
          <span class="page-sgk"></span>
        </div>
      </template>

      <!-- TRANG CHẴN: GIỮ NGUYÊN -->
      <template v-else>
        <main
          class="sheet-grid"
          :style="{ gridTemplateRows: sheetGridTemplateForPage(pg.items) }"
        >
          <div class="table" v-for="(group, gIdx) in pg.items" :key="gIdx">
            <div class="tbody">
              <div class="td td-stt" v-if="group.length > 0">
                <span class="header">No.</span>
                <span v-for="(n, idxa) in group[0].numbers" :key="idxa">
                  <span class="num"
                    ><span class="val">{{ idxa + 1 }}</span></span
                  >
                </span>
                <span class="footer">A.</span>
              </div>
              <div class="td" v-for="(q, qIdx) in group" :key="qIdx">
                <span class="header">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ q.id }}</span>
                <div class="numbers" :style="{ '--rows': q.numbers.length }">
                  <span v-for="(n, idx) in q.numbers" :key="idx" class="num">
                    <span class="sign" v-if="n < 0">-</span>
                    <span class="sign" v-else>&nbsp;</span>
                    <span class="val">{{ formatVal(n, q.format) }}</span>
                  </span>
                </div>
                <span class="footer"></span>
              </div>
            </div>
          </div>
        </main>

        <div class="header-page align-end">
          <span class="page-sgk"></span>
          <span class="page-sgk">{{ pg.pageIndex }}</span>
          <span class="page-sgk"></span>
        </div>
      </template>
    </section>

    <section
      class="page answers-matrix"
      v-for="(chunk, ci) in muldivAnswerSheets"
      :key="'ans-md-' + ci"
    >
      <div class="header-page">
        <span class="title-sgk">Level SA</span>
        <span class="title-sgk">Abacus Arithmetic</span>
        <span class="title-sgk">Answers</span>
      </div>

      <main class="sheet-grid">
        <!-- BẢNG TRÊN: 7 trang lẻ đầu của chunk -->
        <table class="answers-table matrix">
          <thead>
            <tr>
              <th class="corner-cell">
                <span class="top-right">Pg.</span><span class="bottom-left">No.</span>
              </th>
              <th v-for="p in chunk.top" :key="'top-h-' + p">{{ p ?? "" }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in 20" :key="'top-r-' + row">
              <td class="q-index">{{ row }}</td>
              <td
                v-for="p in chunk.top"
                :key="'top-c-' + p + '-' + row"
                class="answer-cell"
                :class="{ split2: p && p % 2 === 1 }"
              >
                <template v-if="p && p % 2 === 1">
                  <!-- TRANG LẺ: nhân | chia -->
                  <div class="totla_data">
                    <span class="footer-text-x">{{ getMulAns(p, row) }}</span>
                    <span class="footer-text">{{ getDivAns(p, row) }}</span>
                  </div>
                </template>
                <template v-else-if="p">
                  <!-- TRANG CHẴN: tổng (sum) -->
                  {{ getAnswer(p, row) }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- BẢNG DƯỚI: 7 trang lẻ tiếp theo của chunk -->
        <table class="answers-table matrix sum-table">
          <thead>
            <tr>
              <th class="corner-cell">
                <span class="top-right">Pg.</span><span class="bottom-left">No.</span>
              </th>
              <th v-for="p in chunk.bottom" :key="'bot-h-' + p">{{ p ?? "" }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in 10" :key="'bot-r-' + row">
              <td class="q-index">{{ row }}</td>
              <td
                v-for="p in chunk.bottom"
                :key="'bot-c-' + p + '-' + row"
                class="answer-cell"
                :class="{ split2: p && p % 2 === 1 }"
              >
                <template v-if="p && p % 2 === 1">
                  <span>{{ getMulAns(p, row) }}</span>
                  <span>{{ getDivAns(p, row) }}</span>
                </template>
                <template v-else-if="p">
                  {{ getAnswer(p, row) }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <div class="header-page align-end">
        <span class="page-sgk"></span>
        <span class="page-sgk">{{ baseHeaderIndex + ci + 1 }}</span>
        <span class="page-sgk"></span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ABSA",
  data() {
    return {
      groups: [], // <-- mảng thật
      answerPages: [], // <-- mảng thật
      mulAnsMap: {}, // { [page]: { [row 1..20]: product } }
      divAnsMap: {}, // { [page]: { [row 1..20]: quotient } }
    };
  },
  computed: {
    muldivAnswerSheets() {
      const allPages = (this.groups || []).map((g) => g.pageIndex).sort((a, b) => a - b);
      const has = new Set(allPages);
      const odds = allPages.filter((p) => p % 2 === 1);

      const PER_ROW = 5;
      const out = [];
      for (let i = 0; i < odds.length; i += PER_ROW) {
        const top = odds.slice(i, i + PER_ROW);
        const bottom = top.map((p) => (has.has(p + 1) ? p + 1 : null)); // 2,4,6,...

        while (top.length < PER_ROW) {
          top.push(null);
          bottom.push(null);
        }
        out.push({ top, bottom });
      }
      if (out.length === 0)
        out.push({ top: Array(PER_ROW).fill(null), bottom: Array(PER_ROW).fill(null) });
      return out;
    },
    answerPagesMatrix() {
      const pages = this.allPagesSorted || [];
      const PER_TABLE = 12;
      const PER_PAGE = PER_TABLE * 2;

      const result = [];
      for (let i = 0; i < pages.length; i += PER_PAGE) {
        const slice = pages.slice(i, i + PER_PAGE);
        const left = slice.slice(0, PER_TABLE);
        const right = slice.slice(PER_TABLE, PER_PAGE);

        while (left.length < PER_TABLE) left.push(null);
        while (right.length < PER_TABLE) right.push(null);

        result.push({ left, right });
      }

      // Nếu chưa có trang nào, vẫn render 1 trang rỗng đủ 12/12
      if (result.length === 0) {
        result.push({
          left: Array(PER_TABLE).fill(null),
          right: Array(PER_TABLE).fill(null),
        });
      }
      return result;
    },
    answerMatrixChunksSplit() {
      return (this.answerMatrixChunks || []).map((cols) => {
        const arr = Array.isArray(cols) ? cols : [];
        const mid = Math.ceil(arr.length / 2);
        return { left: arr.slice(0, mid), right: arr.slice(mid) };
      });
    },
    leftCols(cols) {
      const mid = Math.ceil((cols?.length || 0) / 2);
      return (cols || []).slice(0, mid);
    },
    rightCols(cols) {
      const mid = Math.ceil((cols?.length || 0) / 2);
      return (cols || []).slice(mid);
    },
    baseHeaderIndex() {
      return Array.isArray(this.groups) ? this.groups.length : 0;
    },
    // Normalize to: [{ page:Number, id:Number, sum:any }, ...]
    flatAnswers() {
      const ap = this.answerPages;
      if (!ap) return [];

      if (
        Array.isArray(ap) &&
        ap.every((x) => x && typeof x === "object" && "page" in x && "id" in x)
      ) {
        return ap.map((x) => ({
          page: Number(x.page),
          id: Number(x.id),
          sum: x.sum,
        }));
      }

      if (Array.isArray(ap) && ap.every((x) => Array.isArray(x))) {
        return ap.flat().map((x) => ({
          page: Number(x.page),
          id: Number(x.id),
          sum: x.sum,
        }));
      }

      if (
        Array.isArray(ap) &&
        ap.every((x) => x && typeof x === "object" && Array.isArray(x.items))
      ) {
        return ap.flatMap((group) =>
          group.items.map((it) => ({
            page: Number(it.page ?? group.page ?? group.pageIndex),
            id: Number(it.id),
            sum: it.sum,
          }))
        );
      }

      if (ap && typeof ap === "object" && !Array.isArray(ap)) {
        return Object.entries(ap).flatMap(([pageKey, arr]) => {
          const pageNum = Number(pageKey);
          return (Array.isArray(arr) ? arr : []).map((it) => ({
            page: Number(it.page ?? pageNum),
            id: Number(it.id),
            sum: it.sum,
          }));
        });
      }

      return [];
    },
    // Lookup: answerMap[page][id] = sum
    answerMap() {
      const map = Object.create(null);
      for (const a of this.flatAnswers) {
        if (!Number.isFinite(a.page) || !Number.isFinite(a.id)) continue;
        if (!map[a.page]) map[a.page] = Object.create(null);
        map[a.page][a.id] = a.sum;
      }
      return map;
    },
    // Unique page numbers sorted
    allPagesSorted() {
      const set = new Set(
        (Array.isArray(this.flatAnswers) ? this.flatAnswers : [])
          .map((a) => Number(a.page))
          .filter((n) => Number.isFinite(n))
      );
      return Array.from(set).sort((a, b) => a - b);
    },
    // Split columns into exactly 3 chunks
    answerMatrixChunks() {
      const cols = this.allPagesSorted;
      const chunks = 3;
      const per = Math.ceil((cols.length || 1) / chunks);
      const out = [];
      for (let i = 0; i < chunks; i++) {
        const start = i * per;
        const end = start + per;
        out.push(cols.slice(start, end));
      }
      while (out.length < 3) out.push([]);
      return out;
    },
  },
  mounted() {
    const TOTAL_PAGES = 64; // ví dụ
    const ODD_COUNT = Math.ceil(TOTAL_PAGES / 2);
    const EVEN_COUNT = Math.floor(TOTAL_PAGES / 2);
    const oddPages = [];
    for (let i = 0; i < ODD_COUNT; i++) {
      oddPages.push(this.makeMulDivPage(2 * i + 1)); // 1,3,5,...
    }

    const itemsEven = [];

    // ✅ đúng: tạo theo TRANG, mỗi trang 15 câu (5+5+5)
    for (let page = 0; page < EVEN_COUNT; page++) {
      for (let k = 0; k < 5; k++) {
        const s = this.genSequence({ count: 7, scale: "thousands", negCount: 3 });
        itemsEven.push({
          numbers: s.numbers,
          sum: s.sum,
          type: 6,
          place: "hundreds",
          format: s.format,
        });
      }
      // 5 câu decimal
      // 5 câu decimal
      for (let k = 0; k < 5; k++) {
        // Chia 10 số thành 2 nhóm:
        // - 'thousands'  : 1000.01 .. 9999.99  (4 chữ số phần nguyên)
        // - 'hundreds'   :  100.01 ..  999.99  (3 chữ số phần nguyên)
        //
        // Tránh all-in 1 nhóm: cho thousandsCount trong [2..8], còn lại là hundreds
        const thousandsCount = this.randInt(2, 8);
        const hundredsCount = 10 - thousandsCount;

        const s = this.genSequence({
          count: 10, // 10 số
          scale: "decimal", // dùng builder thập phân
          negCount: 3, // đúng 3 dấu trừ, vị trí random (hàm buildSignsRandom đã đảm bảo phần tử đầu dương)
          decScale: "hundreds", // fallback nếu decMix chưa đủ
          decMix: {
            // phối hợp theo yêu cầu (3 & 4 chữ số phần nguyên)
            hundreds: hundredsCount, // 100.01 .. 999.99
            thousands: thousandsCount, // 1000.01 .. 9999.99
          },
          // zeroSlots: 0  // không cần 0.xx trong yêu cầu này
        });

        itemsEven.push({
          numbers: s.numbers,
          sum: s.sum,
          type: 6,
          place: "dec",
          format: s.format, // "decimal"
        });
      }
    }

    const evenPages = this.nestPages(itemsEven, 10, 5);
    // gán pageIndex chẵn: 2,4,6,...
    evenPages.forEach((p, idx) => {
      const newPage = 2 * (idx + 1);
      p.pageIndex = newPage;
      p.items = p.items.map((col) => col.map((q) => ({ ...q, page: newPage })));
    });

    // 3) TRỘN LẺ–CHẴN THEO THỨ TỰ
    const merged = [];
    const L = Math.max(oddPages.length, evenPages.length);
    for (let i = 0; i < L; i++) {
      if (i < oddPages.length) merged.push(oddPages[i]);
      if (i < evenPages.length) merged.push(evenPages[i]);
    }
    this.groups = merged;

    // 4) Tính đáp án cho TRANG CHẴN (cơ chế cũ)
    this.answerPages = this.makeAnswerPages(3);
  },

  methods: {
    roundNicely(x, digits = 4) {
      // làm tròn số thập phân để hiển thị gọn (ví dụ 4 chữ số)
      // tránh -0 và các lỗi làm tròn nổi
      const f = Number.parseFloat(Number(x).toFixed(digits));
      return Object.is(f, -0) ? 0 : f;
    },
    randFrom(list) {
      return list[Math.floor(Math.random() * list.length)];
    },
    randInt(lo, hi) {
      return Math.floor(Math.random() * (hi - lo + 1)) + lo;
    },
    randDecimal({ intMin = 0, intMax = 999, fracDigitsMin = 1, fracDigitsMax = 3 }) {
      const intPart = this.randInt(intMin, intMax);
      const fd = this.randInt(fracDigitsMin, fracDigitsMax);
      const denom = 10 ** fd;
      const fracPart = this.randInt(1, denom - 1); // tránh .000
      return intPart + fracPart / denom;
    },

    sheetGridTemplateForPage(itemsOrPage) {
      // Chấp nhận cả { items: [...] } hoặc chính mảng groups
      const groups = Array.isArray(itemsOrPage)
        ? itemsOrPage
        : itemsOrPage && Array.isArray(itemsOrPage.items)
        ? itemsOrPage.items
        : null;

      if (!groups || groups.length === 0) return "1fr 1fr 1fr";

      const toFr = (maxRows) => {
        if (!Number.isFinite(maxRows) || maxRows <= 0) return 1; // fallback
        if (maxRows >= 10) return 1.4; // dãy decimal 10 dòng
        if (maxRows >= 7) return 1.1; // dãy 7–9 dòng
        if (maxRows >= 5) return 0.9; // dãy 5–6 dòng
        return 0.75; // dãy 3–4 dòng
      };

      const frs = groups.map((group) => {
        // group là mảng 5 câu; lấy số dòng lớn nhất trong group
        const maxRows = Math.max(
          ...group.map((q) => (q && Array.isArray(q.numbers) ? q.numbers.length : 0))
        );
        return `${toFr(maxRows)}fr`;
      });

      // Trả về "a fr b fr c fr"
      return frs.join(" ");
    },
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    buildSignsRandom(count, negCount = 2) {
      // luôn bắt đầu dương
      const signs = Array(count).fill(+1);

      // không được vượt quá (count - 1) vì index 0 luôn dương
      const need = Math.max(0, Math.min(negCount, Math.max(0, count - 1)));

      // pool vị trí hợp lệ để đặt âm: 1..count-1
      const pool = [];
      for (let i = 1; i < count; i++) pool.push(i);

      // chọn ngẫu nhiên 'need' vị trí, cho phép liền nhau, không ràng buộc khoảng cách
      for (let k = 0; k < need && pool.length > 0; k++) {
        const j = Math.floor(Math.random() * pool.length);
        const idx = pool.splice(j, 1)[0];
        signs[idx] = -1;
      }
      return signs;
    },
    buildUnitsSignsWithPlusesRandom(plusCount = 3, total = 10) {
      const signs = Array(total).fill(-1);
      // ép index 0 dương để prefix an toàn
      signs[0] = +1;
      if (plusCount > 1) {
        const avoid = new Set([0]);
        const extra = this.pickNonAdjacentIndices(
          total,
          plusCount - 1,
          1,
          total - 1,
          1,
          avoid
        );
        extra.forEach((i) => (signs[i] = +1));
      }
      return signs;
    },
    pickNonAdjacentIndices(
      count,
      k,
      startIndex = 1,
      endIndex = null,
      minGap = 1,
      avoid = new Set()
    ) {
      endIndex = endIndex == null ? count - 1 : endIndex;
      const pool = [];
      for (let i = startIndex; i <= endIndex; i++) pool.push(i);

      const okWithSet = (idx, picked) => {
        for (const p of picked) if (Math.abs(p - idx) <= minGap) return false;
        for (const a of avoid) if (Math.abs(a - idx) <= minGap) return false;
        return true;
      };

      // thử random trước
      for (let t = 0; t < 300; t++) {
        const cand = this.shuffle(pool);
        const pick = [];
        for (const idx of cand) {
          if (pick.length >= k) break;
          if (okWithSet(idx, pick)) pick.push(idx);
        }
        if (pick.length === k) return pick.sort((a, b) => a - b);
      }

      // fallback: rải đều (bỏ qua vị trí dính avoid/minGap)
      const span = endIndex - startIndex + 1;
      const gap = Math.max(1, Math.floor(span / (k + 1)));
      const out = [];
      for (let i = 1; i <= k * 2 && out.length < k; i++) {
        const pos = startIndex + i * gap;
        if (pos < startIndex || pos > endIndex) continue;
        if (okWithSet(pos, out)) out.push(pos);
      }
      return out.slice(0, k).sort((a, b) => a - b);
    },

    genMulQuestion() {
      // BÊN TRÁI (×):
      // "Số thập phân (1–3 chữ số thập phân) × (hàng trăm | hàng nghìn | chục nghìn)"
      // ví dụ: 12.3 × 540 | 0.74 × 8,123 | 98.765 × 21,000
      // Chọn ngẫu nhiên bậc của số nguyên nhân: 100..999 | 1,000..9,999 | 10,000..99,999
      const bucket = this.randFrom([
        { lo: 100, hi: 999 }, // hàng trăm
        { lo: 1000, hi: 9999 }, // hàng nghìn
        { lo: 10000, hi: 99999 }, // chục nghìn
      ]);
      const b = this.randInt(bucket.lo, bucket.hi);

      // Số thập phân có 1–3 chữ số thập phân, phần nguyên 0..999 (tránh .000)
      const a = this.randDecimal({
        intMin: 0,
        intMax: 999,
        fracDigitsMin: 1,
        fracDigitsMax: 3,
      });

      return { a, b, ans: a * b };
    },

    genDivQuestion() {
      // BÊN PHẢI (÷):
      // 4 mẫu:
      // 1) dec ÷ dec      (ví dụ 0.43 ÷ 0.074)
      // 2) dec ÷ hundreds (ví dụ 5159.70 ÷ 810)
      // 3) 100k..999999 ÷ 100..999
      // 4) 100k..999999 ÷ 1000..9999
      const pick = this.randInt(1, 4);

      if (pick === 1) {
        // dec ÷ dec — đảm bảo divisor nhỏ hơn dividend để tránh quotient quá nhỏ (tuỳ ý)
        const dividend = this.randDecimal({
          intMin: 0,
          intMax: 9999,
          fracDigitsMin: 2,
          fracDigitsMax: 3,
        });

        // divisor: 0.01..9.999 (2–3 chữ số thập phân), tránh 0
        let divisor = this.randDecimal({
          intMin: 0,
          intMax: 9,
          fracDigitsMin: 2,
          fracDigitsMax: 3,
        });
        if (divisor === 0) divisor = 0.01;

        const ans = this.roundNicely(dividend / divisor, 4);
        return { dividend, divisor, ans };
      }

      if (pick === 2) {
        // dec ÷ hundreds — 5159.70 ÷ 810 kiểu vậy
        const dividend = this.randDecimal({
          intMin: 0,
          intMax: 999999, // cho rộng để giống ví dụ
          fracDigitsMin: 2,
          fracDigitsMax: 2, // như 5159.70
        });
        const divisor = this.randInt(100, 999);
        const ans = this.roundNicely(dividend / divisor, 4);
        return { dividend, divisor, ans };
      }

      if (pick === 3) {
        // 100k..999999 ÷ 100..999
        const dividend = this.randInt(100000, 999999);
        const divisor = this.randInt(100, 999);
        const ans = this.roundNicely(dividend / divisor, 4);
        return { dividend, divisor, ans };
      }

      // pick === 4
      const dividend = this.randInt(100000, 999999);
      const divisor = this.randInt(1000, 9999);
      const ans = this.roundNicely(dividend / divisor, 4);
      return { dividend, divisor, ans };
    },

    makeMulDivPage(pageIndex) {
      const mul = [],
        div = [];
      const mulMap = {};
      const divMap = {};

      for (let i = 0; i < 20; i++) {
        const mq = this.genMulQuestion();
        const dq = this.genDivQuestion();

        mul.push(mq);
        div.push(dq);

        mulMap[i + 1] = mq.ans; // row 1..20
        divMap[i + 1] = dq.ans;
      }

      // GÁN MỘT LẦN để đảm bảo reactivity trong Vue 3
      this.mulAnsMap = { ...this.mulAnsMap, [pageIndex]: mulMap };
      this.divAnsMap = { ...this.divAnsMap, [pageIndex]: divMap };

      return { mode: "muldiv40", pageIndex, mul, div };
    },
    convertNumber(p) {
      return Number(p).toLocaleString("fr-FR");
    },
    formatNumberForClient(n) {
      if (n == null || isNaN(n)) return "";

      // Làm tròn 2 chữ số thập phân
      let fixed = Number(n).toFixed(2);

      // Bỏ toàn bộ số 0 vô nghĩa và dấu '.' nếu không cần
      fixed = fixed.replace(/\.?0+$/, "");

      // Tách phần nguyên & phần thập phân (sau khi rút gọn)
      const [intPart, decPart] = fixed.split(".");

      // Thêm dấu cách cho phần nghìn
      const intWithSpace = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      // Ghép lại
      return decPart ? `${intWithSpace}.${decPart}` : intWithSpace;
    },
    getMulAns(p, id) {
      const val = this.mulAnsMap?.[Number(p)]?.[id];
      return val !== undefined ? this.formatNumberForClient(val) : "";
    },
    getDivAns(p, id) {
      const val = this.divAnsMap?.[Number(p)]?.[id];
      return val !== undefined ? this.formatNumberForClient(val) : "";
    },
    /* ======================== CORE GENERATOR ======================== */
    /**
     * Sinh dãy số xen kẽ dấu, không có số 0, mọi prefix-sum > 0, tổng > 0.
     * Các "scale":
     *  - 'tens'       : ±10..±99
     *  - 'hundreds'   : ±100..±999
     *  - 'dec-unit'   : ±0.01..±9.99  (làm việc bằng "cents" để tránh lỗi float)
     *  - 'dec-tens'   : ±10.01..±99.99
     *
     * @param {Object} opt
     * @param {number} opt.count        - số lượng phần tử
     * @param {string} opt.scale        - 'tens' | 'hundreds' | 'dec-unit' | 'dec-tens'
     * @param {number} opt.negCount     - số lượng dấu âm cần có (mặc định: 3 với tens; 1 với hundreds/decimal)
     * @returns {{numbers:number[], sum:number, format:'int'|'decimal'}}
     */
    genSequence({
      count,
      scale,
      negCount,
      zeroSlots = 0,
      decScale = "unit",
      decMix = null,
    }) {
      if (!Number.isInteger(count) || count < 1) count = 10;
      if (!Number.isInteger(negCount)) negCount = scale === "tens" ? 3 : 1;

      // dùng pattern âm/dương ngẫu nhiên (bắt đầu dương, tránh 2 âm liền nhau)
      const signs = this.buildSignsRandom(count, negCount);

      if (scale === "decimal") {
        const built = this.buildDecimalAlternating(signs, {
          zeroSlots,
          decScale,
          decMix,
        });
        return { numbers: built.numbers, sum: built.sum, format: "decimal" };
      }

      const drawAbs = () => {
        if (scale === "tens") return this.randIntInRangeExcludeZero(10, 99);
        if (scale === "hundreds") return this.randIntInRangeExcludeZero(100, 999);
        if (scale === "thousands") return this.randIntInRangeExcludeZero(1000, 9999);
        return this.randIntInRangeExcludeZero(1, 9);
      };
      const built = this.buildIntegerAlternating(signs, drawAbs);
      return { numbers: built.numbers, sum: built.sum, format: "int" };
    },

    /* ======================== INTEGER BUILDER ======================== */
    // Domain helper (nguyên dương trong [lo..hi], exclude 0)
    randIntInRangeExcludeZero(lo, hi) {
      const abs = Math.floor(Math.random() * (hi - lo + 1)) + lo; // lo..hi
      return abs; // chỉ trả về abs, dấu gán theo pattern
    },

    // Xây dãy số nguyên: mọi prefix > 0, tổng > 0
    buildIntegerAlternating(signs, drawAbs) {
      const MAX_TRIES = 4000;
      for (let t = 0; t < MAX_TRIES; t++) {
        const nums = [];
        let s = 0;
        let ok = true;

        for (let i = 0; i < signs.length; i++) {
          const sign = signs[i];
          let abs = drawAbs();

          // Không cho abs = 0 (đã đảm bảo ở drawAbs)
          // Gắn dấu
          let v = sign > 0 ? abs : -abs;

          // Bảo đảm prefix > 0 tại mọi bước
          if (s + v <= 0) {
            if (sign > 0) {
              // tăng abs lên cho đủ buffer
              abs = Math.max(abs, 1 - s + 1); // làm s + v >= 2
              // clamp nhẹ tuỳ domain (ở đây tạm tin drawAbs domain đủ rộng)
              v = abs;
            } else {
              // giảm biên độ âm
              if (s <= 1) {
                ok = false;
                break;
              }
              abs = Math.min(abs, s - 1); // để s + (-abs) >= 1
              if (abs <= 0) {
                ok = false;
                break;
              }
              v = -abs;
            }
            if (s + v <= 0) {
              ok = false;
              break;
            }
          }

          s += v;
          nums.push(v);
        }
        if (ok && s > 0) {
          return { numbers: nums, sum: s };
        }
      }
      // Fallback cực hiếm: toàn số dương nhỏ, đảm bảo >0
      const safe = signs.map(() => 1);
      return { numbers: safe, sum: safe.length };
    },

    /* ======================== DECIMAL (CENTS) BUILDER ======================== */
    // Domain helper for cents (abs int in [lo..hi], exclude 0)
    randCentsInRange(lo, hi) {
      let v = 0;
      while (v === 0) {
        v = Math.floor(Math.random() * (hi - lo + 1)) + lo; // lo..hi
      }
      return v; // abs cents
    },

    /**
     * Xây dãy số thập phân bằng đơn vị "cents" (1 = 0.01).
     * Ràng buộc:
     *  - Sau mỗi phép tính: tổng > 0 (loại trừ 0)
     *  - Không "âm" phần thập phân khi trừ (hạn chế mượn), vì học sinh cộng phần thập phân trước
     *    -> nếu bước là âm: (cents của số bị trừ) <= (s % 100), để không âm phần lẻ sau khi trừ
     *  - Cuối cùng tổng > 0
     */
    // options: { zeroSlots }
    buildDecimalAlternating(signs, options = {}) {
      const { zeroSlots = 0, decScale = "unit", decMix = null } = options;
      const MAX_TRIES = 7000;

      // Helper: domain theo "bậc"
      const drawCentsBySubscale = (sub) => {
        if (sub === "unit") return this.randCentsInRange(1, 999); // 0.01..9.99
        if (sub === "tens") return this.randCentsInRange(1001, 9999); // 10.01..99.99
        if (sub === "hundreds") return this.randCentsInRange(10001, 99999); // 100.01..999.99
        if (sub === "thousands") return this.randCentsInRange(100001, 999999); // 1000.01..9999.99
        return this.randCentsInRange(1, 999);
      };

      // Chuẩn hóa decMix
      let mixPlan = null;
      if (decMix && typeof decMix === "object") {
        // tổng phải bằng signs.length; nếu nhỏ hơn, phần còn lại dùng decScale fallback
        const totalNeed =
          (decMix.unit || 0) +
          (decMix.tens || 0) +
          (decMix.hundreds || 0) +
          (decMix.thousands || 0);
        mixPlan = {
          unit: Math.max(0, decMix.unit || 0),
          tens: Math.max(0, decMix.tens || 0),
          hundreds: Math.max(0, decMix.hundreds || 0),
          thousands: Math.max(0, decMix.thousands || 0),
          rest: Math.max(0, signs.length - totalNeed),
        };
      }

      // Chọn subscale cho vị trí i
      const pickSubscale = (remain) => {
        if (!mixPlan) return decScale;

        const bag = [];
        const pushMany = (label, n) => {
          for (let i = 0; i < (n || 0); i++) bag.push(label);
        };

        pushMany("unit", remain?.unit || 0);
        pushMany("tens", remain?.tens || 0);
        pushMany("hundreds", remain?.hundreds || 0);
        pushMany("thousands", remain?.thousands || 0);

        if (bag.length === 0) return decScale;
        const pick = bag[Math.floor(Math.random() * bag.length)];
        return pick;
      };

      for (let t = 0; t < MAX_TRIES; t++) {
        const centsArr = [];
        let s = 0; // tổng theo cents
        let ok = true;
        let zerosLeft = Math.max(0, Math.min(zeroSlots, signs.length));

        // bản sao đếm subscale còn lại
        const remain = mixPlan ? { ...mixPlan } : null;

        for (let i = 0; i < signs.length; i++) {
          const sign = signs[i];
          const sub = pickSubscale(remain || {});
          if (remain) {
            if (["unit", "tens", "hundreds", "thousands"].includes(sub)) {
              if (remain[sub] > 0) remain[sub]--;
              else if (remain.rest > 0) remain.rest--;
            } else if (remain.rest > 0) {
              remain.rest--;
            }
          }

          let abs;
          if (sign < 0) {
            // ÂM: nếu yêu cầu slot "0.xx" thì rút 1..99 và không mượn
            if (zerosLeft > 0 && sub === "unit") {
              const fracNow = s % 100;
              let trials = 0;
              abs = this.randCentsInRange(1, 99); // 0.xx
              while (abs % 100 > fracNow || s - abs <= 0) {
                abs = this.randCentsInRange(1, 99);
                if (++trials > 300) {
                  ok = false;
                  break;
                }
              }
              if (!ok) break;
              zerosLeft--;
            } else {
              // ÂM theo subscale, nhưng vẫn phải "không mượn" + prefix>0
              const fracNow = s % 100;
              let trials = 0;
              abs = drawCentsBySubscale(sub);
              while (abs % 100 > fracNow || s - abs <= 0) {
                abs = drawCentsBySubscale(sub);
                if (++trials > 400) {
                  ok = false;
                  break;
                }
              }
              if (!ok) break;
            }
            s -= abs;
            if (s <= 0) {
              ok = false;
              break;
            }
            centsArr.push(-abs);
          } else {
            // DƯƠNG: lấy theo subscale
            abs = drawCentsBySubscale(sub);
            // nếu kế tiếp là âm, tăng nhẹ buffer
            const negSoon = i + 1 < signs.length && signs[i + 1] < 0;
            if (negSoon && abs < 120) abs = 120; // >= +1.20
            s += abs;
            if (s <= 0) {
              ok = false;
              break;
            }
            centsArr.push(abs);
          }
        }

        // Kiểm tra đã dùng hết quota decMix chưa (nếu có)
        const mixOk =
          !mixPlan ||
          ((remain.unit || 0) === 0 &&
            (remain.tens || 0) === 0 &&
            (remain.hundreds || 0) === 0 &&
            (remain.thousands || 0) === 0 &&
            (remain.rest || 0) === 0);

        if (ok && s > 0 && zerosLeft === 0 && mixOk) {
          const numbers = centsArr.map((c) => this.centsToNumber(c));
          const sum = this.centsToNumber(s);
          return { numbers, sum };
        }
      }

      // Fallback an toàn
      const safe = signs.map((sgn) => (sgn > 0 ? 150 : 30)); // +1.50 / -0.30
      let s = safe.reduce((a, b) => a + b, 0);
      if (s <= 0) s += 50;
      return { numbers: safe.map(this.centsToNumber), sum: this.centsToNumber(s) };
    },

    centsToNumber(c) {
      const sign = c < 0 ? -1 : 1;
      const abs = Math.abs(c);
      const val = Math.round(abs) / 100; // 2 chữ số
      return sign * val;
    },

    /* ======================== FORMATTER CHO TEMPLATE ======================== */
    /**
     * In giá trị cho UI (phần số, không gồm dấu).
     * - int: trả về Math.abs(n)
     * - decimal: trả về số 2 chữ số nhưng bỏ 0 trước dấu chấm (0.30 -> .30)
     */
    formatVal(n, fmt) {
      if (fmt === "decimal") {
        const abs = Math.abs(n);
        const s = abs.toFixed(2);
        return s.replace(/^0(?=\.)/, "");
      }
      // int
      return Math.abs(n);
    },
    randTenAbs10to99() {
      // trả về trị tuyệt đối 10..99
      return Math.floor(Math.random() * 90) + 10; // 10..99
    },
    buildSigns_twoNegatives_alt(count) {
      const signs = Array(count).fill(+1);
      // chọn 2 vị trí âm “xen kẽ sớm”, bắt đầu từ index 1
      // ví dụ n=5:  [+,-,+,-,+]
      //      n=6:  [+,-,+,-,+,+]
      //      n=7:  [+,-,+,-,+,+,+]
      const neg1 = 1;
      const neg2 = Math.min(count - 2, 3); // ưu tiên vị trí 3 (0-based) nếu có
      signs[neg1] = -1;
      if (neg2 !== neg1) signs[neg2] = -1;

      // đảm bảo không 2 âm liền nhau
      if (neg2 === neg1 + 1) {
        // đẩy âm thứ 2 ra xa (nếu trùng kề)
        const newNeg2 = Math.min(count - 2, neg2 + 1);
        signs[neg2] = +1;
        signs[newNeg2] = -1;
      }
      // bắt đầu dương
      signs[0] = +1;
      return signs;
    },
    randTenNoZero() {
      let v = 0;
      while (v === 0) {
        v = Math.floor(Math.random() * 199) - 99; // -99..99
      }
      return v;
    },
    randUnitNoZero() {
      let v = 0;
      while (v === 0) {
        v = Math.floor(Math.random() * 19) - 9; // -9..9
      }
      return v;
    },
    buildSigns10_forUnits() {
      const signs = Array(10).fill(+1);
      let negCount = 0;
      for (let i = 1; i < 10 && negCount < 3; i++) {
        // xen kẽ: cho âm ở vị trí chẵn để không liền nhau
        if (i % 2 === 0) {
          signs[i] = -1;
          negCount++;
        }
      }
      // nếu chưa đủ 3 âm thì thêm vào các vị trí xa nhau
      for (let i = 9; negCount < 3 && i > 0; i--) {
        if (signs[i] > 0 && signs[i - 1] > 0) {
          signs[i] = -1;
          negCount++;
        }
      }
      return signs;
    },
    genUnitsMixed() {
      const signs = this.buildSignsRandom(10, 3);
      const nums = [];
      let sum = 0;
      let tensLeft = 5;
      let unitsLeft = 5;

      for (let i = 0; i < 10; i++) {
        let v;
        if ((tensLeft > 0 && unitsLeft > 0 && Math.random() < 0.5) || unitsLeft === 0) {
          v = Math.abs(this.randTenNoZero());
          tensLeft--;
        } else {
          v = Math.abs(this.randUnitNoZero());
          unitsLeft--;
        }

        if (signs[i] < 0) v = -v;

        if (sum + v <= 0) {
          if (signs[i] > 0) v = Math.max(1, -sum + 1);
          else v = -1;
        }

        sum += v;
        nums.push(v);
      }

      if (sum <= 0) {
        for (let i = 0; i < 10 && sum <= 0; i++) {
          if (nums[i] > 0 && nums[i] < 99) {
            nums[i] += 1;
            sum += 1;
          }
        }
      }

      if (!this.okPrefixPositive(nums)) return this.genUnitsMixed();
      return { numbers: nums, sum };
    },
    buildUnitsSigns10_with3Negatives() {
      // bạn có thể đổi vị trí âm cho "xen kẽ" đẹp mắt: 3,6,9 (1-based)
      // => index 0-based: 2,5,8
      const signs = Array(10).fill(+1);
      [2, 5, 8].forEach((i) => (signs[i] = -1));
      return signs;
    },
    getAnswer(page, id) {
      const p = Number(page);
      const q = Number(id);
      return this.answerMap?.[p]?.[q] ?? "";
    },
    okPrefixPositive(arr) {
      let s = 0;
      for (const n of arr) {
        s += n;
        if (s <= 0) return false;
      }
      return s > 0;
    },
    genTensTwoNegAlt(countNums) {
      const signs = this.buildSignsRandom(countNums, 2);
      const nums = [];
      let s = 0;

      for (let i = 0; i < countNums; i++) {
        const sign = signs[i];
        let abs = this.randTenAbs10to99(); // 10..99

        if (sign > 0) {
          const negSoon = signs.slice(i + 1).indexOf(-1);
          const hasNegSoon = negSoon >= 0 && negSoon <= 2;
          if (hasNegSoon && abs < 20) abs = 20;
          if (s + abs < 10) abs = Math.max(abs, 10 - s + 10);
          abs = Math.min(abs, 99);
          nums.push(abs);
          s += abs;
        } else {
          const kmax = Math.min(99, Math.max(10, s - 3));
          if (kmax < 10) return this.genTensTwoNegAlt(countNums);

          let k = Math.floor(Math.random() * (kmax - 10 + 1)) + 10; // 10..kmax
          let v = -k;

          if (i > 0 && nums[i - 1] < 0) {
            const vSafe = -10;
            if (s + vSafe <= 0) return this.genTensTwoNegAlt(countNums);
            v = vSafe;
          } else if (s + v <= 0) {
            const vSafe = -Math.max(10, Math.min(99, s - 10));
            if (!(vSafe < 0) || s + vSafe <= 0) return this.genTensTwoNegAlt(countNums);
            v = vSafe;
          }

          nums.push(v);
          s += v;
        }
      }

      if (s <= 0) {
        for (let i = 0; i < nums.length && s <= 0; i++) {
          if (nums[i] > 0 && nums[i] < 99) {
            const add = Math.min(99 - nums[i], 10);
            nums[i] += add;
            s += add;
          }
        }
      }

      if (!this.okPrefixPositive(nums)) return this.genTensTwoNegAlt(countNums);
      return { numbers: nums, sum: s };
    },

    randAbs1to9() {
      return Math.floor(Math.random() * 9) + 1;
    },
    genUnitsTenNumbersWith3Negatives() {
      const signs = this.buildSignsRandom(10, 3);
      const nums = [];
      let s = 0;

      for (let i = 0; i < 10; i++) {
        if (signs[i] > 0) {
          const nextNegIdx = signs.slice(i + 1).indexOf(-1);
          const closishNegComing = nextNegIdx >= 0 && nextNegIdx <= 2;
          let v = this.randAbs1to9();
          if (closishNegComing)
            v = Math.min(9, Math.max(v, 3 + Math.floor(Math.random() * 4)));
          if (s + v <= 0) v = Math.max(1, 1 - s);
          s += v;
          nums.push(v);
        } else {
          const kmax = Math.min(9, Math.max(1, s - 1));
          const k = Math.floor(Math.random() * kmax) + 1;
          let v = -k;
          s += v;
          if (i > 0 && nums[i - 1] < 0) {
            const diff = v + 1;
            s -= diff;
            v = -1;
          }
          nums.push(v);
        }
      }

      if (s <= 0) {
        for (let i = 0; i < 10 && s <= 0; i++) {
          if (nums[i] > 0 && nums[i] < 9) {
            const bump = Math.min(9 - nums[i], 1 - s + 1);
            nums[i] += bump;
            s += bump;
          }
        }
      }

      if (!this.okPrefixPositive(nums)) return this.genUnitsTenNumbersWith3Negatives();
      return { numbers: nums, sum: s };
    },

    // ===== Random helpers =====
    randIntNoZero(min = -9, max = 9) {
      let x = 0;
      while (x === 0) {
        x = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      return x;
    },
    randTensNoZero(minAbs = 10, maxAbs = 90) {
      // trả về ±10, ±20, ..., ±90 (khác 0)
      const k = Math.floor(Math.random() * 9) + 1; // 1..9
      const sign = Math.random() < 0.5 ? -1 : 1;
      const val = sign * k * 10;
      if (Math.abs(val) < minAbs || Math.abs(val) > maxAbs) {
        return this.randTensNoZero(minAbs, maxAbs);
      }
      return val;
    },

    pickTargetPositive(place = "units") {
      if (place === "tens") {
        // target dương 5..99 (không bắt buộc bội số 10)
        return Math.floor(Math.random() * 95) + 5; // 5..99
      }
      // units: mục tiêu 1..9
      return this.randIntNoZero(1, 9);
    },
    randTensInDomain() {
      const abs = Math.floor(Math.random() * 95) + 5; // 5..99
      const sign = Math.random() < 0.5 ? -1 : 1;
      return sign * abs;
    },
    buildSignPatternTens(countNums) {
      if (countNums === 3) return [+1, +1, -1]; // 1 âm
      if (countNums === 4) return [+1, -1, +1, -1]; // 2 âm
      if (countNums === 5) return [+1, -1, +1, -1, +1]; // 2 âm (sau khi điều chỉnh số cuối vẫn đảm bảo tổng dương)
      // fallback: cố định 2 âm
      const base = Array(countNums).fill(+1);
      base[1] = -1;
      base[3 % countNums] = -1;
      return base;
    },
    genTensWithConstraints(target, countNums) {
      const negByCount = { 3: 1, 4: 2, 5: 2, 6: 2, 7: 2 };
      const signs = this.buildSignsRandom(countNums, negByCount[countNums] ?? 2);
      const drawAbs = () => Math.floor(Math.random() * 95) + 5; // 5..99

      const tryBuild = () => {
        const nums = [];
        let s = 0;
        for (let i = 0; i < countNums - 1; i++) {
          let v = drawAbs();
          v = signs[i] < 0 ? -v : v;

          if (s + v <= 0) {
            const bump = 5 + Math.floor(Math.random() * 15);
            v =
              signs[i] < 0
                ? -Math.max(5, Math.abs(v) - bump)
                : Math.max(5, Math.abs(v) + bump);
            if (Math.abs(v) > 99) v = signs[i] < 0 ? -97 : 97;
            if (Math.abs(v) < 5) v = signs[i] < 0 ? -5 : 5;
            if (s + v <= 0) return null;
          }

          const s2 = s + v;
          const remain = target - s2;
          const lastSign = signs[countNums - 1];
          const minLast = lastSign > 0 ? 5 : -99;
          const maxLast = lastSign > 0 ? 99 : -5;
          if (remain < minLast || remain > maxLast) return null;

          nums.push(v);
          s = s2;
        }

        let last = target - s;
        if (
          Math.sign(last) !== Math.sign(signs[countNums - 1]) ||
          Math.abs(last) < 5 ||
          Math.abs(last) > 99
        ) {
          return null;
        }

        const candidate = [...nums, last];
        if (!this.okPrefixPositive(candidate)) return null;
        return { numbers: candidate, sum: target };
      };

      for (let t = 0; t < 800; t++) {
        const built = tryBuild();
        if (built) return built;
      }

      const base = Array(countNums)
        .fill(0)
        .map((_, i) => (signs[i] > 0 ? 10 : -5));
      let s = base.reduce((a, b) => a + b, 0);
      const diff = target - s;
      base[0] += diff;
      if (!this.okPrefixPositive(base)) {
        base.sort((a, b) => Math.abs(a) - Math.abs(b));
        if (!this.okPrefixPositive(base)) base.reverse();
      }
      return { numbers: base, sum: base.reduce((a, b) => a + b, 0) };
    },

    generateQuestionsByPlace({ countItems, countNums, place = "units", typeLabel = 3 }) {
      const items = [];
      const isUnits = place === "units";

      for (let i = 0; i < countItems; i++) {
        // UNITS 10 số đặc biệt (bạn đang dùng genUnitsMixed) giữ nguyên
        if (isUnits && countNums === 10) {
          const { numbers, sum } = this.genUnitsMixed();
          items.push({ numbers, sum, type: typeLabel, place });
          continue;
        }

        // TENS 5/6/7 số: 2 âm, bắt đầu dương, xen kẽ hợp lý, prefix>0, sum>0, domain ±10..±99
        if (!isUnits && (countNums === 5 || countNums === 6 || countNums === 7)) {
          const { numbers, sum } = this.genTensTwoNegAlt(countNums);
          items.push({ numbers, sum, type: typeLabel, place });
          continue;
        }

        // Các trường hợp còn lại: giữ logic cũ của bạn
        if (!isUnits) {
          const target = this.pickTargetPositive("tens");
          const { numbers, sum } = this.genTensWithConstraints(target, countNums);
          items.push({ numbers, sum, type: typeLabel, place });
        } else {
          const target = this.pickTargetPositive("units");
          const { numbers, sum } = this.genNumbersForPositiveSum(target, countNums);
          items.push({ numbers, sum, type: typeLabel, place });
        }
      }
      return items;
    },

    genUnitsTenNumbersWith3Pluses(target) {
      const signs = this.buildUnitsSignsWithPlusesRandom(3, 10);
      const drawAbs = () => Math.floor(Math.random() * 9) + 1;

      const tryBuild = () => {
        const nums = [];
        let s = 0;

        for (let i = 0; i < 9; i++) {
          let v = drawAbs();
          v = signs[i] < 0 ? -v : v;

          if (s + v <= 0) {
            const bump = 1 + Math.floor(Math.random() * 3);
            v =
              signs[i] < 0
                ? -Math.max(1, Math.abs(v) - bump)
                : Math.max(1, Math.abs(v) + bump);
            if (Math.abs(v) > 9) v = signs[i] < 0 ? -9 : 9;
            if (s + v <= 0) return null;
          }

          const s2 = s + v;
          const remain = target - s2;
          const lastSign = signs[9];
          const minLast = lastSign > 0 ? 1 : -9;
          const maxLast = lastSign > 0 ? 9 : -1;
          if (remain < minLast || remain > maxLast) return null;

          nums.push(v);
          s = s2;
        }

        let last = target - s;
        if (
          Math.sign(last) !== Math.sign(signs[9]) ||
          Math.abs(last) < 1 ||
          Math.abs(last) > 9
        )
          return null;

        const candidate = [...nums, last];
        if (!this.okPrefixPositive(candidate)) return null;
        return { numbers: candidate, sum: target };
      };

      for (let t = 0; t < 1200; t++) {
        const built = tryBuild();
        if (built) return built;
      }

      const base = signs.map((s) => (s > 0 ? 2 : -1));
      let s = base.reduce((a, b) => a + b, 0);
      const diff = target - s;
      const firstPlus = signs.findIndex((x) => x > 0);
      if (firstPlus >= 0) base[firstPlus] += diff;
      if (!this.okPrefixPositive(base)) {
        for (let i = 0; i < base.length && !this.okPrefixPositive(base); i++) {
          if (signs[i] > 0) base[i] = Math.min(9, base[i] + 1);
          else base[i] = Math.max(-9, base[i] - 1);
        }
      }
      return { numbers: base, sum: base.reduce((a, b) => a + b, 0) };
    },

    buildUnitsSigns10_with3Pluses() {
      const signs = Array(10).fill(-1);
      // đặt '+' ở các vị trí cách nhau (ví dụ 1, 4, 7) để nhìn "xen kẽ"
      const plusIdxs = [1, 4, 7]; // 0-based; bạn đổi pattern nếu muốn
      plusIdxs.forEach((i) => (signs[i] = +1));
      return signs;
    },
    // Tạo mảng countNums số trong 1 domain, tổng = target, mọi bước cộng dồn > 0
    genNumbersForPositiveSumInDomain({ target, countNums, drawFn, isInDomain }) {
      const MAX_TRIES = 6000;
      const MAX_ORDER_TRIES = 50;

      // rút 1 số hợp lệ trong domain, khác 0
      const drawInDomain = () => {
        for (let k = 0; k < 1000; k++) {
          const v = drawFn();
          if (v !== 0 && isInDomain(v)) return v;
        }
        return 1; // fallback an toàn nếu drawFn hiếm khi ra hợp lệ
      };

      const okPrefixNonNegative = (arr) => {
        let s = 0;
        for (const n of arr) {
          s += n;
          if (s < 0) return false; // CHỈ cấm âm; cho phép = 0
        }
        return true;
      };

      const shuffle = (a) => {
        const b = a.slice();
        for (let i = b.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [b[i], b[j]] = [b[j], b[i]];
        }
        return b;
      };

      for (let tries = 0; tries < MAX_TRIES; tries++) {
        // rút countNums-1 số trước (đều hợp lệ)
        const nums = [];
        for (let i = 0; i < countNums - 1; i++) {
          nums.push(drawInDomain());
        }

        // số cuối để chốt đúng target
        const rest = target - nums.reduce((a, b) => a + b, 0);
        if (rest === 0 || !isInDomain(rest)) continue;

        const base = [...nums, rest];

        // thử các thứ tự khác nhau để đảm bảo prefix-sum ≥ 0
        for (let t = 0; t < MAX_ORDER_TRIES; t++) {
          const candidate = t === 0 ? base : shuffle(base);
          if (
            okPrefixNonNegative(candidate) &&
            candidate.reduce((a, b) => a + b, 0) === target
          ) {
            return { numbers: candidate, sum: target };
          }
        }
      }

      // ===== Fallback: xây dựng tuyến tính, luôn giữ tổng không âm =====
      const candidate = [];
      let sum = 0;
      for (let i = 0; i < countNums - 1; i++) {
        let v = drawInDomain();
        if (sum + v < 0) v = Math.abs(v); // nắn lại để không âm sau phép cộng
        candidate.push(v);
        sum += v;
      }
      // chốt số cuối hướng về target, ưu tiên giữ hợp lệ & không làm âm
      let last = target - sum;
      if (last === 0 || !isInDomain(last) || sum + last < 0) {
        // nếu không ổn, thay bằng 1 số dương nhỏ hợp lệ
        last = 1;
        if (!isInDomain(last)) {
          // nếu domain không cho 1, bạn có thể đổi thành giá trị dương nhỏ nhất hợp lệ
          // ví dụ: tìm số dương nhỏ nhất trong domain
          for (let x = 1; x <= 99; x++) {
            // điều chỉnh biên cho domain của bạn
            if (isInDomain(x)) {
              last = x;
              break;
            }
          }
        }
      }
      candidate.push(last);
      return { numbers: candidate, sum: candidate.reduce((a, b) => a + b, 0) };
    },

    // API cũ (giữ nguyên để q4, q5 dùng)
    genNumbersForPositiveSum(target, countNums) {
      return this.genNumbersForPositiveSumInDomain({
        target,
        countNums,
        drawFn: () => this.randIntNoZero(-9, 9),
        isInDomain: (x) => x !== 0 && x >= -9 && x <= 9,
      });
    },

    // Sinh bộ câu hỏi tiêu chuẩn (đơn vị 1..9) — dùng cho q4, q5 cũ
    generateQuestions(count, countNums = 3, typeLabel = 3) {
      const items = [];
      for (let i = 0; i < count; i++) {
        const target = this.pickTargetPositive("units");
        const { numbers, sum } = this.genNumbersForPositiveSum(target, countNums);
        items.push({ numbers, sum, type: typeLabel });
      }
      return items;
    },

    // ===== Answer pages helpers =====
    makeAnswerPages(nPages = 3) {
      const all = this.flatQuestions();
      const pageSize = Math.ceil(all.length / nPages);
      const pages = [];
      for (let i = 0; i < nPages; i++) {
        const start = i * pageSize;
        const end = start + pageSize;
        pages.push(all.slice(start, end));
      }
      return pages;
    },
    flatQuestions() {
      const out = [];
      for (const grp of this.groups || []) {
        for (const chunk5 of grp.items || []) {
          for (const q of chunk5) out.push(q);
        }
      }
      return out;
    },

    // ===== Chunk helpers =====
    chunkArray(array, size) {
      const out = [];
      for (let i = 0; i < array.length; i += size) {
        out.push(array.slice(i, i + size));
      }
      return out;
    },
    // Chia nhóm 20 câu 1 trang, reset id mỗi trang
    nestPages(items, chunkSize1 = 20, chunkSize2 = 5) {
      const level1 = this.chunkArray(items, chunkSize1); // nhóm 20
      return level1.map((twenty, pageIdx) => {
        const resetItems = twenty.map((q, idx) => ({
          ...q,
          id: idx + 1, // reset 1 → 20
          page: pageIdx + 1, // trang hiện tại
        }));
        return {
          pageIndex: pageIdx + 1,
          items: this.chunkArray(resetItems, chunkSize2), // 20 → 4 cụm 5
        };
      });
    },
  },
};
</script>

<style>
@page {
  size: A4 landscape;
  margin: 10mm;
}

html,
body {
  height: 100%;
  background: #f5f5f5;
}

body {
  margin: 0;
  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #111;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.page {
  height: 210mm;
  width: 297mm;
  box-sizing: border-box;
  background: #fff;
  margin: 10mm auto;
  padding: 10px 52px 20px 70px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 0 0 1px #e5e7eb, 0 6px 24px rgba(0, 0, 0, 0.08);
  position: relative;
  justify-content: space-between;
  align-items: center;
}

@media print {
  body {
    background: transparent;
  }

  .page {
    margin: 0;
    box-shadow: none;
    page-break-after: always;
  }
}

.page-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8mm;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 4mm;
}

.book-title {
  font-weight: 700;
  font-size: 14pt;
}

.page-meta {
  font-size: 10pt;
  color: #666;
}

.sheet-grid {
  display: grid;
  grid-template-rows: 1fr 0.8fr 1.4fr; /* Hàng 1 cao hơn */
  gap: 30px;
  flex: 1;
  width: 100%;
}

.cell {
  border: 1.2pt solid #111;
  border-radius: 4pt;
  padding: 4mm;
  display: flex;
  flex-direction: column;
  gap: 3mm;
  position: relative;
}

.cell .badge {
  position: absolute;
  right: 4mm;
  top: 4mm;
  font-size: 9pt;
  background: #111;
  color: #fff;
  padding: 2px 6px;
  border-radius: 3mm;
}

.cell-title {
  font-weight: 700;
  font-size: 11pt;
}

.prompt {
  font-size: 10.5pt;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4mm;
}

.table {
  border: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  flex-direction: column;
}

.table .thead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #000;
}

.table .thead .td {
  flex: 1;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  border-right: 1px solid #000;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.table .thead .td:last-child {
  border-right: 0px solid #000;
}

.table .tbody {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex: 1;
}

.table .tbody .td {
  flex: 1;
  text-align: center;
  font-size: 20px;
  line-height: 20px;
  border-right: 1px solid #000;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: column;
}
.table .tbody .td.td-stt {
  width: 50px !important;
  flex: unset;
}
.table .tbody .td.td-stt span {
  font-size: 14px;
}
.table .tbody .td span {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table .tbody .td span.header {
  border-bottom: 1px solid #000;
  flex: unset;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.table .tbody .td span.footer {
  border-top: 1px solid #000;
  flex: unset;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
}
.table .tbody .td:last-child {
  border-right: 0px solid #000;
}
.table .tfood {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
}

.table .tfood .td {
  flex: 1;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  border-right: 1px solid #000;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.table .tfood .td:last-child {
  border-right: 0px solid #000;
}
.page.answers {
  padding: 6mm;
}

.answers-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12pt;
  line-height: 1.3;
}
.answers-table tr th {
  font-size: 13px;
}
.answers-table td {
  padding: 2px 6px;
  border: 1px solid #ccc;
  white-space: nowrap;
}
.header-page {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-page span {
  font-size: 17px;
  color: #000;
  font-weight: bold;
}
.num {
  display: flex;
  justify-content: center; /* căn giữa trong ô */
}
.sign {
  width: 20px;
  text-align: left !important;
  display: inline-block;
  font-size: 36px !important;
  line-height: 16px !important;
  margin-bottom: 4px;
}
.val {
  text-align: right;
  font-size: 18px;
  line-height: 19px;
}
/* Optional styling – adjust as you like */
.answers-matrix .sheet-grid {
  grid-template-columns: 1fr 0.45fr;
}
.answers-matrix .answers-table.matrix {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.answers-matrix th,
.answers-matrix td {
  border: 1px solid #000;
  padding: 2px;
  text-align: center;
  vertical-align: middle;
  word-wrap: break-word;
}
.answers-matrix thead th:first-child,
.answers-matrix .q-index {
  width: 36px; /* row label column */
  font-size: 14px;
  font-weight: bold !important;
}
.answers-matrix .corner-cell {
  height: 30px;
}
.answers-matrix .answer-cell {
  font-size: 11px;
  text-align: right;
  padding-right: 4px;
}
/* Giữ border của tiêu đề */
.answers-matrix thead tr {
  border-bottom: 1px solid #aaa; /* vạch ngang dưới header */
  border-top: 1px solid #aaa; /* vạch ngang dưới header */
}

/* Bỏ kẻ ngang mặc định của body */
.answers-matrix .answers-table.matrix tbody tr {
  border: none;
}

/* Vẫn giữ kẻ dọc */
.answers-matrix th,
.answers-matrix td {
  border-top: none;
  border-bottom: none;
}

/* Sau mỗi 4 hàng thì có 1 vạch ngang */
.answers-matrix .answers-table.matrix tbody tr:nth-child(5n):not(:last-child) {
  border-bottom: 1px dashed #000;
}
.answers-matrix .answers-table.matrix tbody tr:last-child {
  border-bottom: 1px solid #000;
}

.header-page {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 60px;
}
.title-sgk {
  font-weight: 700;
}
.page-sgk {
  font-weight: unset !important;
  font-size: 18px !important;
  line-height: 18px !important;
  margin-top: 5px;
}
/* Ô đầu tiên đặc biệt */
.corner-cell {
  position: relative;
  width: 50px;
  padding: 0;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
}

/* Đường chéo */
.corner-cell::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 56px;
  height: 100%;
  border-top: 1px solid black;
  border-left: 1px solid transparent;
  transform: rotate(40deg);
  transform-origin: top left;
  pointer-events: none;
}

/* Chữ "Pg." ở góc trên phải */
.corner-cell .top-right {
  position: absolute;
  top: 1px;
  right: 0px;
}

/* Chữ "No." ở góc dưới trái */
.corner-cell .bottom-left {
  position: absolute;
  bottom: 0px;
  left: 4px;
}
.page main {
  flex: 1;
}
table,
tr,
td {
  border-color: #000 !important;
}
.align-end {
  height: 100px;
  align-items: flex-end;
}
.table .tbody .td {
  display: flex;
  flex-direction: column;
}

.table .tbody .td span.header {
  /* HÀNG 1 cao hơn */
  height: 36px; /* tăng từ 25px lên 36px */
  line-height: 36px;
}

/* vùng chứa các số (ở giữa header và footer) */
.table .tbody .td .numbers {
  flex: 1;
  display: grid;
  grid-template-rows: repeat(var(--rows, 10), 1fr); /* chia đều theo số lượng */
  align-items: stretch;
  gap: 0; /* khoảng cách đều, không nhảy dòng */
}

/* mỗi số chiếm 1 hàng đều nhau */
.table .tbody .td .numbers .num {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* giữ kích thước dấu & số như cũ (bạn có thể tinh chỉnh) */
.sign {
  width: 20px;
  text-align: left !important;
  display: inline-block;
  font-size: 36px !important;
  line-height: 16px !important;
  margin-bottom: 4px;
}
.val {
  text-align: right;
  font-size: 18px;
  line-height: 19px;
}
.muldiv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  width: 100%;
  flex: 1;
}

.half {
  display: flex;
  flex-direction: column;
}
.md-head {
  font-weight: 700;
  margin-bottom: 6px;
  text-align: center;
}

.md-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.md-table th,
.md-table td {
  border: 1px solid #000;
  padding: 2px 6px;
}
.md-table .no-col {
  width: 42px;
  text-align: center;
}
.md-table .expr {
  text-align: left;
  font-size: 18px;
}

.answer-cell.split2 div.totla_data {
  gap: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 2px);
  padding: 0px 1px;
  font-size: 11px;
}
.answer-cell.split2 span {
  display: inline-block;
}
.page.answers-matrix .sheet-grid {
  gap: 10px;
  grid-template-rows: unset;
}
.page.answers-matrix .sheet-grid .answers-table:last-of-type thead tr {
  /* border-top: 0 !important; */
}

/* nếu vẫn còn do border trên từng ô header */
.page.answers-matrix .sheet-grid .answers-table:last-of-type thead th {
  border-top: 0 !important;
}
.sum-table {
}
.footer-text {
  width: 35%;
  text-align: right;
}
.footer-text-x {
  width: 63%;
  text-align: right;
}
</style>
