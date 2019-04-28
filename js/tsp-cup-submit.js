$(document).ready(function(){var e=document.getElementsByClassName("needs-validation");Array.prototype.filter.call(e,function(t){t.addEventListener("submit",function(e){e.preventDefault(),e.stopPropagation(),t.classList.add("was-validated"),!0===t.checkValidity()&&function(){$(this).toggleClass("d-none"),$("#btn-sending").toggleClass("d-none"),$("#container-alerts").empty();var e=null,t=$("#select-group option:selected").val(),o=$("#select-group option:selected").data("name"),s=$("#select-group option:selected").data("members"),n=$("#select-group option:selected").data("members-short"),a=$("#textarea-solution").val(),r=$("#input-cost").val();switch(parseInt($("#select-instance option:selected").val())){case 1:e="tsp1";break;case 2:e="tsp2";break;case 3:e="tsp3"}if(null==e)h("Alguma coisa saiu errado! Por favor, comunique o erro ao professor informando o código de erro.",1,60,10);else{var i=function(e,t,o){var s={success:!1,cost_evaluated:null,solution:null};solution=t.replace(/\s+/g,"").trim().split(",");for(var n=0;n<solution.length;n++)if(solution[n]=parseInt(solution[n]),isNaN(solution[n]))return h("A solução informada não está no formato correto! Leia as instruções acima para descobrir como formatar sua solução.",1,15,null),_(),s;s.solution=solution.join(",");var a=(r=e,i={num_vertices:0,coordinates:null},$.ajax({url:"/assets/tsp-cup/instances/"+r+".txt",async:!1,success:function(e){for(var t=e.split("\n"),o=0;o!=t.length;){if("#num_vertices"==t[o]){o++,i.num_vertices=parseInt(t[o]);break}o++}for(;o!=t.length;){if("#coordinates"==t[o]){o++;break}o++}i.coordinates=new Array(i.num_vertices);for(var s=0;s<i.num_vertices;s++){var n=t[o].replace(/\s+/g," ").trim().split(" ");i.coordinates[s]=new Array(2),i.coordinates[s][0]=n[1],i.coordinates[s][1]=n[2],o++}}}),i);var r,i;if(solution.length!=a.num_vertices+1)return h("O número de clientes na rota não condiz com o esperado para a instância escolhida! Deveriam haver <strong>"+(a.num_vertices+1)+" vértices </strong>. Leia as instruções acima para descobrir como formatar sua solução.",1,15,null),_(),s;if(solution[0]!=solution[solution.length-1])return h("Solução inviável, o primeiro vértice deve ser igual ao último!",1,15,null),_(),s;for(var l=new Array(a.num_vertices).fill(!1),n=0;n<solution.length-1;n++){if(solution[n]>=a.num_vertices||solution[n]<0)return h("Solução inviável, o cliente "+solution[n]+" não existe!",1,15,null),_(),s;if(l[solution[n]])return h("Solução inviável, o cliente "+solution[n]+" é visitado mais de uma vez!",1,15,null),_(),s;l[solution[n]]=!0}for(var u=0,n=0;n<solution.length-1;n++){var c=a.coordinates[solution[n]][0],d=a.coordinates[solution[n]][1],m=a.coordinates[solution[n+1]][0],v=a.coordinates[solution[n+1]][1];u+=(p=c,f=d,g=m,b=v,Math.round(Math.sqrt(Math.pow(p-g,2)+Math.pow(f-b,2))))}var p,f,g,b;u!=o&&h("A solução informada possui valor <strong>"+u+"</strong>, mas foi informado "+o+". Note que iremos considerar o valor correto, mas isso pode indicar um bug em seu código.",2,15,null);return s.success=!0,s.cost_evaluated=u,$("#textarea-solution").removeClass("is-invalid"),s}(e,a,r);if(i.success&&$("#alert-successfully-sent").hasClass("d-none")){$("#alert-successfully-sent").removeClass("d-none"),setTimeout(function(){$("#alert-successfully-sent").addClass("d-none")},1e4);var l='<strong>Solution:</strong><br>{<br>\t"solution": {<br>\t\t"instance_name": "'+e+'",<br>\t\t"group_id": '+t+',<br>\t\t"group_name": "'+o+'",<br>\t\t"group_members": "'+s+'",<br>\t\t"group_members_short": "'+n+'",<br>\t\t"time_stamp": "'+moment().format()+'",<br>\t\t"solution_cost_user": '+r+',<br>\t\t"solution_cost_evaluated": '+i.cost_evaluated+',<br>\t\t"solution_user": "'+a+'",<br>\t\t"solution": "'+i.solution+'"<br>\t}<br>}';$("#input-email-msg").val(l),$("#input-email-title").val("[TSP CUP] Grupo "+t),$("#form-test").submit()}}$(this).toggleClass("d-none"),$("#btn-sending").toggleClass("d-none")}()},!1)});function h(e,t,o,s){var n=$('<div class="alert alert-'+(1==t?"danger":"warning")+' alert-dismissible fade show" role="alert"></div>').append("<strong>"+(1==t?"Erro":"Aviso")+(null!=s?" "+s:"")+":</strong> "+e).append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');$("#container-alerts").append(n),setTimeout(function(){n.remove()},1e3*o)}function _(){$("#form-tsp-cup-submit").removeClass("was-validated"),$("#textarea-solution").hasClass("is-invalid")||$("#textarea-solution").addClass("is-invalid").removeClass("is-valid")}$("#alert-successfully-sent .close").on("click",function(e){return e.preventDefault(),$("#alert-successfully-sent").hasClass("d-none")||$("#alert-successfully-sent").addClass("d-none"),!1})});