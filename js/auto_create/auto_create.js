let ac_pass_lesson,ac_pass_timetable,ac_choice_lesson;

// 二次元配列をコピーする
function copyMatrix(base) {
  const result = [];
  for (const line of base) {
    result.push([...line]);
  }
  return result;
}

//アルゴリズム

// 時間割で空いている時間を探す関数
var vacant_timetable = (v_timetable,v_grade,v_weekday,v_time) => {
  if(v_timetable[v_grade][v_weekday][v_time] == 0){
    return [v_weekday, v_time];
  }
  return [999,999];
}

// 空いている時間が何時間空いているか探す関数
var continuous = (c_timetable,c_grade,c_weekday,c_time) => {
  let temp = 0;
  for(i = 0; i < 3 && i+c_time < 6; i++){
    if(c_timetable[c_grade][c_weekday][c_time+i] != 0){
      break;
    }
    temp++;
  }
  return temp;
}

//空いている教室を見つける関数
var find_class = (f_timetable,f_weekday,f_time) => {
  let f_class = [];
  for(i = 0; i < 4; i++){
    if(f_timetable[i][f_weekday][f_time] == 0){
      continue;
    }else if(f_timetable[i][f_weekday][f_time][2] == 0){
      if(ac_choice_lesson[i] === void 0){
        continue;
      }
      for(j = 0; j < ac_choice_lesson[i].length; j++){
        if(f_timetable[i][f_weekday][f_time][0] == ac_choice_lesson[i][j][0]){
          f_class.push(ac_choice_lesson[i][j][3]);
        }
      }
      continue;
    }
    f_class.push(f_timetable[i][f_weekday][f_time][2]);
  }
  return f_class;
}

//空いている先生を見つける関数
var find_teacher = (f_timetable,f_weekday,f_time) => {
  let f_teacher = [];
  for(i = 0; i < 4; i++){
    if(f_timetable[i][f_weekday][f_time] == 0){
      continue;
  }else if(f_timetable[i][f_weekday][f_time][1] == 0){
    if(ac_choice_lesson[i] === void 0){
      continue;
    }
    for(j = 0; j < ac_choice_lesson[i].length; j++){
      if(f_timetable[i][f_weekday][f_time][0] == ac_choice_lesson[i][j][0]){
        f_teacher.push(ac_choice_lesson[i][j][2]);
      }
    }
    continue;
  }
    f_teacher.push(f_timetable[i][f_weekday][f_time][1]);
  }
  return f_teacher;
}

//空いている先生と教室がマッチする授業を見つける
var match = (m_teacher,m_class,m_grade,m_continuous) => {    //この引数(m_teacher,m_class)には配列が入ります。
  let match_class = [];
  for(i = 0; i < ac_pass_lesson[m_grade].length; i++){
    if(ac_pass_lesson[m_grade][i][3] <= ac_pass_lesson[m_grade][i][4]){
      continue;
    }
    let not_match = false;
    for(j = 0; j < m_teacher.length; j++){
      if(ac_pass_lesson[m_grade][i][1] == m_teacher[j] && ac_pass_lesson[m_grade][i][1] != 0){
        not_match = true;
        break;
      }else if(ac_pass_lesson[m_grade][i][1] == 0){  //変える予定
        for(k = 0; k < ac_choice_lesson[m_grade].length; k++){
          if(ac_choice_lesson[i] === void 0){
            continue;
          }
          if(ac_choice_lesson[m_grade][k][2] == m_teacher[j]){
            not_match = true;
          }
        }
      }
    }
    if(not_match == false){
      for(j = 0; j < m_class.length; j++){
        if(ac_pass_lesson[m_grade][i][2] == m_class[j] && ac_pass_lesson[m_grade][i][2] != 0){
          not_match = true;
          break;
        }else if(ac_pass_lesson[m_grade][i][1] == 0){  //変える予定
          for(k = 0; k < ac_choice_lesson[m_grade].length; k++){
            if(ac_choice_lesson[i] === void 0){
              continue;
            }
            if(ac_choice_lesson[m_grade][k][3] == m_teacher[j]){
              not_match = true;
            }
          }
        }
      }
    }
    if(m_continuous < ac_pass_lesson[m_grade][i][5]){
      not_match = true;
      break;
    }
    if(not_match == false){
      match_class.push(i);
      continue;
    }
  }
  return match_class;
}

// 空いている連続時間に授業を入れる関数
var put_class = (p_grade,weekday,time,p_class,p_continuous) => {
  for(i = 0; i < p_continuous; i++){
    if(ac_pass_lesson[p_grade][p_class][3] <= ac_pass_lesson[p_grade][p_class][4]){
      break;
    }
    ac_pass_timetable[p_grade][weekday][time+i] = ac_pass_lesson[p_grade][p_class];
    ac_pass_lesson[p_grade][p_class][4]++;
  }
}

function run_timetable(){
  let run_vacant = [];
  let run_continuous = 0;
  let run_find_class = [];
  let run_find_teacher = [];
  let run_match;
  let run_count = 0;
  let random = Math.floor( Math.random()*169 );

  loop: for(c=0; c<4; c++){
    for(run_weekday = 0; run_weekday < ac_pass_timetable[c].length; run_weekday++){
      for(run_time = 0; run_time < ac_pass_timetable[c][run_weekday].length; run_time++){
        run_vacant = [];
        run_continuous = 0;
        run_find_class = [];
        run_find_teacher = [];
        run_match_class = [];
        run_match_teacher = [];
        run_match = [];
        run_vacant = vacant_timetable(ac_pass_timetable,c,run_weekday,run_time);
        if(run_vacant[0] == 999){
          continue;
        }
        run_continuous = continuous(ac_pass_timetable,c,run_vacant[0],run_vacant[1]);
        for(f=0;f<run_continuous;f++){
          run_find_class[f] = find_class(ac_pass_timetable,run_vacant[0],run_vacant[1]+f,c);
          run_find_teacher[f] = find_teacher(ac_pass_timetable,run_vacant[0],run_vacant[1]+f,c);
        }
        run_match_class = run_find_class.reduce((pre,current) => {pre.push(...current);return pre},[]);
        run_match_teacher = run_find_teacher.reduce((pre,current) => {pre.push(...current);return pre},[]);
        run_match = match(run_match_teacher,run_match_class,c,run_continuous);
        if(!run_match.length){
          continue;
        }
        put_class(c,run_vacant[0],run_vacant[1],run_match[(run_count+random)%run_match.length],run_continuous);
      }
    }
    if(run_count >= ac_pass_lesson[c].length){
      console.log("ダメでした");
      run_count = 0;
      for(i = 0; i < ac_pass_lesson[c].length; i++){
        if(ac_pass_lesson[c][i][3] > ac_pass_lesson[c][i][4]){
          ac_pass_timetable = JSON.parse(JSON.stringify(run_initial));
          ac_pass_lesson = JSON.parse(JSON.stringify(lesson_initial));
          c = -1;
          random = Math.floor( Math.random()*169 );
          continue loop;
        }
      }
    }
    for(i = 0; i < ac_pass_lesson[c].length; i++){
      if(ac_pass_lesson[c][i][3] > ac_pass_lesson[c][i][4]){
        run_count++;
        c--;
        continue loop;
      }
    }
  }
} 


function initialization(){
  // ac_pass_timetable = JSON.parse(JSON.stringify(run_initial));
  // ac_pass_lesson = JSON.parse(JSON.stringify(lesson_initial));
  let get_list = pass_auto_timetable()
  ac_pass_lesson = JSON.parse(JSON.stringify(get_list[0]));
  ac_pass_timetable = JSON.parse(JSON.stringify(get_list[1]));
  ac_choice_lesson = JSON.parse(JSON.stringify(get_list[2]));
  lesson_initial = JSON.parse(JSON.stringify(get_list[0]));//lesson
  run_initial = JSON.parse(JSON.stringify(get_list[1]));//timetable
}


let auto_create_btn = document.getElementById("auto_create");
auto_create_btn.addEventListener("click",e=>{
  initialization();
  run_timetable();
});
