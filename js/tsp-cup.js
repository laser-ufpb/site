$(document).ready(function(){function t(t){for(var s={},r=[],n=[],i=[],u=[],a=0;a<t.length;a++)"tsp1"==t[a].instance_name?r.push(t[a]):"tsp2"==t[a].instance_name?n.push(t[a]):"tsp3"==t[a].instance_name&&i.push(t[a]),"group-"+t[a].group_id in s||(s["group-"+t[a].group_id]={group_id:t[a].group_id,group_name:t[a].group_name,group_members:t[a].group_members,group_members_short:t[a].group_members_short,points:0});r.sort(o),n.sort(o),i.sort(o);for(var a=0;a<r.length;a++){var m=s["group-"+r[a].group_id];m.points+=p-a,m.tsp1=r[a].solution_cost_evaluated}for(var a=0;a<n.length;a++){var m=s["group-"+n[a].group_id];m.points+=p-a,m.tsp2=n[a].solution_cost_evaluated}for(var a=0;a<i.length;a++){var m=s["group-"+i[a].group_id];m.points+=p-a,m.tsp3=i[a].solution_cost_evaluated}for(key in s)u.push(s[key]);u.sort(e);for(var g=$("#table-ranking tbody"),a=0;a<u.length;a++)g.append('<tr style="line-height: 32px"><th class="text-center">'+(0==a?'<img src="/img/icons/medal-gold.svg" height="32" alt="">':1==a?'<img src="/img/icons/medal-silver.svg" height="32" alt="">':2==a?'<img src="/img/icons/medal-bronze.svg" height="32" alt="">':a+1)+"</th><td>"+u[a].points+"</td><td>"+u[a].tsp1+" / "+u[a].tsp2+" / "+u[a].tsp3+"</td><td>"+u[a].group_name+"</td><td>"+u[a].group_members+"</td></tr>");$("#main-podium .podium-gold-group").html(u[0].group_members_short),$("#main-podium .podium-silver-group").html(u[1].group_members_short),$("#main-podium .podium-bronze-group").html(u[2].group_members_short)}function s(){$.ajax({dataType:"json",url:"/assets/tsp-cup/tsp-solutions.json",success:function(s){t(s.solutions),$("#rank-last-update").text("(Última atualização em "+s["last-updated-date"]+" às "+s["last-updated-time"]+")")}})}function o(t,s){return t.solution_cost_evaluated<s.solution_cost_evaluated?-1:t.solution_cost_evaluated>s.solution_cost_evaluated?1:moment(t.time_stamp).isBefore(moment(s.time_stamp))?-1:moment(t.time_stamp).isAfter(moment(s.time_stamp))?1:0}function e(t,s){return t.points>s.points?-1:t.points<s.points?1:t.tsp1<s.tsp1?-1:t.tsp1>s.tsp1?1:t.tsp2<s.tsp2?-1:t.tsp2>s.tsp2?1:t.tsp3<s.tsp3?-1:t.tsp3>s.tsp3?1:0}var p=50;s()});