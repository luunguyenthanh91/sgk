<template>
  <div ref="exportRoot">
    <section class="page" v-for="(page, pIdx) in pages_1" :key="'p-' + pIdx">
      <div class="header-page">
        <span class="title-sgk">Number and Image</span>
        <span class="title-sgk"></span>
        <span class="page-sgk"></span>
      </div>

      <main class="sheet-grid sheet-grid-0">
        <div class="table" v-for="g in 2" :key="'g-' + g">
          <div class="tbody">
            <div
              class="td"
              v-for="item in getItemsInGroup(page, g)"
              :key="'q-' + item.pageIndex + '-' + item.idxInPage"
            >
              <span class="header">{{ item.idxInPage }}</span>
              <span class="content-pv">
                <div class="pv-header-bar">
                  <div class="item-icon">
                    <!-- nếu số >= 5 thì hiện icon -->
                    <i v-if="item.value >= 5" class="fa" :class="'fa-' + item.icon"></i>
                  </div>
                </div>
                <div class="pv-topbar">
                  <div class="dotted-list">
                    <span class="dotted-none dotted"></span>
                  </div>
                </div>
                <div class="pv-body-bar">
                  <div class="item-icon">
                    <i
                      v-for="n in item.value < 5 ? item.value : item.value - 5"
                      :key="n"
                      class="fa"
                      :class="'fa-' + item.icon"
                    ></i>
                  </div>
                </div>
              </span>
              <span class="footer footer-text">
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>
      </main>
      <div class="header-page align-end">
        <span class="page-sgk"></span>
        <span class="page-sgk">{{ page.pageIndex }}</span>
        <span class="page-sgk"></span>
      </div>
    </section>
    <section class="page" v-for="(page, pIdx) in pages" :key="'p-' + pIdx">
      <div class="header-page">
        <span class="title-sgk">Foundation A</span>
        <span class="title-sgk">Mental Arithmetic</span>
        <span class="title-sgk">1 digit</span>
      </div>

      <main class="sheet-grid sheet-grid-1">
        <div class="table" v-for="g in 3" :key="'g-' + g">
          <div class="tbody">
            <div class="td td-stt">
              <span class="header">No.</span>
              <span>
                <span class="num">
                  <span class="val"></span>
                </span>
              </span>
              <span class="footer">A.</span>
            </div>
            <div
              class="td"
              v-for="item in getItemsInGroup(page, g)"
              :key="'q-' + item.pageIndex + '-' + item.idxInPage"
            >
              <span class="header">{{ item.idxInPage }}</span>
              <span class="content-pv">
                <div class="pv-header-bar">
                  <div class="item-icon">
                    <!-- nếu số >= 5 thì hiện icon -->
                    <i v-if="item.value >= 5" class="fa" :class="'fa-' + item.icon"></i>
                  </div>
                </div>
                <div class="pv-topbar">
                  <div class="dotted-list">
                    <span class="dotted-none dotted"></span>
                  </div>
                </div>
                <div class="pv-body-bar">
                  <div class="item-icon">
                    <i
                      v-for="n in item.value < 5 ? item.value : item.value - 5"
                      :key="n"
                      class="fa"
                      :class="'fa-' + item.icon"
                    ></i>
                  </div>
                </div>
              </span>
              <span class="footer"></span>
            </div>
          </div>
        </div>
      </main>
      <div class="header-page align-end">
        <span class="page-sgk"></span>
        <span class="page-sgk">{{ page.pageIndex + pages_1.length }}</span>
        <span class="page-sgk"></span>
      </div>
    </section>

    <section class="page" v-for="(page, pIdx) in pages_2" :key="'p-' + pIdx">
      <div class="header-page">
        <span class="title-sgk">Foundation A</span>
        <span class="title-sgk">Mental Arithmetic</span>
        <span class="title-sgk">2 digits</span>
      </div>

      <main class="sheet-grid sheet-grid-2">
        <div class="table" v-for="g in 3" :key="'g-' + g">
          <div class="tbody">
            <div class="td td-stt">
              <span class="header">No.</span>
              <span>
                <span class="num">
                  <span class="val"></span>
                </span>
              </span>
              <span class="footer">A.</span>
            </div>
            <div
              class="td"
              v-for="item in getItemsInGroup(page, g)"
              :key="'q-' + item.pageIndex + '-' + item.idxInPage"
            >
              <span class="header">{{ item.idxInPage }}</span>
              <span class="content-pv">
                <div class="pv-header-bar">
                  <div
                    class="item-icon"
                    v-for="(digit, dIdx) in String(item.value).split('').map(Number)"
                    :key="'digit-' + item.pageIndex + '-' + item.idxInPage + '-' + dIdx"
                  >
                    <i v-if="digit >= 5" class="fa" :class="'fa-' + item.icon"></i>
                  </div>
                </div>

                <div class="pv-topbar">
                  <div class="dotted-list">
                    <span class="dotted-none"></span>
                    <span class="dotted-none dotted"></span>
                  </div>
                </div>
                <div class="pv-body-bar">
                  <div
                    class="item-icon"
                    v-for="(digit, dIdx) in String(item.value).split('').map(Number)"
                    :key="'body-' + item.pageIndex + '-' + item.idxInPage + '-' + dIdx"
                  >
                    <i
                      v-for="n in digit < 5 ? digit : digit - 5"
                      :key="'icon-' + n"
                      class="fa"
                      :class="'fa-' + item.icon"
                    ></i>
                  </div>
                </div>
              </span>
              <span class="footer"></span>
            </div>
          </div>
        </div>
      </main>
      <div class="header-page align-end">
        <span class="page-sgk"></span>
        <span class="page-sgk">{{ page.pageIndex + pages.length + pages_1.length }}</span>
        <span class="page-sgk"></span>
      </div>
    </section>
    <section class="page col-3-icon" v-for="(page, pIdx) in pages_3" :key="'p-' + pIdx">
      <div class="header-page">
        <span class="title-sgk">Foundation A</span>
        <span class="title-sgk">Mental Arithmetic</span>
        <span class="title-sgk">3 digits</span>
      </div>

      <main class="sheet-grid sheet-grid-2">
        <div class="table" v-for="g in 3" :key="'g-' + g">
          <div class="tbody">
            <div class="td td-stt">
              <span class="header">No.</span>
              <span>
                <span class="num">
                  <span class="val"></span>
                </span>
              </span>
              <span class="footer">A.</span>
            </div>
            <div
              class="td"
              v-for="item in getItemsInGroup(page, g)"
              :key="'q-' + item.pageIndex + '-' + item.idxInPage"
            >
              <span class="header">{{ item.idxInPage }}</span>
              <span class="content-pv">
                <div class="pv-header-bar">
                  <div
                    class="item-icon"
                    v-for="(digit, dIdx) in String(item.value).split('').map(Number)"
                    :key="'digit-' + item.pageIndex + '-' + item.idxInPage + '-' + dIdx"
                  >
                    <i v-if="digit >= 5" class="fa" :class="'fa-' + item.icon"></i>
                  </div>
                </div>

                <div class="pv-topbar">
                  <div class="dotted-list">
                    <span class="dotted-none"></span>
                    <span class="dotted-none"></span>
                    <span class="dotted-none dotted"></span>
                  </div>
                </div>
                <div class="pv-body-bar">
                  <div
                    class="item-icon"
                    v-for="(digit, dIdx) in String(item.value).split('').map(Number)"
                    :key="'body-' + item.pageIndex + '-' + item.idxInPage + '-' + dIdx"
                  >
                    <i
                      v-for="n in digit < 5 ? digit : digit - 5"
                      :key="'icon-' + n"
                      class="fa"
                      :class="'fa-' + item.icon"
                    ></i>
                  </div>
                </div>
              </span>
              <span class="footer"></span>
            </div>
          </div>
        </div>
      </main>
      <div class="header-page align-end">
        <span class="page-sgk"></span>
        <span class="page-sgk">{{ page.pageIndex + pages.length + pages_1.length + pages_2.length }}</span>
        <span class="page-sgk"></span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "MA_FA",
  data() {
    return {
      faIcons: [
        "star",
        "ice-cream",
        "cookie",
        "cookie-bite",
        "bread-slice",
        "cheese",
        "pizza-slice",
        "hotdog",
        "hamburger",
        "egg",
        "apple-alt",
        "lemon",
        "carrot",
        "seedling",
        "leaf",
        "stroopwafel",
        "candy-cane",
        "dog",
        "fish",
        "frog",
        "hippo",
        "horse",
        "crow",
        "paw",
        "car",
        "bus",
        "bicycle",
        "motorcycle",
        "train",
        "plane",
        "ship",
        "subway",
        "snowman",
        "tree",
      ],
      pages_1: [], // mỗi phần tử là 1 trang (12 câu), đã tách thành 3 nhóm x 4
      pages: [], // mỗi phần tử là 1 trang (12 câu), đã tách thành 3 nhóm x 4
      pages_2: [], // mỗi phần tử là 1 trang (12 câu), đã tách thành 3 nhóm x 4
      pages_3: [], // mỗi phần tử là 1 trang (12 câu), đã tách thành 3 nhóm x 4
    };
  },
  mounted() {
    this.generateAll();
  },
  methods: {
    isThousandOrUnit(value, idx) {
      const s = String(value);
      const len = s.length;
      const isUnit = idx === len - 1;
      const isThousand = len === 4 && idx === 0;
      return isUnit || isThousand;
    },

    generateAll() {
      const partA = this.makeNumberObjects(168, 1, 9);
      const partB = this.makeNumberObjects(192, 10, 99);
      const partC = this.makeNumberObjects(468, 100, 999);
      // const all = [...partA, ...partB];
      // 12 câu / trang, trong đó mỗi trang tách thành 3 nhóm x 4 câu
      this.pages = this.paginateWithGroups(partA, 12, 4);
      this.pages_2 = this.paginateWithGroups(partB, 12, 4);
      this.pages_3 = this.paginateWithGroups(partC, 12, 4);

      const out = [];
      for (let i = 0; i <= 9; i++) {
        const value = i;
        const icon = this.pickIcon();
        out.push({
          value,
          icon,
          stt: this.sttFromValue(value),
          pageIndex: null,
          idxInPage: null,
          groupIndex: null,
          idxInGroup: null,
        });
      }
      this.pages_1 = this.paginateWithGroups(out, 10, 5);
    },

    makeNumberObjects(count, min, max) {
      const out = [];
      for (let i = 0; i < count; i++) {
        const value = this.randInt(min, max);
        const icon = this.pickIcon();
        out.push({
          value,
          icon,
          stt: this.sttFromValue(value),
          pageIndex: null,
          idxInPage: null,
          groupIndex: null, // 1..3
          idxInGroup: null, // 1..4
        });
      }
      return out;
    },

    // ✨ TÁCH 12 THÀNH 3 NHÓM × 4
    paginateWithGroups(items, perPage = 12, groupSize = 4) {
      const pagesRaw = this.chunkArray(items, perPage); // mảng các trang (mỗi trang = 12 phần tử)
      return pagesRaw.map((pageArr, pIdx) => {
        // gán chỉ số trong trang
        const pageTagged = pageArr.map((q, i) => ({
          ...q,
          pageIndex: pIdx + 1, // số trang
          idxInPage: i + 1, // 1..12
        }));

        // chia 12 thành 3 nhóm x 4
        const groups = this.chunkArray(pageTagged, groupSize); // [ [4], [4], [4] ]
        // gán groupIndex và idxInGroup
        let flattened = [];
        groups.forEach((grp, gIdx) => {
          grp.forEach((q, j) => {
            flattened.push({
              ...q,
              groupIndex: gIdx + 1, // 1..3
              idxInGroup: j + 1, // 1..4
            });
          });
        });

        // Trả về cấu trúc trang có sẵn cả groups để render cho tiện
        return {
          pageIndex: pIdx + 1,
          items: flattened, // 12 phần tử có đủ page/group indexes
          groups: groups.map((grp, gIdx) =>
            grp.map((q, j) => ({
              ...q,
              groupIndex: gIdx + 1,
              idxInGroup: j + 1,
            }))
          ), // [[4],[4],[4]]
        };
      });
    },

    // helper render: lấy nhóm theo trang
    getGroupsOfPage(page) {
      return page.groups; // trả ra [[4],[4],[4]]
    },

    // helper render: lấy items theo nhóm của 1 trang
    getItemsInGroup(page, groupIdx /* 1..3 */) {
      return page.groups[groupIdx - 1] || [];
    },

    randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    pickIcon() {
      const i = Math.floor(Math.random() * this.faIcons.length);
      return this.faIcons[i];
    },
    sttFromValue(n) {
      if (n < 10) return 1;
      if (n < 100) return 2;
      if (n < 1000) return 3;
      if (n < 10000) return 4;
      return 4;
    },
    chunkArray(array, size) {
      const out = [];
      for (let i = 0; i < array.length; i += size) {
        out.push(array.slice(i, i + size));
      }
      return out;
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
  grid-template-rows: repeat(3, 1fr);
  gap: 30px;
  flex: 1;
  width: 100%;
}
.sheet-grid-0 {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.sheet-grid-0 .table {
  width: 100%;
  height: 33%;
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
  justify-content: flex-start;
  align-items: center;
  height: 100%;
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

.table .tbody .td span.footer-text {
  border-top: 1px solid #000;
  flex: unset;
  text-align: center;
  font-size: 22px;
  line-height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  font-weight: bold;
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
  font-size: 10pt;
  line-height: 1.3;
}
.answers-table tr th {
  font-size: 9px;
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
  width: 32px;
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
.answers-matrix .answers-table.matrix {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.answers-matrix th,
.answers-matrix td {
  border: 1px solid #000;
  padding: 6px 8px;
  text-align: center;
  vertical-align: middle;
  word-wrap: break-word;
}
.answers-matrix thead th:first-child,
.answers-matrix .q-index {
  width: 22px; /* row label column */
  font-weight: 600;
  height: 22px;
}
.answers-matrix .answer-cell {
  min-width: 70px;
  height: 32px;
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
.answers-matrix .answers-table.matrix tbody tr:nth-child(4n):not(:last-child) {
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
  width: 48px;
  height: 100%;
  border-top: 1px solid black;
  border-left: 1px solid transparent;
  transform: rotate(41deg);
  transform-origin: top left;
  pointer-events: none;
}

/* Chữ "Pg." ở góc trên phải */
.corner-cell .top-right {
  position: absolute;
  top: 4px;
  right: 4px;
}

/* Chữ "No." ở góc dưới trái */
.corner-cell .bottom-left {
  position: absolute;
  bottom: 4px;
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
.content-pv {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
  gap: 15px;
}
.pv-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  width: calc(100% - 40px);
}
.pv-header-bar .item-icon {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #000;
  height: 20px;
}
.pv-body-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  width: calc(100% - 40px);
}
.pv-body-bar .item-icon {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #000;
  flex-direction: column;
  gap: 10px;
}
.pv-body-bar .item-icon i,
.pv-header-bar .item-icon {
  opacity: 0.8;
}

.pv-topbar {
  height: 1px;
  background: #000;
  position: relative;
  width: calc(100% - 30px);
}
.pv-topbar .dotted-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: absolute;
  left: 5px;
  top: 0;
  width: calc(100% - 10px);
}
.pv-topbar .dotted-list .dotted-none {
  position: relative;
  flex: 1;
  text-align: center;
}
.pv-topbar .dotted-list .dotted::after {
  content: "";
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 6pt;
  height: 6pt;
  background: #000;
  border-radius: 50%;
  top: -3px;
}
.sheet-grid-2 .pv-topbar {
  width: calc(100% - 30px);
}
.sheet-grid-2 .pv-header-bar,
.sheet-grid-2 .pv-body-bar {
  width: calc(100% - 80px);
  gap: 5px;
}
.sheet-grid-2 .pv-topbar .dotted-list {
  width: calc(100% - 50px);
  left: 25px;
}
.pv-header-bar .item-icon {
  font-size: 24px;
}
.col-3-icon .sheet-grid-2 .pv-header-bar,
.col-3-icon .sheet-grid-2 .pv-body-bar {
  width: calc(100% - 40px);
}
.col-3-icon .sheet-grid-2 .pv-topbar .dotted-list {
  width: calc(100% - 10px);
  left: 5px;
}
</style>
