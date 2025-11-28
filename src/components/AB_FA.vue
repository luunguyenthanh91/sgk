<template>
  <div ref="exportRoot">
    <!-- Không còn pages_1 dài; chỉ giữ nếu muốn một trang bìa, hiện để trống -->
    <section class="page" v-for="(page, pIdx) in pages_1" :key="'p-' + pIdx">
      <div class="header-page">
        <span class="title-sgk"></span>
        <span class="title-sgk"></span>
        <span class="page-sgk"></span>
      </div>

      <main class="sheet-grid sheet-grid-0">
        <div class="finger-technique"></div>
      </main>
      <div class="header-page align-end">
        <span class="page-sgk"></span>
        <span class="page-sgk">{{ page.pageIndex }}</span>
        <span class="page-sgk"></span>
      </div>
    </section>

    <!-- CHỈ RENDER 2 TRANG: groups chứa page 44 và 45 -->
    <section
      class="page"
      v-for="(questions, qsIdx) in groups"
      :key="'group-' + questions.pageIndex"
      :data-id="qsIdx"
    >
      <div class="header-page">
        <span class="title-sgk">Level 7</span>
        <span class="title-sgk">Abacus Arithmetic</span>
        <span class="page-sgk"></span>
      </div>

      <!-- Nếu là trang 45: hiển thị ô Revision + Write the Formula -->
      <div v-if="questions.pageIndex === 45" class="formula-area">
        <div class="formula-inner">
          <div class="revision">
            <h3>Revision</h3>
            <ul>
              <li>+5 = +10 - 5</li>
              <li>+6 = +10 - 4</li>
              <li>+7 = +10 - 3</li>
              <li>+8 = +10 - 2</li>
              <li>+9 = +10 - 1</li>
            </ul>
          </div>
          <div class="write-formula">
            <h3>Write the Formulae:</h3>
            <ol>
              <li>......................</li>
              <li>......................</li>
              <li>......................</li>
              <li>......................</li>
              <li>......................</li>
              <li>......................</li>
              <li>......................</li>
              <li>......................</li>
            </ol>
          </div>
        </div>
      </div>

      <main
        class="sheet-grid"
        :style="{ gridTemplateRows: sheetGridTemplateForPage(questions) }"
      >
        <div
          class="table"
          v-for="(group, gIdx) in questions.items"
          :key="'grp-' + questions.pageIndex + '-' + gIdx"
        >
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
            <div
              class="td"
              v-for="(q, qIdx) in group"
              :key="(q.page || questions.pageIndex) + '-' + (q.id || qIdx)"
            >
              <span class="header">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ q.id }}</span>

              <!-- Thêm wrapper .numbers -->
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
        <span class="page-sgk">{{ questions.pageIndex }}</span>
        <span class="page-sgk"></span>
      </div>
    </section>

    <!-- answers removed for now (you said remove later pages) -->
  </div>
</template>

<script>
export default {
  name: "AB_FA_44_45",
  data() {
    return {
      groups: [], // will hold exactly 2 pages (44 & 45)
      pages_1: [], // kept empty to avoid other pages
    };
  },
  mounted() {
    // We'll build exactly two pages: 44 (40 questions) and 45 (30 questions + formula header)
    const thirdMap = {
      // unit digit -> possible values for the third number (small ints, +/-)
      0: [1, 2, 3, 5, 6, 7, 8, 9],
      1: [1, 2, 3, 5, 6, 7, 8, -1],
      2: [1, 2, 5, 6, 7, -1, -2],
      3: [5, 6, -2, -3],
      4: [5, -2, -3, -4],
      5: [-5, 2, 3, 4],
      6: [-1, -5, -6],
      7: [-2, -5, -6, -7],
      8: [-2, -3, -5, -6, -7, -8],
      9: [-3, -4, -5, -6, -7, -8, -9],
    };

    const randPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // helper to format numbers (we'll store numbers as actual numbers; display handled by formatVal)
    const makeTwoNumber = (a, b) => ({ numbers: [a, b], sum: a + b, format: "int" });
    const makeThreeNumber = (a, b, c, fmt = "int") => ({
      numbers: [a, b, c],
      sum: a + b + c,
      format: fmt,
    });

    // Create page 44:
    const page44_items = [];
    const tensFromIndex = (i) => 10 * ((i % 4) + 1); // 10,20,30,40 repeating

    // Row 1: 10 two-number questions
    for (let i = 0; i < 10; i++) {
      const a = tensFromIndex(i); // 10..40
      const b = (i % 9) + 1; // 1..9 then 1
      const q = makeTwoNumber(a, b);
      q.id = i + 1;
      q.page = 44;
      page44_items.push(q);
    }

    // Rows 2-4: 3-number questions, 30 items
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 10; i++) {
        const idx = row * 10 + i;
        const a = tensFromIndex(i + 2); // vary a bit
        const b = ((i * 3 + row) % 9) + 1;
        const unit = (a + b) % 10;
        const candidates = thirdMap[unit] || [1];
        let c = randPick(candidates);
        if (a + b + c <= 0) {
          const pos = candidates.find((x) => a + b + x > 0);
          if (pos !== undefined) c = pos;
          else c = Math.abs(candidates[0]) || 1;
        }
        const q = makeThreeNumber(a, b, c);
        q.id = 10 + idx + 1;
        q.page = 44;
        page44_items.push(q);
      }
    }

    const chunkArray = (arr, size) => {
      const out = [];
      for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
      return out;
    };
    const page44_groups = {
      pageIndex: 44,
      items: chunkArray(page44_items, 10), // gives 4 groups, each with 10 questions (rows)
    };

    // Create page 45:
    const page45_items = [];
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 10; i++) {
        const a = 10 * (((i + row + 1) % 5) + 1); // 10..50 variety
        const b = ((i * 2 + row) % 9) + 1; // 1..9
        const unit = (a + b) % 10;
        const candidates = thirdMap[unit] || [1];
        let c = randPick(candidates);
        if (a + b + c <= 0) {
          const pos = candidates.find((x) => a + b + x > 0);
          if (pos !== undefined) c = pos;
          else c = Math.abs(candidates[0]) || 1;
        }
        const q = makeThreeNumber(a, b, c);
        q.id = row * 10 + i + 1;
        q.page = 45;
        page45_items.push(q);
      }
    }
    const page45_groups = {
      pageIndex: 45,
      items: chunkArray(page45_items, 10), // 3 groups of 10
    };

    // Assign to this.groups
    this.groups = [page44_groups, page45_groups];
  },

  methods: {
    // moved here so template can call sheetGridTemplateForPage(questions)
    sheetGridTemplateForPage(pageOrItems) {
      const groups = Array.isArray(pageOrItems)
        ? pageOrItems
        : pageOrItems && Array.isArray(pageOrItems.items)
        ? pageOrItems.items
        : [];

      if (!groups || groups.length === 0) return "1fr 1fr 1fr";

      const toFr = (maxRows) => {
        if (!Number.isFinite(maxRows) || maxRows <= 0) return 1;
        if (maxRows >= 10) return 1.35;
        if (maxRows >= 7) return 1.1;
        if (maxRows >= 5) return 0.9;
        if (maxRows == 3) return 0.50;
        return 0.35;
      };

      const frs = groups.map((group) => {
        const maxRows = Math.max(
          ...group.map((q) => (q && Array.isArray(q.numbers) ? q.numbers.length : 0))
        );
        return `${toFr(maxRows)}fr`;
      });

      return frs.join(" ");
    },

    formatVal(n, fmt) {
      if (fmt === "decimal") {
        const abs = Math.abs(n);
        const s = abs.toFixed(2);
        return s.replace(/^0(?=\.)/, "");
      }
      return Math.abs(n);
    },
  },
};
</script>

<style>
/* giữ nguyên CSS chính của bạn; thêm vài style cho formula */
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

.header-page {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 60px;
}
.header-page.align-end {
  height: 80px;
}
.header-page span {
  font-size: 17px;
  color: #000;
  font-weight: bold;
}
.header-page span.page-sgk {
  font-size: 17px;
  color: #000;
  font-weight: unset;
}

.sheet-grid {
  display: grid;
  grid-template-rows: 0.8fr 0.7fr 1fr;
  gap: 30px;
  flex: 1;
  width: 100%;
}
.table {
  border: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  flex-direction: column;
  width: 100%;
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
.table .tbody .td:last-child {
  border-right: 0px solid #000;
}
.table .tbody .td.td-stt {
  width: 50px !important;
  flex: unset;
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

.num {
  display: flex;
  justify-content: center;
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
  font-size: 24px;
  line-height: 24px;
}

.numbers {
  flex: 1;
  display: grid;
  grid-template-rows: repeat(var(--rows, 10), 1fr);
  align-items: stretch;
  gap: 0;
}
.numbers .num {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.formula-area {
  width: 100%;
  border: 1px dashed #666;
  padding: 10px;
  margin-bottom: 8px;
}
.formula-inner {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.revision,
.write-formula {
  flex: 1;
  padding: 6px;
}
.revision h3,
.write-formula h3 {
  margin: 0 0 6px 0;
  font-size: 14px;
}
.write-formula ol {
  margin: 0;
  padding-left: 18px;
}
</style>
