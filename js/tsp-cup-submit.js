$(document).ready(function(){function e(){$(this).toggleClass("d-none"),$("#btn-sending").toggleClass("d-none"),$("#container-alerts").empty();var e=null,s=$("#select-group option:selected").val(),t=$("#select-group option:selected").data("name"),a=$("#select-group option:selected").data("members"),r=$("#select-group option:selected").data("members-short"),i=$("#textarea-solution").val(),l=$("#input-cost").val();switch(parseInt($("#select-instance option:selected").val())){case 1:e="tsp1";break;case 2:e="tsp2";break;case 3:e="tsp3";break;case 4:e="tsp4"}if(null==e)n("Alguma coisa saiu errado! Por favor, comunique o erro ao professor informando o código de erro.",1,60,10);else{var u=o(e,i,l);if(u.success&&$("#alert-successfully-sent").hasClass("d-none")){$("#alert-successfully-sent").removeClass("d-none"),setTimeout(function(){$("#alert-successfully-sent").addClass("d-none")},1e4);var c='<strong>Solution:</strong><br>{<br>	"solution": {<br>		"instance_name": "'+e+'",<br>		"group_id": '+s+',<br>		"group_name": "'+t+'",<br>		"group_members": "'+a+'",<br>		"group_members_short": "'+r+'",<br>		"time_stamp": "'+moment().format()+'",<br>		"solution_cost_user": '+l+',<br>		"solution_cost_evaluated": '+u.cost_evaluated+',<br>		"solution_user": "'+i+'",<br>		"solution": "'+u.solution+'"<br>	}<br>}';$("#input-email-msg").val(c),$("#input-email-title").val("[TSP CUP] Grupo "+s),$("#form-test").submit()}}$(this).toggleClass("d-none"),$("#btn-sending").toggleClass("d-none")}function o(e,o,r){var i={success:!1,cost_evaluated:null,solution:null};solution=o.replace(/\s+/g,"").trim().split(",");for(var l=0;l<solution.length;l++)if(solution[l]=parseInt(solution[l]),isNaN(solution[l]))return n("A solução informada não está no formato correto! Leia as instruções acima para descobrir como formatar sua solução.",1,15,null),a(),i;i.solution=solution.join(",");var u=s(e);if(solution.length!=u.num_vertices+1)return n("O número de clientes na rota não condiz com o esperado para a instância escolhida! Deveriam haver <strong>"+(u.num_vertices+1)+" vértices </strong>. Leia as instruções acima para descobrir como formatar sua solução.",1,15,null),a(),i;if(solution[0]!=solution[solution.length-1])return n("Solução inviável, o primeiro vértice deve ser igual ao último!",1,15,null),a(),i;for(var c=new Array(u.num_vertices).fill(!1),l=0;l<solution.length-1;l++){if(solution[l]>=u.num_vertices||solution[l]<0)return n("Solução inviável, o cliente "+solution[l]+" não existe!",1,15,null),a(),i;if(c[solution[l]])return n("Solução inviável, o cliente "+solution[l]+" é visitado mais de uma vez!",1,15,null),a(),i;c[solution[l]]=!0}for(var d=0,l=0;l<solution.length-1;l++){var m=u.coordinates[solution[l]][0],v=u.coordinates[solution[l]][1],p=u.coordinates[solution[l+1]][0],f=u.coordinates[solution[l+1]][1];d+=t(m,v,p,f)}return d!=r&&n("A solução informada possui valor <strong>"+d+"</strong>, mas foi informado "+r+". Note que iremos considerar o valor correto, mas isso pode indicar um bug em seu código.",2,15,null),i.success=!0,i.cost_evaluated=d,$("#textarea-solution").removeClass("is-invalid"),i}function s(e){var o={num_vertices:0,coordinates:null};return $.ajax({url:"/assets/tsp-cup/instances/"+e+".txt",async:!1,success:function(e){for(var s=e.split("\n"),t=0;t!=s.length;){if("#num_vertices"==s[t]){t++,o.num_vertices=parseInt(s[t]);break}t++}for(;t!=s.length;){if("#coordinates"==s[t]){t++;break}t++}o.coordinates=new Array(o.num_vertices);for(var n=0;n<o.num_vertices;n++){var a=s[t].replace(/\s+/g," ").trim().split(" ");o.coordinates[n]=new Array(2),o.coordinates[n][0]=a[1],o.coordinates[n][1]=a[2],t++}}}),o}function t(e,o,s,t){return Math.ceil(Math.sqrt(Math.pow(e-s,2)+Math.pow(o-t,2)))}function n(e,o,s,t){var n=$('<div class="alert alert-'+(1==o?"danger":"warning")+' alert-dismissible fade show" role="alert"></div>').append("<strong>"+(1==o?"Erro":"Aviso")+(null!=t?" "+t:"")+":</strong> "+e).append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');$("#container-alerts").append(n),setTimeout(function(){n.remove()},1e3*s)}function a(){$("#form-tsp-cup-submit").removeClass("was-validated"),$("#textarea-solution").hasClass("is-invalid")||($("#textarea-solution").addClass("is-invalid").removeClass("is-valid"))}var r=document.getElementsByClassName("needs-validation");Array.prototype.filter.call(r,function(o){o.addEventListener("submit",function(s){s.preventDefault(),s.stopPropagation(),o.classList.add("was-validated"),o.checkValidity()===!0&&e()},!1)});$("#alert-successfully-sent .close").on("click",function(e){return e.preventDefault(),$("#alert-successfully-sent").hasClass("d-none")||$("#alert-successfully-sent").addClass("d-none"),!1})});