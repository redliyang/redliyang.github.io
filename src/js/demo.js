$('input').on("keyup", function (e) {
    console.log(2)
    if (e.keyCode === 13) {
        $(this).next().next().focus()
    }
})

$("input").on('mouseenter', function (e) {
    $(this).select()
})