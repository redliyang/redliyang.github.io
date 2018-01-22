/**
 * Created by jQueryDemo on 2015/12.
 */
$(function() {
  var $tb = $("#j_tb");
  // GET单行
  $("a.get").click(function() {
    // 删除当前行
    delData(this);
  });

  // 展示添加窗口
  $("#j_btnAddData").click(function() {
    $("#j_mask").show();
    $("#j_formAdd").show();
  });

  // 添加
  $("#j_btnAdd").click(function() {
    var txtLesson = $("#j_txtLesson").val();
    var txtBelSch = $("#j_txtBelSch").val();

    // 判断是否输入了内容
    if (txtLesson === "") {
      alert("请出入课程名称");

      return;
    }

    var trHml =
      "<tr><td>" + txtLesson + "</td>" + "<td>" + txtBelSch + "</td>" + "<td><a href='javascrip:;' class='get' onclick='delData(this)'>GET</a></td>" + "</tr>";

    $tb.append(trHml);

    hideFormAddSection();
  });

  // 关闭按钮
  $("#j_hideFormAdd").click(function() {
    hideFormAddSection();
  });
});

// 删除当前行
function delData(e) {
  $(e).parent("td").parent("tr").remove();
}

// 隐藏添加区域并重置值
function hideFormAddSection() {
  $("#j_mask").hide();
  $("#j_formAdd").hide();

  $("#j_txtLesson").val("");
  $("#j_txtBelSch").val("传智播客-前端与移动开发学院");
}
