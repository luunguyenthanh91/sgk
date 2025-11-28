<template>
  <div ref="exportRoot">
    <section class="page" v-for="(questions, qsIdx) in groups" :key="qsIdx">
      <div class="header-page">
        <span class="title-sgk">Level 4</span>
        <span class="title-sgk">Abacus Arithmetic</span>
        <span class="page-sgk"></span>
      </div>

      <main
        class="sheet-grid"
        :style="{ gridTemplateRows: sheetGridTemplateForPage(questions) }"
      >
        <div class="table" v-for="(group, gIdx) in questions.items" :key="gIdx">
          <div class="tbody">
            <div class="td td-stt" v-if="group.length > 0">
              <span class="header">No.</span>
              <span v-for="(n, idxa) in group[0].numbers" :key="idxa">
                <span class="num">
                  <span class="val">{{ idxa + 1 }}</span>
                </span>
              </span>
              <span class="footer">A.</span>
            </div>
            <div class="td" v-for="(q, qIdx) in group" :key="qIdx">
              <span class="header">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ q.id }}</span>

              <!-- Thêm wrapper .numbers -->
              <div class="numbers" :style="{ '--rows': q.numbers.length }">
                <span v-for="(n, idx) in q.numbers" :key="idx" class="num">
                  <span class="sign" v-if="n < 0">-</span>
                  <span class="sign" v-else>&nbsp;</span>
                  <span class="val">{{ Math.abs(n) }}</span>
                </span>
              </div>

              <span class="footer"></span>
            </div>
          </div>
        </div>
      </main>

      <div class="header-page align-end footer-bar">
        <span class="page-sgk">
          <img v-if="questions.pageIndex % 2 == 0" src="../assets/logo_footer.png" />
        </span>
        <span class="page-sgk">{{ questions.pageIndex }}</span>
        <span class="page-sgk">
          <img v-if="questions.pageIndex % 2 == 1" src="../assets/logo_footer.png" />
        </span>
      </div>
    </section>
    <section
      class="page answers-matrix"
      v-for="(chunk, idx) in answerPagesMatrix"
      :key="'ans-matrix-' + idx"
    >
      <div class="header-page">
        <span class="title-sgk">Level 4</span>
        <span class="title-sgk">Abacus Arithmetic</span>
        <span class="title-sgk">Answers</span>
      </div>

      <main class="sheet-grid" v-if="chunk">
        <!-- Bảng bên trái -->
        <table class="answers-table matrix">
          <thead>
            <tr>
              <th class="corner-cell">
                <span class="top-right">Pg.</span>
                <span class="bottom-left">No.</span>
              </th>
              <th v-for="(p, i) in chunk.left || []" :key="'th-left-' + i">
                {{ p ?? "" }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="qId in 15" :key="'row-left-' + qId">
              <td class="q-index">{{ qId }}</td>
              <td
                v-for="(p, i) in chunk.left || []"
                :key="'cell-left-' + i + '-' + qId"
                class="answer-cell"
              >
                <strong>{{ p ? getAnswer(p, qId) : "" }}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Bảng bên phải -->
        <table class="answers-table matrix">
          <thead>
            <tr>
              <th class="corner-cell">
                <span class="top-right">Pg.</span>
                <span class="bottom-left">No.</span>
              </th>
              <th v-for="(p, i) in chunk.right || []" :key="'th-right-' + i">
                {{ p ?? "" }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="qId in 15" :key="'row-right-' + qId">
              <td class="q-index">{{ qId }}</td>
              <td
                v-for="(p, i) in chunk.right || []"
                :key="'cell-right-' + i + '-' + qId"
                class="answer-cell"
              >
                <strong>{{ p ? getAnswer(p, qId) : "" }}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
      <div class="header-page align-end footer-bar">
        <span class="page-sgk">
          <img v-if="(baseHeaderIndex + idx + 1) % 2 == 0" src="../assets/logo_footer.png" />
        </span>
        <span class="page-sgk">{{ baseHeaderIndex + idx + 1 }}</span>
        <span class="page-sgk">
          <img v-if="(baseHeaderIndex + idx + 1) % 2 == 1" src="../assets/logo_footer.png" />
        </span>
      </div>

    </section>
  </div>
</template>

<script>
export default {
  name: "AB4",
  data() {
    return {
      groups: [], // <-- mảng thật
      answerPages: [], // <-- mảng thật
    };
  },
  computed: {
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
  async mounted() {
    const jsonPath = "/AB4.json";
    let items = [];
    try {
      const loaded = await this.tryLoadJson(jsonPath);
      if (loaded && Array.isArray(loaded)) {
        items = loaded;
      } else {
        for (let page = 0; page < 22; page++) {
          const units5 = this.generateQuestionsByPlace({
            countItems: 5,
            countNums: 10,
            place: "units",
            typeLabel: 6,
          });
          const tens10 = this.generateQuestionsByPlace({
            countItems: 10,
            countNums: 3,
            place: "tens",
            typeLabel: 6,
          });
          items.push(...units5, ...tens10); // đúng 15 câu/trang
        }

        for (let page = 0; page < 22; page++) {
          const units5 = this.generateQuestionsByPlace({
            countItems: 5,
            countNums: 10,
            place: "units",
            typeLabel: 6,
          });
          const tens10 = this.generateQuestionsByPlace({
            countItems: 10,
            countNums: 4,
            place: "tens",
            typeLabel: 6,
          });
          items.push(...units5, ...tens10); // đúng 15 câu/trang
        }

        for (let page = 0; page < 23; page++) {
          const units5 = this.generateQuestionsByPlace({
            countItems: 5,
            countNums: 10,
            place: "units",
            typeLabel: 6,
          });
          const tens10 = this.generateQuestionsByPlace({
            countItems: 10,
            countNums: 5,
            place: "tens",
            typeLabel: 6,
          });
          items.push(...units5, ...tens10); // đúng 15 câu/trang
        }
        this.saveJsonForBrowserDownload(items, "AB4.json");
      }
    } catch (err) {
      for (let page = 0; page < 22; page++) {
        const units5 = this.generateQuestionsByPlace({
          countItems: 5,
          countNums: 10,
          place: "units",
          typeLabel: 6,
        });
        const tens10 = this.generateQuestionsByPlace({
          countItems: 10,
          countNums: 3,
          place: "tens",
          typeLabel: 6,
        });
        items.push(...units5, ...tens10); // đúng 15 câu/trang
      }

      for (let page = 0; page < 22; page++) {
        const units5 = this.generateQuestionsByPlace({
          countItems: 5,
          countNums: 10,
          place: "units",
          typeLabel: 6,
        });
        const tens10 = this.generateQuestionsByPlace({
          countItems: 10,
          countNums: 4,
          place: "tens",
          typeLabel: 6,
        });
        items.push(...units5, ...tens10); // đúng 15 câu/trang
      }

      for (let page = 0; page < 23; page++) {
        const units5 = this.generateQuestionsByPlace({
          countItems: 5,
          countNums: 10,
          place: "units",
          typeLabel: 6,
        });
        const tens10 = this.generateQuestionsByPlace({
          countItems: 10,
          countNums: 5,
          place: "tens",
          typeLabel: 6,
        });
        items.push(...units5, ...tens10); // đúng 15 câu/trang
      }
      this.saveJsonForBrowserDownload(items, "AB4.json");
    }

    // Sinh đúng 22 trang, mỗi trang:
    // - 5 câu HÀNG ĐƠN VỊ (10 số, ±1..±9, target 1..9)
    // - 10 câu HÀNG CHỤC (3 số, ±10..±90, target bội số 10)

    this.groups = this.nestPages(items, 15, 5);

    // Tạo 3 trang đáp án
    this.answerPages = this.makeAnswerPages(3);
  },

  methods: {
    saveJsonForBrowserDownload(obj, filename = "AB4.json") {
      try {
        const jsonStr = JSON.stringify(obj, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        setTimeout(() => URL.revokeObjectURL(url), 1500);
        return true;
      } catch (err) {
        console.error("Failed to download JSON:", err);
        return false;
      }
    },
    async tryLoadJson(path) {
      const resp = await fetch(path, { cache: "no-store" });
      if (!resp.ok) return null;
      return await resp.json();
    },
    buildUnitsSigns10_withKNegativesRandom(
      k = 3,
      { forbidFirst = true, forbidAdjacent = true } = {}
    ) {
      const N = 10;
      const MAX_TRIES = 500;

      for (let t = 0; t < MAX_TRIES; t++) {
        const chosen = new Set();
        while (chosen.size < k) {
          const i = Math.floor(Math.random() * N);
          if (forbidFirst && i === 0) continue;
          if (forbidAdjacent && [...chosen].some((j) => Math.abs(j - i) === 1)) continue;
          chosen.add(i);
        }
        const signs = Array(N).fill(+1);
        for (const i of chosen) signs[i] = -1;
        return signs;
      }

      // Fallback: pattern cũ nếu "đen đủi" (rất hiếm)
      const signs = Array(10).fill(+1);
      [2, 5, 8].forEach((i) => (signs[i] = -1));
      return signs;
    },
    sheetGridTemplateForPage(questions) {
      if (!questions?.items?.length) return "1fr 1fr 1fr";

      const rowCounts = questions.items.map((group) => {
        const maxRows = Math.max(...group.map((q) => q.numbers?.length || 0));
        if (maxRows >= 10) return 1; // 10 dòng → 1fr
        return +(0.15 * maxRows).toFixed(4); // < 10 dòng → 0.15fr mỗi dòng
      });

      return rowCounts.map((n) => `${n}fr`).join(" ");
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
    randAbs1to9() {
      return Math.floor(Math.random() * 9) + 1;
    },
    genUnitsTenNumbersWith3Negatives() {
      // const signs = this.buildUnitsSigns10_with3Negatives();  // (CŨ) cố định 2,5,8
      const signs = this.buildUnitsSigns10_withKNegativesRandom(3); // (MỚI) ngẫu nhiên 3 vị trí âm

      const nums = [];
      let s = 0;

      for (let i = 0; i < 10; i++) {
        if (signs[i] > 0) {
          // số dương
          const nextNegIdx = signs.slice(i + 1).indexOf(-1);
          const closishNegComing = nextNegIdx >= 0 && nextNegIdx <= 2;
          let v = this.randAbs1to9();
          if (closishNegComing)
            v = Math.min(9, Math.max(v, 3 + Math.floor(Math.random() * 4)));
          if (s + v <= 0) v = Math.max(1, 1 - s);
          s += v;
          nums.push(v);
        } else {
          // số âm
          const kmax = Math.min(9, Math.max(1, s - 1));
          const k = Math.floor(Math.random() * kmax) + 1; // 1..kmax
          let v = -k;
          s += v;
          // phòng thủ nếu lỡ có 2 âm liền nhau (trong trường hợp bạn tắt forbidAdjacent)
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

      if (!this.okPrefixPositive(nums)) {
        return this.genUnitsTenNumbersWith3Negatives(); // thử lại nhanh với pattern khác
      }

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
      const drawAbs = () => Math.floor(Math.random() * 90) + 10; // 10..99

      const tryBuild = () => {
        let maxTries = 2000;

        while (maxTries-- > 0) {
          const nums = [];
          const signs = [];

          // Vị trí số âm: chọn ngẫu nhiên nhưng KHÔNG chọn vị trí 0
          const negCount = Math.floor(countNums / 2); // khoảng 2 âm nếu 4–5 số
          const negPositions = new Set();
          while (negPositions.size < negCount) {
            const pos = Math.floor(Math.random() * (countNums - 1)) + 1; // 1..(countNums-1)
            negPositions.add(pos);
          }

          // Sinh số theo từng vị trí
          for (let i = 0; i < countNums; i++) {
            const isNeg = negPositions.has(i);
            let val = drawAbs();
            val = isNeg ? -val : val;
            nums.push(val);
            signs.push(isNeg ? -1 : +1);
          }

          // Kiểm tra prefix sum > 0
          let prefix = 0;
          let valid = true;
          for (const n of nums) {
            prefix += n;
            if (prefix <= 0) {
              valid = false;
              break;
            }
          }

          if (!valid) continue;

          // Điều chỉnh dãy để tổng đúng target
          const currentSum = nums.reduce((a, b) => a + b, 0);
          const diff = target - currentSum;

          // Cố gắng dồn diff vào 1 số dương bất kỳ (ưu tiên số đầu)
          for (let i = 0; i < countNums; i++) {
            if (nums[i] > 0 && nums[i] + diff >= 10 && nums[i] + diff <= 99) {
              nums[i] += diff;

              // Kiểm tra lại prefix sau khi chỉnh
              let s = 0;
              let ok = true;
              for (const n of nums) {
                s += n;
                if (s <= 0) {
                  ok = false;
                  break;
                }
              }
              if (ok) return { numbers: nums, sum: target };
              else break; // không hợp lệ → thử lượt mới
            }
          }
        }

        return null; // fallback sau nhiều lần thử
      };

      const built = tryBuild();
      if (built) return built;

      // Fallback rất an toàn: dãy toàn dương
      const safe = Array(countNums).fill(10);
      const diff = target - safe.reduce((a, b) => a + b, 0);
      safe[0] += diff;
      return { numbers: safe, sum: target };
    },

    generateQuestionsByPlace({ countItems, countNums, place = "units", typeLabel = 3 }) {
      const items = [];
      const isUnits = place === "units";

      for (let i = 0; i < countItems; i++) {
        if (isUnits && countNums === 10) {
          const { numbers, sum } = this.genUnitsTenNumbersWith3Negatives();
          items.push({ numbers, sum, type: typeLabel, place });
          continue;
        }

        // ... các nhánh khác (tens, units khác cấu hình) giữ như bạn đã làm
        const target = this.pickTargetPositive(isUnits ? "units" : "tens");
        if (isUnits) {
          const { numbers, sum } = this.genNumbersForPositiveSum(target, countNums); // nếu còn dùng kiểu cũ
          items.push({ numbers, sum, type: typeLabel, place });
        } else {
          const { numbers, sum } = this.genTensWithConstraints(target, countNums);
          items.push({ numbers, sum, type: typeLabel, place });
        }
      }
      return items;
    },

    genUnitsTenNumbersWith3Pluses(target) {
      const signs = this.buildUnitsSigns10_with3Pluses(); // 10 phần tử, đúng 3 dấu +
      const drawAbs = () => {
        // trị tuyệt đối 1..9
        return Math.floor(Math.random() * 9) + 1;
      };

      const tryBuild = () => {
        const nums = [];
        let s = 0;

        // phát 9 số đầu theo pattern dấu, giữ prefix > 0 và còn "room" chốt target
        for (let i = 0; i < 9; i++) {
          let v = drawAbs();
          v = signs[i] < 0 ? -v : v;

          // nắn để prefix > 0
          if (s + v <= 0) {
            const bump = 1 + Math.floor(Math.random() * 3); // 1..3
            v =
              signs[i] < 0
                ? -Math.max(1, Math.abs(v) - bump)
                : Math.max(1, Math.abs(v) + bump);
            if (Math.abs(v) > 9) v = signs[i] < 0 ? -9 : 9;
            if (s + v <= 0) return null;
          }

          // khả năng chốt target: số cuối phải theo dấu signs[9], trong ±1..±9
          const s2 = s + v;
          const remain = target - s2;
          const lastSign = signs[9];
          const minLast = lastSign > 0 ? 1 : -9;
          const maxLast = lastSign > 0 ? 9 : -1;
          if (remain < minLast || remain > maxLast) return null;

          nums.push(v);
          s = s2;
        }

        // chốt số cuối
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

      // fallback: dãy rất “an toàn”
      const base = signs.map((s) => (s > 0 ? 2 : -1)); // nhiều dương nhỏ, âm nhỏ
      let s = base.reduce((a, b) => a + b, 0);
      const diff = target - s;
      // đẩy vào vị trí '+' gần đầu để không phá prefix
      const firstPlus = signs.findIndex((x) => x > 0);
      if (firstPlus >= 0) base[firstPlus] += diff;
      if (!this.okPrefixPositive(base)) {
        // nắn lại nhẹ
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
  size: A4;
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
  width: 210mm;
  height: 297mm;
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
  grid-template-rows: 1.5fr 1fr 1fr; /* Hàng 1 cao hơn */
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
  font-weight: 100 !important;
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
  min-width: 12px;
  text-align: center;
  font-size: 24px;
  line-height: 24px;
}
/* Optional styling – adjust as you like */
.answers-matrix .sheet-grid {
  grid-template-rows: repeat(2, 1fr);
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
  min-width: 12px;
  text-align: center;
  font-size: 24px;
  line-height: 24px;
}
.page-sgk img {
  width: 140px;
}
.footer-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; /* luôn căn giữa theo chiều dọc */
}
.footer-bar > span {
  flex: 1;
  text-align: center;
}
.footer-bar > span:first-child {
  text-align: left;
}
.footer-bar > span:last-child {
  text-align: right;
}
</style>
