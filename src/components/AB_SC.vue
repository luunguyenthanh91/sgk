<template>
  <div ref="exportRoot">
    <section class="page" v-for="(page, pIdx) in pages_1" :key="'p-' + pIdx">
      <!-- header giữ nguyên -->
      <div class="header-page">
        <span class="title-sgk"></span>
        <span class="title-sgk"></span>
        <span class="page-sgk"></span>
      </div>

      <!-- MAIN: nếu là trang 1 thì hiển thị Finger Technique (theo ảnh),
       các trang còn lại giữ sheet-grid-0 (trắng như hiện tại) -->
      <main class="sheet-grid sheet-grid-0">
        <div v-if="page.pageIndex === 1" class="finger-content">
          <h1 class="finger-title">FINGER TECHNIQUE</h1>

          <div class="finger-table-wrap">
            <table class="finger-table" role="table" aria-label="Finger technique table">
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
                  <td>+ 1</td>
                  <td>Thumb</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>+ 2</td>
                  <td>Thumb</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>+ 3</td>
                  <td>Thumb</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>+ 4</td>
                  <td>Thumb</td>
                </tr>

                <tr>
                  <td>5</td>
                  <td>+ 5</td>
                  <td>Index</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>+ 6</td>
                  <td>Index, Thumb pinch</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>+ 7</td>
                  <td>Index, Thumb pinch</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>+ 8</td>
                  <td>Index, Thumb pinch</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>+ 9</td>
                  <td>Index, Thumb pinch</td>
                </tr>

                <tr>
                  <td>10</td>
                  <td>- 1</td>
                  <td>Index</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>- 2</td>
                  <td>Index</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>- 3</td>
                  <td>Index</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>- 4</td>
                  <td>Index</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>- 5</td>
                  <td>Index</td>
                </tr>

                <tr>
                  <td>15</td>
                  <td>- 6</td>
                  <td>Index, Thumb split</td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>- 7</td>
                  <td>Index, Thumb split</td>
                </tr>
                <tr>
                  <td>17</td>
                  <td>- 8</td>
                  <td>Index, Thumb split</td>
                </tr>
                <tr>
                  <td>18</td>
                  <td>- 9</td>
                  <td>Index, Thumb split</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else-if="page.pageIndex === 2" class="friends-content">
          <h1 class="friends-title">FRIENDS OF 10</h1>

          <!-- box chứa cặp số + mũi tên -->
          <div class="friends-box-outer">
            <div class="friends-box">
              <div class="friends-list">
                <div
                  class="friends-row"
                  v-for="pair in [
                    { l: 1, r: 9 },
                    { l: 2, r: 8 },
                    { l: 3, r: 7 },
                    { l: 4, r: 6 },
                    { l: 5, r: 5 },
                    { l: 6, r: 4 },
                    { l: 7, r: 3 },
                    { l: 8, r: 2 },
                    { l: 9, r: 1 },
                  ]"
                  :key="pair.l + '-' + pair.r"
                >
                  <div class="f-left">{{ pair.l }}</div>

                  <!-- arrow as SVG to control line length + arrowheads -->
                  <div class="f-arrow" aria-hidden="true">
                    <svg
                      width="110"
                      height="12"
                      viewBox="0 0 160 12"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <marker
                          id="arrowHeadLeft"
                          markerWidth="6"
                          markerHeight="6"
                          refX="5"
                          refY="3"
                          orient="auto"
                        >
                          <path d="M5 0 L0 3 L5 6" fill="#111"></path>
                        </marker>
                        <marker
                          id="arrowHeadRight"
                          markerWidth="6"
                          markerHeight="6"
                          refX="1"
                          refY="3"
                          orient="auto"
                        >
                          <path d="M0 0 L6 3 L0 6" fill="#111"></path>
                        </marker>
                      </defs>
                      <line
                        x1="6"
                        y1="6"
                        x2="154"
                        y2="6"
                        stroke="#111"
                        stroke-width="1.2"
                        marker-start="url(#arrowHeadLeft)"
                        marker-end="url(#arrowHeadRight)"
                      />
                    </svg>
                  </div>

                  <div class="f-right">{{ pair.r }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- subtitle -->
          <h2 class="friends-subtitle">FRIENDS FORMULAS<br />ADDITION</h2>

          <!-- formulas box -->
          <div class="formulas-box-outer">
            <div class="formulas-box">
              <div
                class="formula-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '1' },
                  { a: '+8', b: '+10', c: '2' },
                  { a: '+7', b: '+10', c: '3' },
                  { a: '+6', b: '+10', c: '4' },
                  { a: '+5', b: '+10', c: '5' },
                  { a: '+4', b: '+10', c: '6' },
                  { a: '+3', b: '+10', c: '7' },
                  { a: '+2', b: '+10', c: '8' },
                  { a: '+1', b: '+10', c: '9' },
                ]"
                :key="row.a + row.c"
              >
                <!-- 3 cột: left | middle | right -->
                <div class="f-form-mid">
                  <span>{{ row.a }}</span>
                  <span>=</span>
                  <span>{{ row.b }}</span>
                  <span style="margin-bottom: 2px; width: 7px">-</span>
                  <span>{{ row.c }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- TRANG 3 -->
        <div v-else-if="page.pageIndex === 3" class="page3-content">
          <!-- TOP: 2 hộp side-by-side -->
          <h2 class="page3-subtitle">FRIENDS OF 10</h2>
          <div class="top-dual">
            <!-- LEFT box: numbers | arrow | checkbox -->
            <div class="box left-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
                  :key="'l-' + n"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT box: checkbox | arrow | number (mirror order) -->
            <div class="box right-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="(n, idx) in [9, 8, 7, 4, 5, 4, 3, 8, 9]"
                  :key="'r-' + idx"
                >
                  <div
                    class="col-num"
                    v-if="idx == 0 || idx == 1 || idx == 2 || idx == 5 || idx == 6"
                  >
                    {{ n }}
                  </div>
                  <div
                    class="col-box"
                    v-if="idx == 3 || idx == 4 || idx == 7 || idx == 8"
                  >
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                  <div class="col-arrow">
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div
                    class="col-num"
                    v-if="idx == 3 || idx == 4 || idx == 7 || idx == 8"
                  >
                    {{ n }}
                  </div>
                  <div
                    class="col-box"
                    v-if="idx == 0 || idx == 1 || idx == 2 || idx == 5 || idx == 6"
                  >
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MIDDLE: tiêu đề formulas -->
          <h2 class="page3-subtitle">FRIENDS FORMULAS<br />ADDITION</h2>

          <!-- BOTTOM: bảng công thức 2 cột, mỗi cột có ô điền -->
          <div class="formulas-2col">
            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '1' },
                  { a: '+8', b: '+10', c: '2' },
                  { a: '+7', b: '+10', c: '3' },
                  { a: '+6', b: '+10', c: '4' },
                  { a: '+5', b: '+10', c: '5' },
                  { a: '+4', b: '+10', c: '6' },
                  { a: '+3', b: '+10', c: '7' },
                  { a: '+2', b: '+10', c: '8' },
                  { a: '+1', b: '+10', c: '9' },
                ]"
                :key="'c1-' + row.c"
              >
                <span>{{ row.a }}</span>
                <span>=</span>
                <span>{{ row.b }}</span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>{{ row.c }}</span>
              </div>
            </div>

            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '' },
                  { a: '+8', b: '+10', c: '' },
                  { a: '+7', b: '+10', c: '' },
                  { a: '+6', b: '+10', c: '' },
                  { a: '+5', b: '+10', c: '' },
                  { a: '+4', b: '+10', c: '' },
                  { a: '+3', b: '+10', c: '' },
                  { a: '+2', b: '+10', c: '' },
                  { a: '+1', b: '+10', c: '' },
                ]"
                :key="'c2-' + row.a + row.c"
              >
                <span>{{ row.a }}</span>
                <span>=</span>
                <span>{{ row.b }}</span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span
                  ><div class="f-right-box">
                    <span class="fill-box-small" aria-hidden="true"></span></div
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="page.pageIndex === 4" class="page3-content">
          <!-- TOP: 2 hộp side-by-side -->
          <h2 class="page3-subtitle">FRIENDS OF 10</h2>
          <div class="top-dual">
            <!-- LEFT box: numbers | arrow | checkbox -->
            <div class="box left-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
                  :key="'l-' + n"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT box: checkbox | arrow | number (mirror order) -->
            <div class="box right-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="(n, idx) in [4, 7, 3, 8, 1, 5, 2, 9, 6]"
                  :key="'r-' + idx"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MIDDLE: tiêu đề formulas -->
          <h2 class="page3-subtitle">FRIENDS FORMULAS<br />ADDITION</h2>

          <!-- BOTTOM: bảng công thức 2 cột, mỗi cột có ô điền -->
          <div class="formulas-2col">
            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '1' },
                  { a: '+8', b: '+10', c: '2' },
                  { a: '+7', b: '+10', c: '3' },
                  { a: '+6', b: '+10', c: '4' },
                  { a: '+5', b: '+10', c: '5' },
                  { a: '+4', b: '+10', c: '6' },
                  { a: '+3', b: '+10', c: '7' },
                  { a: '+2', b: '+10', c: '8' },
                  { a: '+1', b: '+10', c: '9' },
                ]"
                :key="'c1-' + row.c"
              >
                <span>{{ row.a }}</span>
                <span>=</span>
                <span>{{ row.b }}</span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  <div class="f-right-box">
                    <span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
              </div>
            </div>

            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '1' },
                  { a: '+8', b: '+10', c: '2' },
                  { a: '+7', b: '+10', c: '3' },
                  { a: '+6', b: '+10', c: '4' },
                  { a: '+5', b: '+10', c: '5' },
                  { a: '+4', b: '+10', c: '6' },
                  { a: '+3', b: '+10', c: '7' },
                  { a: '+2', b: '+10', c: '8' },
                  { a: '+1', b: '+10', c: '9' },
                ]"
                :key="'c2-' + row.a + row.c"
              >
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span>=</span>
                <span>{{ row.b }}</span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  {{ row.c }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="page.pageIndex === 5" class="page3-content">
          <!-- TOP: 2 hộp side-by-side -->
          <h2 class="page3-subtitle">FRIENDS OF 10</h2>
          <div class="top-dual">
            <!-- LEFT box: numbers | arrow | checkbox -->
            <div class="box left-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="n in [4, 2, 5, 7, 8, 6, 9, 1, 3]"
                  :key="'l-' + n"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT box: checkbox | arrow | number (mirror order) -->
            <div class="box right-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="(n, idx) in [2, 7, 3, 4, 1, 5, 9, 6, 8]"
                  :key="'r-' + idx"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MIDDLE: tiêu đề formulas -->
          <h2 class="page3-subtitle">FRIENDS FORMULAS<br />ADDITION</h2>

          <!-- BOTTOM: bảng công thức 2 cột, mỗi cột có ô điền -->
          <div class="formulas-2col">
            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '1' },
                  { a: '+7', b: '+10', c: '2' },
                  { a: '+5', b: '+10', c: '3' },
                  { a: '+3', b: '+10', c: '4' },
                  { a: '+1', b: '+10', c: '5' },
                  { a: '+6', b: '+10', c: '6' },
                  { a: '+4', b: '+10', c: '7' },
                  { a: '+8', b: '+10', c: '8' },
                  { a: '+2', b: '+10', c: '9' },
                ]"
                :key="'c1-' + row.c"
              >
                <span>{{ row.a }}</span>
                <span>=</span>
                <span>{{ row.b }}</span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  <div class="f-right-box">
                    <span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
              </div>
            </div>

            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '5' },
                  { a: '+8', b: '+10', c: '8' },
                  { a: '+7', b: '+10', c: '1' },
                  { a: '+6', b: '+10', c: '3' },
                  { a: '+5', b: '+10', c: '4' },
                  { a: '+4', b: '+10', c: '2' },
                  { a: '+3', b: '+10', c: '6' },
                  { a: '+2', b: '+10', c: '9' },
                  { a: '+1', b: '+10', c: '7' },
                ]"
                :key="'c2-' + row.a + row.c"
              >
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span>=</span>
                <span>{{ row.b }}</span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  {{ row.c }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="page.pageIndex === 6" class="page3-content">
          <!-- TOP: 2 hộp side-by-side -->
          <h2 class="page3-subtitle">FRIENDS OF 10</h2>
          <div class="top-dual">
            <!-- LEFT box: numbers | arrow | checkbox -->
            <div class="box left-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="n in [1, 5, 7, 6, 8, 4, 9, 2, 3]"
                  :key="'l-' + n"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT box: checkbox | arrow | number (mirror order) -->
            <div class="box right-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="(n, idx) in [8, 7, 2, 3, 1, 5, 6, 4, 9]"
                  :key="'r-' + idx"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MIDDLE: tiêu đề formulas -->
          <h2 class="page3-subtitle">FRIENDS FORMULAS<br />ADDITION</h2>

          <!-- BOTTOM: bảng công thức 2 cột, mỗi cột có ô điền -->
          <div class="formulas-2col">
            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+2', b: '+10', c: '1' },
                  { a: '+6', b: '+10', c: '2' },
                  { a: '+8', b: '+10', c: '3' },
                  { a: '+3', b: '+10', c: '4' },
                  { a: '+5', b: '+10', c: '5' },
                  { a: '+7', b: '+10', c: '6' },
                  { a: '+1', b: '+10', c: '7' },
                  { a: '+9', b: '+10', c: '8' },
                  { a: '+4', b: '+10', c: '9' },
                ]"
                :key="'c1-' + row.c"
              >
                <span>{{ row.a }}</span>
                <span>=</span>
                <span>{{ row.b }}</span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  <div class="f-right-box">
                    <span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
              </div>
            </div>

            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '3' },
                  { a: '+8', b: '+10', c: '7' },
                  { a: '+7', b: '+10', c: '1' },
                  { a: '+6', b: '+10', c: '2' },
                  { a: '+5', b: '+10', c: '4' },
                  { a: '+4', b: '+10', c: '8' },
                  { a: '+3', b: '+10', c: '6' },
                  { a: '+2', b: '+10', c: '5' },
                  { a: '+1', b: '+10', c: '9' },
                ]"
                :key="'c2-' + row.a + row.c"
              >
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span>=</span>
                <span>{{ row.b }}</span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  {{ row.c }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="page.pageIndex === 7" class="page3-content">
          <!-- TOP: 2 hộp side-by-side -->
          <h2 class="page3-subtitle">FRIENDS OF 10</h2>
          <div class="top-dual">
            <!-- LEFT box: numbers | arrow | checkbox -->
            <div class="box left-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="n in [4, 2, 5, 7, 8, 6, 9, 1, 3]"
                  :key="'l-' + n"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT box: checkbox | arrow | number (mirror order) -->
            <div class="box right-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="(n, idx) in [2, 7, 3, 4, 1, 5, 9, 6, 8]"
                  :key="'r-' + idx"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MIDDLE: tiêu đề formulas -->
          <h2 class="page3-subtitle">FRIENDS FORMULAS<br />ADDITION</h2>

          <!-- BOTTOM: bảng công thức 2 cột, mỗi cột có ô điền -->
          <div class="formulas-2col">
            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+7', b: '+10', c: '1' },
                  { a: '+5', b: '+10', c: '2' },
                  { a: '+2', b: '+10', c: '3' },
                  { a: '+1', b: '+10', c: '4' },
                  { a: '+4', b: '+10', c: '5' },
                  { a: '+6', b: '+10', c: '6' },
                  { a: '+9', b: '+10', c: '7' },
                  { a: '+8', b: '+10', c: '8' },
                  { a: '+2', b: '+10', c: '9' },
                ]"
                :key="'c1-' + row.c"
              >
                <span>{{ row.a }}</span>
                <span>=</span>
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  <div class="f-right-box">
                    <span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
              </div>
            </div>

            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '2' },
                  { a: '+8', b: '+10', c: '8' },
                  { a: '+7', b: '+10', c: '1' },
                  { a: '+6', b: '+10', c: '3' },
                  { a: '+5', b: '+10', c: '5' },
                  { a: '+4', b: '+10', c: '4' },
                  { a: '+3', b: '+10', c: '6' },
                  { a: '+2', b: '+10', c: '7' },
                  { a: '+1', b: '+10', c: '9' },
                ]"
                :key="'c2-' + row.a + row.c"
              >
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span>=</span>
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  {{ row.c }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="page.pageIndex === 8" class="page3-content">
          <!-- TOP: 2 hộp side-by-side -->
          <h2 class="page3-subtitle">FRIENDS OF 10</h2>
          <div class="top-dual">
            <!-- LEFT box: numbers | arrow | checkbox -->
            <div class="box left-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="n in [5, 1, 3, 7, 4, 6, 9, 8, 2]"
                  :key="'l-' + n"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT box: checkbox | arrow | number (mirror order) -->
            <div class="box right-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="(n, idx) in [7, 9, 3, 2, 1, 4, 5, 6, 8]"
                  :key="'r-' + idx"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MIDDLE: tiêu đề formulas -->
          <h2 class="page3-subtitle">FRIENDS FORMULAS<br />ADDITION</h2>

          <!-- BOTTOM: bảng công thức 2 cột, mỗi cột có ô điền -->
          <div class="formulas-2col">
            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+2', b: '+10', c: '1' },
                  { a: '+5', b: '+10', c: '2' },
                  { a: '+7', b: '+10', c: '3' },
                  { a: '+1', b: '+10', c: '4' },
                  { a: '+4', b: '+10', c: '5' },
                  { a: '+8', b: '+10', c: '6' },
                  { a: '+9', b: '+10', c: '7' },
                  { a: '+3', b: '+10', c: '8' },
                  { a: '+6', b: '+10', c: '9' },
                ]"
                :key="'c1-' + row.c"
              >
                <span>{{ row.a }}</span>
                <span>=</span>
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  <div class="f-right-box">
                    <span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
              </div>
            </div>

            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '4' },
                  { a: '+8', b: '+10', c: '5' },
                  { a: '+7', b: '+10', c: '1' },
                  { a: '+6', b: '+10', c: '2' },
                  { a: '+5', b: '+10', c: '6' },
                  { a: '+4', b: '+10', c: '3' },
                  { a: '+3', b: '+10', c: '8' },
                  { a: '+2', b: '+10', c: '7' },
                  { a: '+1', b: '+10', c: '9' },
                ]"
                :key="'c2-' + row.a + row.c"
              >
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span>=</span>
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  {{ row.c }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="page.pageIndex === 9" class="page3-content">
          <!-- TOP: 2 hộp side-by-side -->
          <h2 class="page3-subtitle">FRIENDS OF 10</h2>
          <div class="top-dual">
            <!-- LEFT box: numbers | arrow | checkbox -->
            <div class="box left-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="n in [4, 2, 5, 7, 8, 6, 9, 1, 3]"
                  :key="'l-' + n"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT box: checkbox | arrow | number (mirror order) -->
            <div class="box right-box">
              <div class="box-list">
                <div
                  class="box-row"
                  v-for="(n, idx) in [2, 7, 3, 4, 1, 5, 9, 8, 6]"
                  :key="'r-' + idx"
                >
                  <div class="col-num">{{ n }}</div>
                  <div class="col-arrow">
                    <!-- SVG arrow -->
                    <svg
                      width="30"
                      height="16"
                      viewBox="0 0 60 16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <!-- LEFT arrowhead -->
                        <marker
                          id="bhL"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="10"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M10 0 L0 6 L10 12 Z" fill="#111"></path>
                        </marker>

                        <!-- RIGHT arrowhead -->
                        <marker
                          id="bhR"
                          markerUnits="userSpaceOnUse"
                          markerWidth="12"
                          markerHeight="12"
                          refX="2"
                          refY="6"
                          orient="auto"
                        >
                          <path d="M0 0 L12 6 L0 12 Z" fill="#111"></path>
                        </marker>
                      </defs>

                      <!-- line short (30px total when scaled), thick & bold -->
                      <line
                        x1="12"
                        y1="6"
                        x2="48"
                        y2="6"
                        stroke="#111"
                        stroke-width="3"
                        stroke-linecap="round"
                        marker-start="url(#bhL)"
                        marker-end="url(#bhR)"
                      />
                    </svg>
                  </div>
                  <div class="col-box">
                    <span class="fill-box" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- MIDDLE: tiêu đề formulas -->
          <h2 class="page3-subtitle">FRIENDS FORMULAS<br />ADDITION</h2>

          <!-- BOTTOM: bảng công thức 2 cột, mỗi cột có ô điền -->
          <div class="formulas-2col">
            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+4', b: '+10', c: '1' },
                  { a: '+5', b: '+10', c: '2' },
                  { a: '+2', b: '+10', c: '3' },
                  { a: '+9', b: '+10', c: '4' },
                  { a: '+7', b: '+10', c: '5' },
                  { a: '+6', b: '+10', c: '6' },
                  { a: '+1', b: '+10', c: '7' },
                  { a: '+8', b: '+10', c: '8' },
                  { a: '+2', b: '+10', c: '9' },
                ]"
                :key="'c1-' + row.c"
              >
                <span>{{ row.a }}</span>
                <span>=</span>
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  <div class="f-right-box">
                    <span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
              </div>
            </div>

            <div class="form-col">
              <div
                class="form-row"
                v-for="row in [
                  { a: '+9', b: '+10', c: '2' },
                  { a: '+8', b: '+10', c: '8' },
                  { a: '+7', b: '+10', c: '5' },
                  { a: '+6', b: '+10', c: '3' },
                  { a: '+5', b: '+10', c: '1' },
                  { a: '+4', b: '+10', c: '4' },
                  { a: '+3', b: '+10', c: '6' },
                  { a: '+2', b: '+10', c: '9' },
                  { a: '+1', b: '+10', c: '7' },
                ]"
                :key="'c2-' + row.a + row.c"
              >
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span>=</span>
                <span>
                  <div class="f-right-box">
                    +&nbsp;<span class="fill-box-small" aria-hidden="true"></span>
                  </div>
                </span>
                <span style="margin-bottom: 2px; width: 7px">-</span>
                <span>
                  {{ row.c }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-page-placeholder" aria-hidden="true"></div>
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
        <span class="title-sgk">Starter C</span>
        <span class="title-sgk"></span>
        <span class="title-sgk">{{ page.items[0].content }}</span>
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
              <div class="footer-math">
                <span v-if="item.value >= 10"></span>
                <span>{{ item.unit }}</span>
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
        <span class="title-sgk">Starter C</span>
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
        <table class="answers-table matrix" v-if="chunk.right[0]">
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
  name: "AB_SC",
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
        { pageIndex: 1 },
        { pageIndex: 2 },
        { pageIndex: 3 },
        { pageIndex: 4 },
        { pageIndex: 5 },
        { pageIndex: 6 },
        { pageIndex: 7 },
        { pageIndex: 8 },
        { pageIndex: 9 },
      ],
    };
  },
  async mounted() {
    const jsonPath = "/AB_SC.json";

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
    saveJsonForBrowserDownload(obj, filename = "AB_SC.json") {
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
      const out = [];

      // Danh sách các cặp (value, unit) đã được chọn để tránh lặp
      const selectedPairs = new Set();
      const maxAttempts = 100;
      let content = "";

      for (let i = 0; i < count; i++) {
        let value, unit, result;
        let attempts = 0;

        if (pageIndex <= 13) {
          /* eslint-disable */
          do {
            value = this.randInt(1, 9);
            unit = 9;

            result = value + unit;
            attempts++;
            if (value !== 5 || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else if (pageIndex <= 17) {
          /* eslint-disable */
          do {
            value = this.randInt(2, 9);
            unit = 8;

            result = value + unit;
            attempts++;
            if ((value !== 5 && value !== 6) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else if (pageIndex <= 21) {
          /* eslint-disable */
          do {
            value = this.randInt(3, 9);
            unit = 7;

            result = value + unit;
            attempts++;
            if ((value !== 5 && value !== 6 && value !== 7) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else if (pageIndex <= 22) {
          /* eslint-disable */
          do {
            value = this.randInt(1, 9);
            unit = 9;

            result = value + unit;
            attempts++;
            if (value !== 5 || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else if (pageIndex <= 23) {
          /* eslint-disable */
          do {
            value = this.randInt(2, 9);
            unit = 8;

            result = value + unit;
            attempts++;
            if ((value !== 5 && value !== 6) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else if (pageIndex <= 24) {
          /* eslint-disable */
          do {
            value = this.randInt(3, 9);
            unit = 7;

            result = value + unit;
            attempts++;
            if ((value !== 5 && value !== 6 && value !== 7) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else if (pageIndex <= 25) {
          /* eslint-disable */
          do {
            // 1. Random Value (chỉ lấy 4 hoặc 9)
            // Random một số nguyên ngẫu nhiên từ 0 hoặc 1.
            // Nếu là 0, chọn 4. Nếu là 1, chọn 9.
            value = this.randInt(0, 1) === 0 ? 4 : 9;

            // 2. Unit cố định là 6
            unit = 6;

            result = value + unit;

            const pairKey = `${value},${unit}`; // Thêm key để kiểm tra lặp
            attempts++;

            // Điều kiện thoát:
            // A. Cặp (value, unit) chưa từng được chọn
            // B. Hoặc đã cố gắng quá nhiều lần (tránh lặp vô hạn)
            if (!selectedPairs.has(pairKey) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else if (pageIndex <= 28 || pageIndex == 37 || pageIndex == 58) {
          /* eslint-disable */
          do {
            // 1. Random Value (chỉ lấy 4 hoặc 9)
            // Random một số nguyên ngẫu nhiên từ 0 hoặc 1.
            // Nếu là 0, chọn 4. Nếu là 1, chọn 9.
            const tenRan = this.randInt(1, 3) * 10;
            value = this.randInt(0, 1) === 0 ? 4 : 9;
            value += tenRan;
            // 2. Unit cố định là 6
            unit = 6;

            result = value + unit;

            const pairKey = `${value},${unit}`; // Thêm key để kiểm tra lặp
            attempts++;

            // Điều kiện thoát:
            // A. Cặp (value, unit) chưa từng được chọn
            // B. Hoặc đã cố gắng quá nhiều lần (tránh lặp vô hạn)
            if (!selectedPairs.has(pairKey) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else if (pageIndex <= 32 || pageIndex == 38 || pageIndex == 59) {
          /* eslint-disable */
          const tenRan = this.randInt(1, 3) * 10;
          value = this.randInt(5, 9);
          value += tenRan;
          unit = 5;

          result = value + unit;
        } else if (
          pageIndex <= 36 ||
          pageIndex == 39 ||
          pageIndex == 60 ||
          pageIndex == 61
        ) {
          /* eslint-disable */
          const tenRan = this.randInt(1, 3) * 10;
          value = this.randInt(6, 9);
          value += tenRan;
          unit = 4;
          result = value + unit;
        } else if (
          pageIndex <= 43 ||
          pageIndex == 62 ||
          pageIndex == 63 ||
          pageIndex == 52
        ) {
          /* eslint-disable */
          const tenRan = this.randInt(1, 3) * 10;
          value = this.randInt(7, 9);
          value += tenRan;
          unit = 3;
          result = value + unit;
        } else if (
          pageIndex <= 47 ||
          pageIndex == 64 ||
          pageIndex == 65 ||
          pageIndex == 53
        ) {
          /* eslint-disable */
          const tenRan = this.randInt(1, 3) * 10;
          value = this.randInt(8, 9);
          value += tenRan;
          unit = 2;
          result = value + unit;
        } else if (pageIndex <= 54 || pageIndex == 66 || pageIndex == 67) {
          /* eslint-disable */
          const tenRan = this.randInt(1, 3) * 10;
          value = 9;
          value += tenRan;
          unit = 1;
          result = value + unit;
        } else if (pageIndex <= 55) {
          /* eslint-disable */
          do {
            // 1. Random Value (chỉ lấy 4 hoặc 9)
            // Random một số nguyên ngẫu nhiên từ 0 hoặc 1.
            // Nếu là 0, chọn 4. Nếu là 1, chọn 9.
            const tenRan = this.randInt(1, 3) * 10;
            value = this.randInt(1, 9);
            const flag = value;
            value += tenRan;
            // 2. Unit cố định là 6
            unit = 9;

            result = value + unit;

            const pairKey = `${value},${unit}`; // Thêm key để kiểm tra lặp
            attempts++;

            // Điều kiện thoát:
            // A. Cặp (value, unit) chưa từng được chọn
            // B. Hoặc đã cố gắng quá nhiều lần (tránh lặp vô hạn)
            if (flag !== 5 || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else if (pageIndex <= 56) {
          /* eslint-disable */
          do {
            // 1. Random Value (chỉ lấy 4 hoặc 9)
            // Random một số nguyên ngẫu nhiên từ 0 hoặc 1.
            // Nếu là 0, chọn 4. Nếu là 1, chọn 9.
            const tenRan = this.randInt(1, 3) * 10;
            value = this.randInt(2, 9);
            const flag = value;
            value += tenRan;
            // 2. Unit cố định là 6
            unit = 8;

            result = value + unit;

            const pairKey = `${value},${unit}`; // Thêm key để kiểm tra lặp
            attempts++;

            // Điều kiện thoát:
            // A. Cặp (value, unit) chưa từng được chọn
            // B. Hoặc đã cố gắng quá nhiều lần (tránh lặp vô hạn)
            if ((flag !== 5 && flag !== 6) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else if (pageIndex <= 57) {
          /* eslint-disable */
          do {
            // 1. Random Value (chỉ lấy 4 hoặc 9)
            // Random một số nguyên ngẫu nhiên từ 0 hoặc 1.
            // Nếu là 0, chọn 4. Nếu là 1, chọn 9.
            const tenRan = this.randInt(1, 3) * 10;
            value = this.randInt(3, 9);
            const flag = value;
            value += tenRan;
            // 2. Unit cố định là 6
            unit = 7;

            result = value + unit;

            const pairKey = `${value},${unit}`; // Thêm key để kiểm tra lặp
            attempts++;

            // Điều kiện thoát:
            // A. Cặp (value, unit) chưa từng được chọn
            // B. Hoặc đã cố gắng quá nhiều lần (tránh lặp vô hạn)
            if ((flag !== 5 && flag !== 6 && flag !== 7) || attempts > maxAttempts) {
              break;
            }
          } while (true);

          if (attempts <= maxAttempts) {
            selectedPairs.add(`${value},${unit}`);
          }
        } else {
          /* eslint-disable */
          do {
            // 1. Random Value (1 đến 4)
            value = this.randInt(1, 4);

            // 2. Random Unit (1 đến 4, có thể âm hoặc dương)
            const unitMagnitude = this.randInt(1, 4);
            // 50% là dương, 50% là âm
            const sign = this.randInt(0, 1) === 0 ? 1 : -1;
            unit = unitMagnitude * sign;

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
        }

        // Đảm bảo không sử dụng cặp (value, unit) nếu đã vượt quá số lần thử tối đa và không tìm được cặp mới.
        if (attempts > maxAttempts && pageIndex <= 12) {
          console.warn(
            `Could not find a unique (value, unit) pair for page ${pageIndex} after ${maxAttempts} attempts.`
          );
        }
        if (pageIndex <= 13 && pageIndex > 9) {
          content = "+ 9 = + 10 - 1";
        } else if (pageIndex <= 17 && pageIndex > 13) {
          content = "+ 8 = + 10 - 2";
        } else if (pageIndex <= 21 && pageIndex > 17) {
          content = "+ 7 = + 10 - 3";
        } else if (pageIndex == 22) {
          content = "Revision: + 9 = + 10 - 1";
        } else if (pageIndex == 23) {
          content = "Revision: + 8 = + 10 - 2";
        } else if (pageIndex == 24) {
          content = "Revision: + 7 = + 10 - 3";
        } else if (pageIndex == 25) {
          content = "+ 6 = + 10 - 4";
        } else if (pageIndex <= 28 && pageIndex > 25) {
          content = "+ 6 = + 10 - 4";
        } else if (pageIndex <= 32 && pageIndex > 28) {
          content = "+ 5 = + 10 - 5";
        } else if (pageIndex <= 36 && pageIndex > 32) {
          content = "+ 4 = + 10 - 6";
        } else if (pageIndex == 37) {
          content = "Revision: + 6 = + 10 - 4";
        } else if (pageIndex == 38) {
          content = "Revision: + 5 = + 10 - 5";
        } else if (pageIndex == 39) {
          content = "Revision: + 4 = + 10 - 6";
        } else if (pageIndex <= 43 && pageIndex > 39) {
          content = "+ 3 = + 10 - 7";
        } else if (pageIndex <= 47 && pageIndex > 43) {
          content = "+ 2 = + 10 - 8";
        } else if (pageIndex <= 51 && pageIndex > 47) {
          content = "+ 1 = + 10 - 9";
        } else if (pageIndex == 52) {
          content = "Revision: + 3 = + 10 - 7";
        } else if (pageIndex == 53) {
          content = "Revision: + 2 = + 10 - 8";
        } else if (pageIndex == 54) {
          content = "Revision: + 1 = + 10 - 9";
        } else if (pageIndex == 55) {
          content = "Revision: + 9 = + 10 - 1";
        } else if (pageIndex == 56) {
          content = "Revision: + 8 = + 10 - 2";
        } else if (pageIndex == 57) {
          content = "Revision: + 7 = + 10 - 3";
        } else if (pageIndex == 58) {
          content = "Revision: + 6 = + 10 - 4";
        } else if (pageIndex == 59) {
          content = "Revision: + 5 = + 10 - 5";
        } else if (pageIndex == 60 || pageIndex == 61) {
          content = "Revision: + 4 = + 10 - 6";
        } else if (pageIndex == 62 || pageIndex == 63) {
          content = "Revision: + 3 = + 10 - 7";
        } else if (pageIndex == 64 || pageIndex == 65) {
          content = "Revision: + 2 = + 10 - 8";
        } else if (pageIndex == 66 || pageIndex == 67) {
          content = "Revision: + 1 = + 10 - 9";
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

      for (let p = 10; p <= 67; p++) {
        const items = this.makeNumberObjectsForPage1to67(p, 15);
        const paged = this.paginateWithGroups(items, 15, 5, p);
        allPages.push(...paged);
      }

      this.pages = allPages;
      this.saveJsonForBrowserDownload(this.pages, "AB_SC.json");
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
.form-row span {
  min-width: 12px;
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
.table .tbody .td div.footer-math {
  flex: unset;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  width: calc(100% - 60px);
}
.table .tbody .td div.footer-math span {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #000;
  flex-direction: column;
  gap: 10px;
  font-weight: bold;
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

/* UPDATED: Finger Technique — thinner border, larger text to match old style */
.finger-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 8px 0;
  flex: 1;
  box-sizing: border-box;
}

/* Title size adjusted to match original look */
.finger-title {
  font-size: 26px; /* tăng nhẹ so với trước */
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 6px 0 6px;
  text-align: center;
}

/* Wrap table để giới hạn chiều ngang */
.finger-table-wrap {
  width: 78%;
  max-width: 720px;
}

/* Bảng: viền ngoài mảnh hơn, font lớn hơn */
.finger-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #000; /* giảm từ 2px -> 1px */
  table-layout: fixed;
  font-size: 18px; /* tăng font để chữ không nhỏ */
  background: #fff;
}

/* header ô */
.finger-table thead th {
  padding: 8px 10px; /* giảm padding để giữ cân bằng */
  border-bottom: 1px solid #000; /* mảnh hơn */
  border-right: 1px solid #000;
  font-weight: 700;
  text-align: left;
}

/* căn chỉnh từng cột */
.finger-table thead th:nth-child(1) {
  width: 8%;
  text-align: center;
}
.finger-table thead th:nth-child(2) {
  width: 20%;
  text-align: center;
}
.finger-table thead th:nth-child(3) {
  width: 72%;
  text-align: center;
  padding-left: 14px;
}

/* body ô */
.finger-table tbody td {
  padding: 10px 10px; /* hơi nhỏ hơn so với trước nhưng đủ không làm rối */
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  vertical-align: middle;
  font-weight: 600;
  font-size: 18px; /* đảm bảo đọc tốt khi in */
}

/* loại bỏ border phải ở cột cuối */
.finger-table tbody td:last-child,
.finger-table thead th:last-child {
  border-right: 0;
}

/* style hàng - giữ khoảng cách đều */
.finger-table tbody tr {
  height: 34px;
}

/* nhấn mạnh số thứ tự */
.finger-table tbody td:first-child {
  text-align: center;
  font-weight: 500;
}

/* Number căn giữa */
.finger-table tbody td:nth-child(2) {
  text-align: center;
  font-weight: 500;
}

/* Fingers căn trái */
.finger-table tbody td:nth-child(3) {
  text-align: left;
  padding-left: 18px;
  text-align: center;
}

/* ===== Revised Friends of 10 styles (match design) ===== */
.friends-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding-top: 2px;
  padding-bottom: 8px;
  flex: 1;
  box-sizing: border-box;
}

/* Title */
.friends-title {
  font-size: 26px; /* to như thiết kế */
  font-weight: 700;
  margin: 0;
  text-align: center;
  letter-spacing: 0.6px;
}

/* CENTERING wrapper for the box */
.friends-box-outer,
.formulas-box-outer {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* main list box */
.friends-box {
  width: 250px; /* khá giống tỉ lệ ảnh */
  border: 1px solid #000;
  padding: 26px 18px; /* khoảng cách trong giống mẫu */
  box-sizing: border-box;
  background: #fff;
}

/* rows spacing */
.friends-list {
  display: flex;
  flex-direction: column;
  gap: 18px; /* khoảng cách dọc lớn tương tự ảnh */
}

/* each row is 3 columns */
.friends-row {
  display: grid;
  grid-template-columns: 1fr 180px 1fr; /* arrow area fixed width */
  align-items: center;
  justify-items: center;
}

/* left / right numbers */
.f-left,
.f-right {
  font-size: 18px;
  font-weight: 500;
  color: #111;
  line-height: 1;
  text-align: center;
}

/* arrow center: svg sits here, ensure small vertical space */
.f-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
}

/* subtitle */
.friends-subtitle {
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  margin: 0;
  line-height: 1.05;
}

/* formulas box */
.formulas-box {
  width: 250px; /* khớp với hộp trên */
  border: 1px solid #000;
  padding: 5px;
  box-sizing: border-box;
  background: #fff;
}

/* formula rows layout */
.formula-row {
  display: grid;
  grid-template-columns: 1fr; /* left / middle / right */
  align-items: center;
  gap: 8px;
  padding: 6px 0;
}

/* columns formatting */
.f-form-left {
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  padding-left: 6px;
}
.f-form-mid {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17px;
}
.f-form-right {
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  padding-right: 6px;
}

/* Slight print adjustments to ensure boxes keep size */
@media print {
  .friends-box,
  .formulas-box {
    width: 320px;
  }
  .friends-title {
    font-size: 26px;
  }
}

/* small screens: shrink boxes (no effect for A4 print) */
@media (max-width: 700px) {
  .friends-box,
  .formulas-box {
    width: 86%;
    padding: 18px;
  }
  .friends-row {
    grid-template-columns: 1fr 120px 1fr;
  }
  .friends-title {
    font-size: 20px;
  }
  .f-left,
  .f-right,
  .f-form-left,
  .f-form-mid,
  .f-form-right {
    font-size: 15px;
  }
}

/* ----- Trang 3 styles ----- */
.page3-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  box-sizing: border-box;
}

/* TOP: two boxes side by side */
.top-dual {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 6px;
}

.box {
  border: 1px solid #000;
  background: #fff;
  box-sizing: border-box;
  padding: 5px;
}
.left-box,
.right-box {
  width: 215px;
} /* điều chỉnh cho tỉ lệ giống ảnh */

/* list inside box */
.box-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* each row layout */
.box-row {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  gap: 20px;
}

/* number column */
.col-num {
  min-width: 20px;
  width: 25px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

/* arrow column: center the svg */
.col-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* checkbox square (visual) */
.fill-box,
.fill-box-small {
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 1.2px solid #111;
  box-sizing: border-box;
  background: #fff;
}
.fill-box-small {
  width: 25px;
  height: 25px;
}

/* right box rows use same grid but mirrored columns */
.right-box .box-row {
  grid-template-columns: 46px 1fr 46px;
}

/* subtitle */
.page3-subtitle {
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  margin: 8px 0 0;
  line-height: 1.02;
}

/* formulas two column container */
.formulas-2col {
  width: 510px;
  max-width: 760px;
  display: flex;
  gap: 0px;
  justify-content: center;
}

/* each form column */
.form-col {
  flex: 1;
  border: 1px solid #000;
  padding: 5px;
  box-sizing: border-box;
  background: #fff;
}
.formulas-2col .form-col:first-child {
  border-right: 0px solid #000;
}

/* each formula row */
.form-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  letter-spacing: 0.8px;
}

/* left/mid/right formatting */
.f-left,
.f-mid {
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  letter-spacing: 0.8px;
}
.f-mid {
  text-align: center;
}
.f-right {
  font-size: 20px;
  font-weight: 600;
  text-align: right;
  padding-right: 6px;
}
.f-right-box {
  display: flex;
  justify-content: flex-end;
  padding-right: 6px;
}

/* small checkbox in formulas column */
.f-right-box .fill-box-small {
  border: 1.2px solid #111;
}

/* tweak for printing so boxes keep same width on print */
@media print {
  .left-box,
  .right-box {
    width: 260px;
  }
  .form-col {
    padding: 20px;
  }
  .form-row {
    padding: 7px 0;
  }
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
