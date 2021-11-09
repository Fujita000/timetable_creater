document.querySelector("#data_load").addEventListener("click", () => {
  document.querySelector("#file_load").click();
});

(function () {
  const file = document.querySelector("#file_load");
  file.addEventListener("change", e => {
    let input = e.target;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      reset()

      const obj = JSON.parse(reader.result);

      obj.class_list.forEach(ele => {
        list_add('#class_name_text', '#class_add_btn', ele);
      });
      obj.teacher_list.forEach(ele => {
        list_add('#teacher_name_text', '#teacher_add_btn', ele);
      });
      obj.room_list.forEach(ele => {
        list_add('#room_name_text', '#room_add_btn', ele);
      });

      obj.normal_lesson_list.forEach((ele, cls) => {
        lesson_add("#lesson_list_" + cls, ele.length - 1);
        ele.forEach((e, i, arr) => {
          if (i != 0) {//normal_lesson[0]には空の授業が入っているため回避
            lesson_opt("#normal_lesson_list_" + cls + "_" + i, e[0], e[1], e[2], e[3], e[4])
          }
        });
      });

      obj.elective_lesson_num_data.forEach((ele, cls) => {
        ele.forEach((e, i) => {
          ele_lesson_add(cls, i, e[0], e[1])
        });
      });

      obj.elective_lesson_list.forEach((ele1, cls) => {
        ele1.forEach((ele2, i) => {
          ele_lesson_item_add("#elective_lesson_list_" + cls + "_" + i, ele2.length)
          ele2.forEach((ele3, j) => {
            ele_lesson_item_opt("#elective_lesson_list_" + cls + "_" + i + "_" + j, ele3[0], ele3[1], ele3[2])
          })
        })
      });

      document.querySelectorAll('.get_lesson_num_btn').forEach(i => {
        //授業の決定ボタン、これを押さないと反映されない隠されてるやつ
        i.click()
      });
      document.querySelectorAll('.time_btn').forEach(i => {
        //授業の決定ボタン、これを押さないと反映されない隠されてるやつ
        i.click()
      });

    };
    reader.readAsText(file);

    function list_add(target, target_btn, name) {
      //情報設定の情報の追加
      document.querySelector(target).value = name;
      document.querySelector(target_btn).click();
    }

    function lesson_add(target, num) {
      //'target'で指定した授業コマ設定の授業追加ボタンを'num'回クリック
      for (let i = 0; i < num; i++) {
        document.querySelector(target).children[2].children[0].click();
      }
    }

    function lesson_opt(target, name, teacher_num, room_num, lesson_num, continuity_num) {
      //'target'で指定した、授業の設定を行う
      console.log(target)
      document.querySelector(target).children[0].value = name;
      document.querySelector(target).children[0].onkeyup();
      document.querySelector(target).children[1].selectedIndex = teacher_num;
      document.querySelector(target).children[2].selectedIndex = room_num;
      document.querySelector(target).children[3].value = lesson_num;
      document.querySelector(target).children[4].value = continuity_num;
    }

    function ele_lesson_add(cls_num, offset, lesson_num, continuity_num) {
      document.querySelectorAll('button[onclick="elective_lesson_list_add_btn(this)"]')[cls_num].click();
      document.querySelector("#elective_lesson_list_" + cls_num + "_" + offset).children[1].value = lesson_num;
      document.querySelector("#elective_lesson_list_" + cls_num + "_" + offset).children[2].value = continuity_num;
      document.querySelector("#elective_lesson_list_" + cls_num + "_" + offset).children[1].onkeyup();
      document.querySelector("#elective_lesson_list_" + cls_num + "_" + offset).children[2].onkeyup();
    }
    function ele_lesson_item_add(target, num) {
      //'target'で指定した授業コマ設定の選択授業追加ボタンを'num'回クリック
      for (let i = 0; i < num; i++) {
        document.querySelector(target).children[5].click();
      }
    }

    function ele_lesson_item_opt(target, name, teacher_num, room_num) {
      //'target'で指定した、授業の設定を行う
      document.querySelector(target).children[0].value = name;
      document.querySelector(target).children[1].selectedIndex = teacher_num;
      document.querySelector(target).children[2].selectedIndex = room_num;
    }

    function reset() {
      now_choice_lesson = -1; //選択中の授業の内容
      now_choice_class = -1; //選択中のクラス
      elaser_flag = false;//消しゴム機能

      normal_lesson_list = [];
      elective_lesson_list = [];
      timetable = [];
      class_list = [];
      teacher_list = [""];
      room_list = [""];

      const body = `
  <main class="mdl-layout__content">
      <!-- 情報設定パネル -->
      <div class="mdl-layout__tab-panel is-active" id="information">
        <section class="section--center mdl-grid mdl-grid--no-spacing">
          <div class="mdl-cell mdl-cell--4-col" id="lesson">
            <p>クラス一覧</p>
            <input type="text" id="class_name_text"><button id="class_add_btn" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" onclick="class_add_btn()" data-upgraded=",MaterialButton"><i class="material-icons">add</i></button>
            <div id="class_list"></div>
          </div>
          <div class="mdl-cell mdl-cell--4-col" id="teacher">
            <p>教師一覧</p>
            <input type="text" id="teacher_name_text"><button id="teacher_add_btn" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" onclick="teacher_add_btn()" data-upgraded=",MaterialButton"><i class="material-icons">add</i></button>
            <div id="teacher_list"></div>
          </div>
          <div class="mdl-cell mdl-cell--4-col" id="lessonroom">
            <p>使用教室一覧</p>
            <input type="text" id="room_name_text"><button id="room_add_btn" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" onclick="room_add_btn()" data-upgraded=",MaterialButton"><i class="material-icons">add</i></button>
            <div id="room_list"></div>
          </div>
        </section>
      </div>
      <!-- 情報設定パネルここまで -->
      <!-- 授業コマ設定パネル -->
      <div class="mdl-layout__tab-panel" id="classlist">
        <div class="mdl-layout__container"><div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer has-drawer is-small-screen is-upgraded" data-upgraded=",MaterialLayout">
          <div class="mdl-layout__drawer" id="backcol1" aria-hidden="true">
            <nav id="operation_link_sidebar" class="mdl-navigation"></nav>
          </div>
          <div aria-expanded="false" role="button" tabindex="0" class="mdl-layout__drawer-button"><i class="material-icons"></i></div><main class="mdl-layout__content" id="side_nav">
            <div class="page-content">
              <!--Your content goes here -->
              <section class="section--center mdl-grid mdl-grid--no-spacing" id="l-section">
                <div class="l-frame">
                  <div id="lesson_list"></div>
                </div>
              </section>
            </div>
          </main>
        <div class="mdl-layout__obfuscator"></div></div></div>
      </div>
      <!-- 授業コマ設定パネルここまで -->
      <!-- 時間割パネル -->
      <div class="mdl-layout__tab-panel" id="timetable">
        <div class="mdl-layout__container"><div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer has-drawer is-small-screen is-upgraded" data-upgraded=",MaterialLayout">
          <div class="mdl-layout__drawer" id="backcol2" aria-hidden="true">
            <nav id="timetable_link_sidebar" class="mdl-navigation">
              <div>
                <p id="timetable_sidebar_eraser">消しゴム</p>
                <p id="cell_change_btn">入れ替え</p>
                <p id="download">CSVダウンロード</p>
                <p id="auto_create">自動生成</p>
              </div>
            </nav>
          </div>
          <div aria-expanded="false" role="button" tabindex="0" class="mdl-layout__drawer-button"><i class="material-icons"></i></div><main class="mdl-layout__content" id="side_nav">
            <div class="page-content">
              <!-- Your content goes here -->
              <section class="section--center mdl-grid mdl-grid--no-spacing" id="t-section">
                <div id="table">
                  <div id="timetable_list"></div>
                </div>
              </section>
            </div>
          </main>
        <div class="mdl-layout__obfuscator"></div></div></div>
      </div>
      <!-- 時間割パネルここまで -->
    </main>
    `;
    }
  });
}());
