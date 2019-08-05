$(document).ready(function(){
    $('.moment-date').each(function(){
        var date = $(this).text();
        moment.locale('pt-br');
        $(this).text(moment(date, "YYYY-MM-DD HH:mm").fromNow());
    });
});