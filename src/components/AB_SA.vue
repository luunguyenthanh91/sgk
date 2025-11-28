<template>
  <div ref="exportRoot">
    <section class="page" v-for="(page, pIdx) in pages_1" :key="'p-' + pIdx">
      <div class="header-page">
        <span class="title-sgk"></span>
        <span class="title-sgk"></span>
        <span class="page-sgk"></span>
      </div>

      <main class="sheet-grid sheet-grid-0">
        <div class="finger-technique">
          <h2 class="finger-title">FINGER TECHNIQUE</h2>
          <table class="finger-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Number</th>
                <th>Fingers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><span class="neg-sign">+</span>1</td>
                <td>Thumb</td>
              </tr>
              <tr>
                <td>2</td>
                <td><span class="neg-sign">+</span>2</td>
                <td>Thumb</td>
              </tr>
              <tr>
                <td>3</td>
                <td><span class="neg-sign">+</span>3</td>
                <td>Thumb</td>
              </tr>
              <tr>
                <td>4</td>
                <td><span class="neg-sign">+</span>4</td>
                <td>Thumb</td>
              </tr>
              <tr>
                <td>5</td>
                <td><span class="neg-sign">+</span>5</td>
                <td>Index</td>
              </tr>
              <tr>
                <td>6</td>
                <td><span class="neg-sign">+</span>6</td>
                <td>Index, Thumb pinch</td>
              </tr>
              <tr>
                <td>7</td>
                <td><span class="neg-sign">+</span>7</td>
                <td>Index, Thumb pinch</td>
              </tr>
              <tr>
                <td>8</td>
                <td><span class="neg-sign">+</span>8</td>
                <td>Index, Thumb pinch</td>
              </tr>
              <tr>
                <td>9</td>
                <td><span class="neg-sign">+</span>9</td>
                <td>Index, Thumb pinch</td>
              </tr>
              <tr>
                <td>10</td>
                <td><span class="neg-sign">-</span>1</td>
                <td>Index</td>
              </tr>
              <tr>
                <td>11</td>
                <td><span class="neg-sign">-</span>2</td>
                <td>Index</td>
              </tr>
              <tr>
                <td>12</td>
                <td><span class="neg-sign">-</span>3</td>
                <td>Index</td>
              </tr>
              <tr>
                <td>13</td>
                <td><span class="neg-sign">-</span>4</td>
                <td>Index</td>
              </tr>
              <tr>
                <td>14</td>
                <td><span class="neg-sign">-</span>5</td>
                <td>Index</td>
              </tr>
              <tr>
                <td>15</td>
                <td><span class="neg-sign">-</span>6</td>
                <td>Index, Thumb split</td>
              </tr>
              <tr>
                <td>16</td>
                <td><span class="neg-sign">-</span>7</td>
                <td>Index, Thumb split</td>
              </tr>
              <tr>
                <td>17</td>
                <td><span class="neg-sign">-</span>8</td>
                <td>Index, Thumb split</td>
              </tr>
              <tr>
                <td>18</td>
                <td><span class="neg-sign">-</span>9</td>
                <td>Index, Thumb split</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <div class="header-page align-end footer-bar">
        <span class="page-sgk">
          <img v-if="page.pageIndex % 2 == 0" src="../assets/logo_footer.png" />
        </span>
        <span class="page-sgk">{{ page.pageIndex }}</span>
        <span class="page-sgk">
          <img v-if="page.pageIndex % 2 == 1" src="../assets/logo_footer.png" />
        </span>
      </div>
    </section>
    <section class="page" v-for="(page, pIdx) in pages" :key="'p-' + pIdx">
      <div class="header-page">
        <span class="title-sgk">Starter A</span>
        <span class="title-sgk"></span>
        <span class="title-sgk">{{ page.items[0].right_content }}</span>
      </div>

      <main class="sheet-grid list-one-column sheet-grid-1">
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
                    <span
                      v-for="(d, idx) in digitsOf(item.value)"
                      :key="`dot-${item.pageIndex}-${item.idxInPage}-${idx}`"
                      class="dotted-none"
                      :class="{ dotted: isThousandOrUnit(item.value, idx) }"
                    ></span>
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
              <div class="footer-math" :class="item.unit < 0 ? 'right' : ''">
                <span v-if="item.unit < 0">
                  <span class="neg-sign">-</span>{{ Math.abs(item.unit) }}
                </span>
                <span v-else>{{ item.unit }}</span>
              </div>
              <span class="footer"></span>
            </div>
          </div>
        </div>
      </main>
      <div class="header-page align-end footer-bar">
        <span class="page-sgk">
          <img v-if="page.pageIndex % 2 == 0" src="../assets/logo_footer.png" />
        </span>
        <span class="page-sgk">{{ page.pageIndex }}</span>
        <span class="page-sgk">
          <img v-if="page.pageIndex % 2 == 1" src="../assets/logo_footer.png" />
        </span>
      </div>
    </section>
    <section
      class="page answers-matrix"
      v-for="(chunk, idx) in answerPagesMatrix"
      :key="'ans-matrix-' + idx"
    >
      <div class="header-page">
        <span class="title-sgk">Starter A</span>
        <span class="title-sgk"></span>
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
          <img
            v-if="(pages_1.length + pages.length + idx + 1) % 2 == 0"
            src="../assets/logo_footer.png"
          />
        </span>
        <span class="page-sgk">{{ pages_1.length + pages.length + idx + 1 }}</span>
        <span class="page-sgk">
          <img
            v-if="(pages_1.length + pages.length + idx + 1) % 2 == 1"
            src="../assets/logo_footer.png"
          />
        </span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AB_SA",
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
        "horse",
        "crow",
        "paw",
        "car",
        "bus",
        "train",
        "plane",
        "ship",
        "subway",
        "snowman",
        "tree",
      ],
      pages: [], // mỗi phần tử là 1 trang (12 câu), đã tách thành 3 nhóm x 4
      answerPagesMatrix: [],
      pages_1: [
        {
          pageIndex: 1,
        },
      ],
    };
  },
  async mounted() {
    const jsonPath = "/AB_SA.json";

    try {
      const loaded = await this.tryLoadJson(jsonPath);
      if (loaded && Array.isArray(loaded)) {
        this.pages = loaded;
      } else {
        this.generateAll();
      }
    } catch (err) {
      console.log(err);
      this.generateAll();
    }

    this.buildAnswerPagesMatrix();
  },
  methods: {
    saveJsonForBrowserDownload(obj, filename = "AB_SA.json") {
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
    buildAnswerPagesMatrix() {
      if (!this.pages || this.pages.length === 0) return;

      const pageIndices = Array.from(new Set(this.pages.map((p) => p.pageIndex))).sort(
        (a, b) => a - b
      );

      const matrix = [];
      for (let i = 0; i < pageIndices.length; i += 24) {
        let chunk = pageIndices.slice(i, i + 24);

        // 🔧 Nếu chưa đủ 24, thêm null để đủ (tránh lỗi khi v-for)
        while (chunk.length < 24) {
          chunk.push(null);
        }

        matrix.push({
          left: chunk.slice(0, 12),
          right: chunk.slice(12, 24),
        });
      }

      this.answerPagesMatrix = matrix;
    },

    getAnswer(pageIndex, idxInPage) {
      const page = this.pages.find((p) => p.pageIndex === pageIndex);
      if (!page) return "";

      const item = page.items.find((q) => q.idxInPage === idxInPage);
      if (!item) return "";

      return item.result;
    },
    pick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    makeNumberObjectsForPage1to67(pageIndex, count) {
      const unitMap = {
        9: [-3, -4, -5, -6, -7, -8, -9],
        8: [-2, -3, -5, -6, -7, -8],
        7: [-2, -5, -6, -7],
        6: [-1, -5, -6],
        5: [-5, +2, +3, +4],
        4: [+5, -2, -3, -4],
        3: [+5, +6, -2, -3],
        2: [+1, +2, +5, +6, +7, -1, -2],
        1: [+1, +2, +3, +5, +6, +7, +8, -1],
      };

      let content = "";

      const out = [];

      // Danh sách các cặp (value, unit) đã được chọn để tránh lặp
      const selectedPairs = new Set();
      const maxAttempts = 1000;
      let right_content = "";
      for (let i = 0; i < count; i++) {
        let value, unit, result;
        let attempts = 0;

        // === LOGIC CHO pageIndex <= 12: CHỈ SỐ ĐƠN VỊ TỪ 1 ĐẾN 4 VÀ ĐẢM BẢO RESULT >= 0 ===
        if (pageIndex <= 12) {
          /* eslint-disable */
          value = this.randInt(1, 4);
          do {
            let unitMagnitude = this.randInt(1, 4);
            let sign = this.randInt(0, 1) === 0 ? 1 : -1;
            if (value == 4) {
              unitMagnitude = this.randInt(1, 3);
              sign = -1;
            } else if (value == 3) {
              unitMagnitude = 1;
            } else if (value == 2) {
              unitMagnitude = this.randInt(1, 2);
              sign = 1;
            } else if (value == 1) {
              unitMagnitude = this.randInt(1, 3);
              sign = 1;
            }
            unit = unitMagnitude * sign;
            result = value + unit;
            const pairKey = `${value},${unit}`;
            attempts++;

            // 👉 chỉ chấp nhận khi kết quả nằm trong 1–4 và chưa trùng lặp
            if (result >= 0 && result < 5 && !selectedPairs.has(pairKey)) {
              break;
            }
            // 👉 nếu thử quá nhiều lần thì dừng để tránh vòng lặp vô hạn
            if (attempts > maxAttempts) break;
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }

          right_content = "Lower beads";
        } else if (pageIndex > 12 && pageIndex <= 14) {
          /* eslint-disable */
          do {
            // 1. Random Value (1 đến 4)
            value = this.randInt(1, 9);

            const sign = this.randInt(0, 1) === 0 ? 1 : -1;
            unit = value >= 5 ? -5 : 5;

            result = value + unit;
            const pairKey = `${value},${unit}`;

            attempts++;

            // Điều kiện thoát vòng lặp:
            // A. result phải >= 0
            // B. Cặp (value, unit) chưa từng được chọn
            // C. Hoặc đã cố gắng quá nhiều lần (để tránh lặp vô hạn nếu không đủ tổ hợp)
            if ((result > 0 && !selectedPairs.has(pairKey)) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          // Thêm cặp (value, unit) đã chọn vào Set
          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }

          right_content = "Upper beads";
          // === LOGIC CHO pageIndex > 12: GIỮ LOGIC BAN ĐẦU, THÊM RANDOM ÂM DƯƠNG CHO UNIT ===
        } else if (pageIndex > 14 && pageIndex <= 22) {
          /* eslint-disable */
          do {
            value = this.randInt(1, 9);
            const sign = this.randInt(0, 1) === 0 ? 1 : -1;

            // ---- 80/20 random rule ----
            const chance = Math.random(); // 0 → 1
            if (chance < 0.85) {
              if (value > 5) {
                unit = -5;
              } else if (value < 5) {
                unit = 5;
              } else {
                const randUnitMag = this.randInt(1, 4);
                unit = randUnitMag;
              }
            } else {
              value = 5;
              // 20%: unit = ±(1..4)
              const randUnitMag = this.randInt(1, 4);
              unit = randUnitMag;
            }

            result = value + unit;
            const pairKey = `${value},${unit}`;
            attempts++;

            // Điều kiện hợp lệ
            if ((result > 0 && !selectedPairs.has(pairKey)) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          // Lưu vào set
          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }

          right_content = "Upper beads";
          // === LOGIC CHO pageIndex > 12: GIỮ LOGIC BAN ĐẦU, THÊM RANDOM ÂM DƯƠNG CHO UNIT ===
        } else if (pageIndex == 23) {
          // === PAGE 23: Upper, Lower beads Mixed (+6) ===
          const totalQuestions = count; // thường là 15
          const mainQuestions = 10; // số câu có unit = +6
          const extraQuestions = totalQuestions - mainQuestions;
          right_content = "Upper, Lower beads Mixed (+6)";

          const mainItems = [];
          const extraItems = [];

          // --- 10 câu có unit = +6 ---
          for (let j = 0; j < mainQuestions; j++) {
            const value = this.randInt(1, 3); // chỉ 1, 2, 3
            const unit = 6;
            const result = value + unit;
            mainItems.push({ value, unit, result });
          }

          // --- 5 câu còn lại (theo bảng khách hàng) ---
          for (let j = 0; j < extraQuestions; j++) {
            let value, unit, result;

            do {
              value = this.randInt(2, 9);
              let allowedUnits = [];

              if ([2, 3, 4].includes(value)) {
                allowedUnits = [-1, -2, -3, -4, +5];
              } else if ([5, 6, 7, 8, 9].includes(value)) {
                allowedUnits = [-5];
              }

              unit = this.pick(allowedUnits);
              result = value + unit;
              // Đảm bảo không âm
            } while (result < 0);

            extraItems.push({ value, unit, result });
          }

          // --- Gộp xen kẽ giữa 2 nhóm ---
          const mixedItems = [];
          const maxLen = Math.max(mainItems.length, extraItems.length);
          let mainIndex = 0;
          let extraIndex = 0;

          for (let j = 0; j < totalQuestions; j++) {
            // xen kẽ: 2 câu main, 1 câu extra
            if (
              (j % 3 !== 2 && mainIndex < mainItems.length) ||
              extraIndex >= extraItems.length
            ) {
              mixedItems.push(mainItems[mainIndex++]);
            } else if (extraIndex < extraItems.length) {
              mixedItems.push(extraItems[extraIndex++]);
            }
          }

          // --- Ghi vào out[] ---
          mixedItems.forEach((item, idx) => {
            out.push({
              value: item.value,
              icon: this.pickIcon(),
              unit: item.unit,
              result: item.result,
              stt: this.sttFromValue(item.value),
              pageIndex,
              idxInPage: idx + 1,
              groupIndex: null,
              idxInGroup: null,
              content,
              right_content,
            });
          });

          // Kết thúc vòng for chính
          i = count;
          break;
        } else if (pageIndex == 24) {
          // === PAGE 23: Upper, Lower beads Mixed (+6) ===
          const totalQuestions = count; // thường là 15
          const mainQuestions = 10; // số câu có unit = +6
          const extraQuestions = totalQuestions - mainQuestions;
          right_content = "Upper, Lower beads Mixed (+7)";

          const mainItems = [];
          const extraItems = [];

          // --- 10 câu có unit = +6 ---
          for (let j = 0; j < mainQuestions; j++) {
            const value = this.randInt(1, 2); // chỉ 1, 2, 3
            const unit = 7;
            const result = value + unit;
            mainItems.push({ value, unit, result });
          }

          // --- 5 câu còn lại (theo bảng khách hàng) ---
          for (let j = 0; j < extraQuestions; j++) {
            let value, unit, result;

            do {
              value = this.randInt(2, 9);
              let allowedUnits = [];

              if ([2, 3, 4].includes(value)) {
                allowedUnits = [-1, -2, -3, -4, +5];
              } else if ([5, 6, 7, 8, 9].includes(value)) {
                allowedUnits = [-5];
              }

              unit = this.pick(allowedUnits);
              result = value + unit;
              // Đảm bảo không âm
            } while (result < 0);

            extraItems.push({ value, unit, result });
          }

          // --- Gộp xen kẽ giữa 2 nhóm ---
          const mixedItems = [];
          const maxLen = Math.max(mainItems.length, extraItems.length);
          let mainIndex = 0;
          let extraIndex = 0;

          for (let j = 0; j < totalQuestions; j++) {
            // xen kẽ: 2 câu main, 1 câu extra
            if (
              (j % 3 !== 2 && mainIndex < mainItems.length) ||
              extraIndex >= extraItems.length
            ) {
              mixedItems.push(mainItems[mainIndex++]);
            } else if (extraIndex < extraItems.length) {
              mixedItems.push(extraItems[extraIndex++]);
            }
          }

          // --- Ghi vào out[] ---
          mixedItems.forEach((item, idx) => {
            out.push({
              value: item.value,
              icon: this.pickIcon(),
              unit: item.unit,
              result: item.result,
              stt: this.sttFromValue(item.value),
              pageIndex,
              idxInPage: idx + 1,
              groupIndex: null,
              idxInGroup: null,
              content,
              right_content,
            });
          });

          // Kết thúc vòng for chính
          i = count;
          break;
        } else if (pageIndex == 25) {
          // === PAGE 23: Upper, Lower beads Mixed (+6) ===
          const totalQuestions = count; // thường là 15
          const mainQuestions = 10; // số câu có unit = +6
          const extraQuestions = totalQuestions - mainQuestions;
          right_content = "Upper, Lower beads Mixed (+8)";

          const mainItems = [];
          const extraItems = [];

          // --- 10 câu có unit = +6 ---
          for (let j = 0; j < mainQuestions; j++) {
            const value = 1; // chỉ 1, 2, 3
            const unit = 8;
            const result = value + unit;
            mainItems.push({ value, unit, result });
          }

          // --- 5 câu còn lại (theo bảng khách hàng) ---
          for (let j = 0; j < extraQuestions; j++) {
            let value, unit, result;

            do {
              value = this.randInt(2, 9);
              let allowedUnits = [];

              if ([2, 3, 4].includes(value)) {
                allowedUnits = [-1, -2, -3, -4, +5];
              } else if ([5, 6, 7, 8, 9].includes(value)) {
                allowedUnits = [-5];
              }

              unit = this.pick(allowedUnits);
              result = value + unit;
              // Đảm bảo không âm
            } while (result < 0);

            extraItems.push({ value, unit, result });
          }

          // --- Gộp xen kẽ giữa 2 nhóm ---
          const mixedItems = [];
          const maxLen = Math.max(mainItems.length, extraItems.length);
          let mainIndex = 0;
          let extraIndex = 0;

          for (let j = 0; j < totalQuestions; j++) {
            // xen kẽ: 2 câu main, 1 câu extra
            if (
              (j % 3 !== 2 && mainIndex < mainItems.length) ||
              extraIndex >= extraItems.length
            ) {
              mixedItems.push(mainItems[mainIndex++]);
            } else if (extraIndex < extraItems.length) {
              mixedItems.push(extraItems[extraIndex++]);
            }
          }

          // --- Ghi vào out[] ---
          mixedItems.forEach((item, idx) => {
            out.push({
              value: item.value,
              icon: this.pickIcon(),
              unit: item.unit,
              result: item.result,
              stt: this.sttFromValue(item.value),
              pageIndex,
              idxInPage: idx + 1,
              groupIndex: null,
              idxInGroup: null,
              content,
              right_content,
            });
          });

          // Kết thúc vòng for chính
          i = count;
          break;
        } else if (pageIndex == 26 || pageIndex == 27) {
          // === PAGE 23: Upper, Lower beads Mixed (+6) ===
          const totalQuestions = count; // thường là 15
          const mainQuestions = 10; // số câu có unit = +6
          const extraQuestions = totalQuestions - mainQuestions;
          right_content = "Upper, Lower beads Mixed (-6)";

          const mainItems = [];
          const extraItems = [];

          // --- 10 câu có unit = +6 ---
          for (let j = 0; j < mainQuestions; j++) {
            const value = this.randInt(6, 9); // chỉ 1, 2, 3
            const unit = -6;
            const result = value + unit;
            mainItems.push({ value, unit, result });
          }

          // --- 5 câu còn lại (theo bảng khách hàng) ---
          for (let j = 0; j < extraQuestions; j++) {
            let value, unit, result;

            do {
              value = this.randInt(2, 9);
              let allowedUnits = [];

              if ([2, 3, 4].includes(value)) {
                allowedUnits = [-1, -2, -3, -4, +5];
              } else if ([5, 6, 7, 8, 9].includes(value)) {
                allowedUnits = [-5];
              }

              unit = this.pick(allowedUnits);
              result = value + unit;
              // Đảm bảo không âm
            } while (result < 0);

            extraItems.push({ value, unit, result });
          }

          // --- Gộp xen kẽ giữa 2 nhóm ---
          const mixedItems = [];
          const maxLen = Math.max(mainItems.length, extraItems.length);
          let mainIndex = 0;
          let extraIndex = 0;

          for (let j = 0; j < totalQuestions; j++) {
            // xen kẽ: 2 câu main, 1 câu extra
            if (
              (j % 3 !== 2 && mainIndex < mainItems.length) ||
              extraIndex >= extraItems.length
            ) {
              mixedItems.push(mainItems[mainIndex++]);
            } else if (extraIndex < extraItems.length) {
              mixedItems.push(extraItems[extraIndex++]);
            }
          }

          // --- Ghi vào out[] ---
          mixedItems.forEach((item, idx) => {
            out.push({
              value: item.value,
              icon: this.pickIcon(),
              unit: item.unit,
              result: item.result,
              stt: this.sttFromValue(item.value),
              pageIndex,
              idxInPage: idx + 1,
              groupIndex: null,
              idxInGroup: null,
              content,
              right_content,
            });
          });

          // Kết thúc vòng for chính
          i = count;
          break;
        } else if (pageIndex == 28 || pageIndex == 29) {
          // === PAGE 23: Upper, Lower beads Mixed (+6) ===
          const totalQuestions = count; // thường là 15
          const mainQuestions = 10; // số câu có unit = +6
          const extraQuestions = totalQuestions - mainQuestions;
          right_content = "Upper, Lower beads Mixed (-7)";

          const mainItems = [];
          const extraItems = [];

          // --- 10 câu có unit = +6 ---
          for (let j = 0; j < mainQuestions; j++) {
            const value = this.randInt(7, 9); // chỉ 1, 2, 3
            const unit = -7;
            const result = value + unit;
            mainItems.push({ value, unit, result });
          }

          // --- 5 câu còn lại (theo bảng khách hàng) ---
          for (let j = 0; j < extraQuestions; j++) {
            let value, unit, result;

            do {
              value = this.randInt(2, 9);
              let allowedUnits = [];

              if ([2, 3, 4].includes(value)) {
                allowedUnits = [-1, -2, -3, -4, +5];
              } else if ([5, 6, 7, 8, 9].includes(value)) {
                allowedUnits = [-5];
              }

              unit = this.pick(allowedUnits);
              result = value + unit;
              // Đảm bảo không âm
            } while (result < 0);

            extraItems.push({ value, unit, result });
          }

          // --- Gộp xen kẽ giữa 2 nhóm ---
          const mixedItems = [];
          const maxLen = Math.max(mainItems.length, extraItems.length);
          let mainIndex = 0;
          let extraIndex = 0;

          for (let j = 0; j < totalQuestions; j++) {
            // xen kẽ: 2 câu main, 1 câu extra
            if (
              (j % 3 !== 2 && mainIndex < mainItems.length) ||
              extraIndex >= extraItems.length
            ) {
              mixedItems.push(mainItems[mainIndex++]);
            } else if (extraIndex < extraItems.length) {
              mixedItems.push(extraItems[extraIndex++]);
            }
          }

          // --- Ghi vào out[] ---
          mixedItems.forEach((item, idx) => {
            out.push({
              value: item.value,
              icon: this.pickIcon(),
              unit: item.unit,
              result: item.result,
              stt: this.sttFromValue(item.value),
              pageIndex,
              idxInPage: idx + 1,
              groupIndex: null,
              idxInGroup: null,
              content,
              right_content,
            });
          });

          // Kết thúc vòng for chính
          i = count;
          break;
        } else if (pageIndex == 30 || pageIndex == 31) {
          // === PAGE 23: Upper, Lower beads Mixed (+6) ===
          const totalQuestions = count; // thường là 15
          const mainQuestions = 10; // số câu có unit = +6
          const extraQuestions = totalQuestions - mainQuestions;
          right_content = "Upper, Lower beads Mixed (-8)";

          const mainItems = [];
          const extraItems = [];

          // --- 10 câu có unit = +6 ---
          for (let j = 0; j < mainQuestions; j++) {
            const value = this.randInt(8, 9); // chỉ 1, 2, 3
            const unit = -8;
            const result = value + unit;
            mainItems.push({ value, unit, result });
          }

          // --- 5 câu còn lại (theo bảng khách hàng) ---
          for (let j = 0; j < extraQuestions; j++) {
            let value, unit, result;

            do {
              value = this.randInt(2, 9);
              let allowedUnits = [];

              if ([2, 3, 4].includes(value)) {
                allowedUnits = [-1, -2, -3, -4, +5];
              } else if ([5, 6, 7, 8, 9].includes(value)) {
                allowedUnits = [-5];
              }

              unit = this.pick(allowedUnits);
              result = value + unit;
              // Đảm bảo không âm
            } while (result < 0);

            extraItems.push({ value, unit, result });
          }

          // --- Gộp xen kẽ giữa 2 nhóm ---
          const mixedItems = [];
          const maxLen = Math.max(mainItems.length, extraItems.length);
          let mainIndex = 0;
          let extraIndex = 0;

          for (let j = 0; j < totalQuestions; j++) {
            // xen kẽ: 2 câu main, 1 câu extra
            if (
              (j % 3 !== 2 && mainIndex < mainItems.length) ||
              extraIndex >= extraItems.length
            ) {
              mixedItems.push(mainItems[mainIndex++]);
            } else if (extraIndex < extraItems.length) {
              mixedItems.push(extraItems[extraIndex++]);
            }
          }

          // --- Ghi vào out[] ---
          mixedItems.forEach((item, idx) => {
            out.push({
              value: item.value,
              icon: this.pickIcon(),
              unit: item.unit,
              result: item.result,
              stt: this.sttFromValue(item.value),
              pageIndex,
              idxInPage: idx + 1,
              groupIndex: null,
              idxInGroup: null,
              content,
              right_content,
            });
          });

          // Kết thúc vòng for chính
          i = count;
          break;
        } else if (pageIndex == 32 || pageIndex == 33) {
          // === PAGE 23: Upper, Lower beads Mixed (+6) ===
          const totalQuestions = count; // thường là 15
          const mainQuestions = 8; // số câu có unit = +6
          const extraQuestions = totalQuestions - mainQuestions;
          right_content = "Upper, Lower beads Mixed (-9)";

          const mainItems = [];
          const extraItems = [];

          // --- 10 câu có unit = +6 ---
          for (let j = 0; j < mainQuestions; j++) {
            const value = 9; // chỉ 1, 2, 3
            const unit = -9;
            const result = value + unit;
            mainItems.push({ value, unit, result });
          }

          // --- 5 câu còn lại (theo bảng khách hàng) ---
          for (let j = 0; j < extraQuestions; j++) {
            let value, unit, result;

            do {
              value = this.randInt(2, 9);
              let allowedUnits = [];

              if ([2, 3, 4].includes(value)) {
                allowedUnits = [-1, -2, -3, -4, +5];
              } else if ([5, 6, 7, 8, 9].includes(value)) {
                allowedUnits = [-5];
              }

              unit = this.pick(allowedUnits);
              result = value + unit;
              // Đảm bảo không âm
            } while (result < 0);

            extraItems.push({ value, unit, result });
          }

          // --- Gộp xen kẽ giữa 2 nhóm ---
          const mixedItems = [];
          const maxLen = Math.max(mainItems.length, extraItems.length);
          let mainIndex = 0;
          let extraIndex = 0;

          for (let j = 0; j < totalQuestions; j++) {
            // xen kẽ: 2 câu main, 1 câu extra
            if (
              (j % 3 !== 2 && mainIndex < mainItems.length) ||
              extraIndex >= extraItems.length
            ) {
              mixedItems.push(mainItems[mainIndex++]);
            } else if (extraIndex < extraItems.length) {
              mixedItems.push(extraItems[extraIndex++]);
            }
          }

          // --- Ghi vào out[] ---
          mixedItems.forEach((item, idx) => {
            out.push({
              value: item.value,
              icon: this.pickIcon(),
              unit: item.unit,
              result: item.result,
              stt: this.sttFromValue(item.value),
              pageIndex,
              idxInPage: idx + 1,
              groupIndex: null,
              idxInGroup: null,
              content,
              right_content,
            });
          });

          // Kết thúc vòng for chính
          i = count;
          break;
        } else if (pageIndex > 33 && pageIndex <= 67) {
          do {
            // 1. Random Value (số hàng đơn vị đầu tiên từ 1 đến 9)
            value = this.randInt(1, 9);

            // Lấy danh sách các unit hợp lệ từ bảng
            const allowedUnits = unitMap[value];
            if (!allowedUnits || allowedUnits.length === 0) {
              // Xử lý nếu không có unit nào được định nghĩa cho value này (chỉ để phòng trường hợp bảng thiếu)
              attempts = maxAttempts + 1; // Thoát vòng lặp
              break;
            }

            // 2. Random Unit từ danh sách hợp lệ
            unit = this.pick(allowedUnits); // Giả sử this.pick() chọn ngẫu nhiên 1 phần tử

            result = value + unit;
            const pairKey = `${value},${unit}`;

            attempts++;

            // Điều kiện thoát vòng lặp:
            // A. result phải > 0 (Duy trì điều kiện ban đầu: result > 0)
            // B. Cặp (value, unit) chưa từng được chọn
            // C. Hoặc đã cố gắng quá nhiều lần
            if ((result > 0 && !selectedPairs.has(pairKey)) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          // Thêm cặp (value, unit) đã chọn vào Set
          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }

          // Xử lý cảnh báo nếu không tìm được cặp mới
          if (attempts > maxAttempts) {
            console.warn(
              `Could not find a unique (value, unit) pair for page ${pageIndex} after ${maxAttempts} attempts.`
            );
          }

          if (pageIndex == 34) {
            right_content = "Upper, Lower beads Mixed";
          } else {
            right_content = "";
          }
        }

        // Đảm bảo không sử dụng cặp (value, unit) nếu đã vượt quá số lần thử tối đa và không tìm được cặp mới.
        if (attempts > maxAttempts && pageIndex <= 12) {
          console.warn(
            `Could not find a unique (value, unit) pair for page ${pageIndex} after ${maxAttempts} attempts.`
          );
        }

        out.push({
          value,
          icon: this.pickIcon(), // Giả sử hàm pickIcon() tồn tại
          unit,
          result,
          stt: this.sttFromValue(value), // Giả sử hàm sttFromValue() tồn tại
          pageIndex,
          idxInPage: i + 1,
          groupIndex: null,
          idxInGroup: null,
          content,
          right_content,
        });
      }

      return out;
    },

    isThousandOrUnit(value, idx) {
      const len = String(value).length;
      const unitIdx = len - 1; // đơn vị
      const thousandIdx = len - 4; // hàng nghìn (nếu có)
      return idx === unitIdx || (len >= 4 && idx === thousandIdx);
    },
    digitsOf(n) {
      return String(n).split("").map(Number);
    },

    generateAll() {
      const allPages = [];

      for (let p = 2; p <= 67; p++) {
        const items = this.makeNumberObjectsForPage1to67(p, 15);
        const paged = this.paginateWithGroups(items, 15, 5, p);
        allPages.push(...paged);
      }

      this.pages = allPages;
      this.saveJsonForBrowserDownload(this.pages, "AB_SA.json");
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
    paginateWithGroups(items, perPage = 12, groupSize = 4, pageIndexOffset = 1) {
      const pagesRaw = this.chunkArray(items, perPage);
      return pagesRaw.map((pageArr, pIdx) => {
        const realPageIndex = pageIndexOffset + pIdx; // ✅ Fix đúng chỉ số trang

        const pageTagged = pageArr.map((q, i) => ({
          ...q,
          pageIndex: realPageIndex,
          idxInPage: i + 1,
        }));

        const groups = this.chunkArray(pageTagged, groupSize);
        let flattened = [];
        groups.forEach((grp, gIdx) => {
          grp.forEach((q, j) => {
            flattened.push({
              ...q,
              groupIndex: gIdx + 1,
              idxInGroup: j + 1,
            });
          });
        });

        return {
          pageIndex: realPageIndex, // ✅ dùng index đúng ở đây
          items: flattened,
          groups: groups.map((grp, gIdx) =>
            grp.map((q, j) => ({
              ...q,
              groupIndex: gIdx + 1,
              idxInGroup: j + 1,
            }))
          ),
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
.table .tbody .td > span {
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
.table .tbody .td div.footer-math {
  flex: unset;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: calc(100% - 60px);
  display: flex;
}
.table .tbody .td div.footer-math.right {
  margin-right: 15px;
}
.table .tbody .td div.footer-math > span {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #000;
  flex-direction: row;
  font-weight: 600;
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

.header-page {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 60px;
}
.title-sgk {
  font-weight: 700;
}
.title-sgk strong {
  font-weight: 300;
  font-size: 14px;
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
  width: calc(100% - 30px);
}
.list-one-column .pv-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  width: calc(100% - 60px);
}
.pv-header-bar .item-icon {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #000;
  height: 20px;
}
.pv-body-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  width: calc(100% - 30px);
}
.list-one-column .pv-body-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  width: calc(100% - 60px);
}
.pv-body-bar .item-icon {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #000;
  flex-direction: column;
  gap: 10px;
}
.pv-body-bar .item-icon i,
.pv-header-bar .item-icon {
  opacity: 0.8;
}
.list-one-column .pv-topbar {
  height: 1px;
  background: #000;
  position: relative;
  width: calc(100% - 40px);
}
.pv-topbar {
  height: 1px;
  background: #000;
  position: relative;
  width: calc(100% - 15px);
}
.pv-topbar .dotted-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: absolute;
  left: 10px;
  top: 0;
  width: calc(100% - 20px);
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
  width: calc(100% - 60px);
}
.sheet-grid-2 .pv-header-bar,
.sheet-grid-2 .pv-body-bar {
  width: calc(100% - 100px);
  gap: 5px;
}
.sheet-grid-2 .pv-topbar .dotted-list {
  width: calc(100% - 35px);
  left: 15px;
  gap: 5px;
}
.pv-header-bar .item-icon {
  font-size: 20px;
}
.col-3-icon .sheet-grid-2 .pv-header-bar,
.col-3-icon .sheet-grid-2 .pv-body-bar {
  width: calc(100% - 70px);
}
.col-3-icon .sheet-grid-2 .pv-topbar .dotted-list {
  width: calc(100% - 20px);
  left: 15px;
  gap: 5px;
}
.col-5-icon .sheet-grid-1 .pv-header-bar,
.col-5-icon .sheet-grid-1 .pv-body-bar {
  width: calc(100% - 100px);
}

.col-5-icon .sheet-grid-1 .pv-topbar {
  width: calc(100% - 80px);
}
.col-5-icon .sheet-grid-1 .pv-topbar .dotted-list {
  width: calc(100% - 27px);
  left: 15px;
  gap: 5px;
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
  font-weight: 100;
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
.page-sgk img {
  width: 140px;
}
.footer-bar {
  display: flex;
  justify-content: space-between;
  align-items: center; /* luôn căn giữa theo chiều dọc */
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
.header-page.align-end {
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
  font-size: 24px;
  line-height: 24px;
}
.table .tbody .td span.num,
.table .tbody .td span.val,
.table .tbody .td span.sign {
  justify-content: flex-end !important;
}

.answer-cell strong {
  display: block;
  text-align: right;
  padding-right: 8px;
}

.neg-sign {
  font-size: 26px;
  margin-right: 2px;
  font-weight: 300;
  line-height: 26px;
}
.finger-technique {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  width: 100%;
}

.finger-technique .finger-title {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 30px;
}

.finger-technique .finger-table {
  border-collapse: collapse;
  width: 80%;
  font-size: 15px;
  margin: 0 auto;
}

.finger-technique .finger-table th,
.finger-technique .finger-table td {
  border: 1px solid #000;
  padding: 8px 10px;
  text-align: center;
}
.finger-technique .finger-table td:nth-child(1) {
  font-weight: 500;
  font-size: 14px;
}
.finger-technique .finger-table td:nth-child(2) {
  font-weight: 600;
  font-size: 20px;
}
.finger-technique .finger-table td:nth-child(3) {
  font-weight: 400;
  font-size: 18px;
}

.finger-technique .finger-table th {
  background: #f7f7f7;
  font-weight: bold;
  font-size: 18px;
}

.finger-technique .finger-table tr:nth-child(even) td {
  background: #fafafa;
}
</style>
