$(document).on('pageshow', '#rezeptDetailBild', function(event) {	$(this).css('background', '#FFF');//`this` refers to `#pageDetail`	var id = $.getUrlVar('id');	//$('.titelRezept').text("Titel");	//$(".bildRezept").attr("src", serviceURL+"images/rezepte/13_img_big.jpg");		$(".linkBild").attr("href", "rezept-details-bild.html?id="+id);	$(".linkZutat").attr("href", "rezept-details-zutaten.html?id="+id);	$(".linkAnleitung").attr("href", "rezept-details-anleitung.html?id="+id);	/*$('#actionListRezept').append('<li>Wertung<span class="ui-li-aside"><img src="icons/sterne/stern3schwarz.png" alt="wertung" width="55" height="10"></span></li>');	$('#actionListRezept').append('<li>Schwierigkeit<span class="ui-li-aside"><img src="icons/sterne/stern5schwarz.png" alt="wertung" width="55" height="10"></span></li>');	$('#actionListRezept').append('<li>Portionen<span class="ui-li-aside">3</span></li>');	$('#actionListRezept').append('<li>Kalorien pro Person<span class="ui-li-aside">3</span></li>');	$('#actionListRezept').listview('refresh');	*/	$.getJSON(serviceURL + 'mobile/rezept-detail.php?id='+id, displayRezept);});$(document).on('pageshow', '#rezeptDetailAnleitung', function(event) {	var id = $.getUrlVar('id');	$(this).css('background', '#FFF');//`this` refers to `#pageDetail`	//$('.titelRezept').text("Titel");	$(".bildRezeptKlein").attr("src", serviceURL+"images/rezepte/" + id + "_img_small.jpg");		$(".linkBild").attr("href", "rezept-details-bild.html?id="+id);	$(".linkZutat").attr("href", "rezept-details-zutaten.html?id="+id);	$(".linkAnleitung").attr("href", "rezept-details-anleitung.html?id="+id);	/*$('#actionListAnleitung').append('<li>x<p>xxx</p></li>');	$('#actionListAnleitung').append('<li>x<p>xxx</p></li>');		$('#actionListAnleitung').append('<li data-role="list-divider" >Ober/Unterhitze</li>');	$('#actionListAnleitung').append('<li>Temperatur<span class="ui-li-aside">34</span></li>');	$('#actionListAnleitung').append('<li>Backzeit<span class="ui-li-aside">34 min</span></li>');	$('#actionListAnleitung').listview('refresh');	$('#actionListAnleitung').append('<li data-role="list-divider" >Umluft</li>');	$('#actionListAnleitung').append('<li>Temperatur<span class="ui-li-aside">34</span></li>');	$('#actionListAnleitung').append('<li>Backzeit<span class="ui-li-aside">34 min</span></li>');	$('#actionListAnleitung').listview('refresh');	*/	$.getJSON(serviceURL + 'mobile/rezept-detail-anleitung.php?id='+id, displayRezeptAnleitung);});$(document).on('pageshow', '#rezeptDetailZutaten', function(event) {	var id = $.getUrlVar('id');	$(this).css('background', '#FFF');//`this` refers to `#pageDetail`	//$('.titelRezept').text("Titel");	$(".bildRezeptKlein").attr("src", serviceURL+"images/rezepte/" + id + "_img_small.jpg");		$(".linkBild").attr("href", "rezept-details-bild.html?id="+id);	$(".linkZutat").attr("href", "rezept-details-zutaten.html?id="+id);	$(".linkAnleitung").attr("href", "rezept-details-anleitung.html?id="+id);	//$.getJSON(serviceURL + 'rezept-details.php?id='+id, displayRezeptAnleitung);	//$('#tabelleZutaten tbody').append('<tr><td>1</td><td>222</td><td><b>333</b></td></tr>');	displayRezeptZutaten();});function displayRezept(data) {	var rezept = data.item, wertung = "", schwierigkeit = "", kalorien = "", portionen = "";	var id = $.getUrlVar('id');	$('.titelRezept').text(rezept.titel);	$(".bildRezept").attr("src", serviceURL+"images/rezepte/"+id+"_img_big.jpg");	if (rezept.wertung > 0) wertung = '<img src="icons/sterne/stern' + rezept.wertung + 'schwarz.png" alt="wertung" width="55" height="10">';  	if (rezept.schwierigkeit > 0) schwierigkeit = '<img src="icons/sterne/stern' + rezept.schwierigkeit + 'schwarz.png" alt="schwierigkeit" width="55" height="10">';  	if (rezept.kalorien > 0) kalorien = rezept.kalorien;  	if (rezept.portionen > 0) portionen = rezept.portionen;  	$('#actionListRezept').append('<li>Wertung<span class="ui-li-aside">'+wertung+'</span></li>');	$('#actionListRezept').append('<li>Schwierigkeit<span class="ui-li-aside">'+schwierigkeit+'</span></li>');	$('#actionListRezept').append('<li>Portionen<span class="ui-li-aside">' + portionen + '</span></li>');	$('#actionListRezept').append('<li>Kalorien pro Person<span class="ui-li-aside">' + kalorien + '</span></li>');	$('#actionListRezept').listview('refresh');}function displayRezeptAnleitung(data) {	var rezept = data.item, temp_heissluft = "", temp_ouhitze = "", backzeit_heissluft = "", backzeit_ouhitze = "";	var id = $.getUrlVar('id');	$('.titelRezept').text(rezept.titel);	if (rezept.temp_ouhitze > 0) temp_ouhitze = rezept.temp_ouhitze;  	if (rezept.backzeit_ouhitze > 0) backzeit_ouhitze = rezept.backzeit_ouhitze+" min";  	if (rezept.temp_heissluft > 0) temp_heissluft = rezept.temp_heissluft;  	if (rezept.backzeit_heissluft > 0) backzeit_heissluft = rezept.backzeit_heissluft+" min";  	if (rezept.anweisung1) $('#actionListAnleitung').append('<li><h4>'+rezept.anweisung1+'</h4><p style="white-space: normal;">' + rezept.text1 + '</p></li>');	if (rezept.anweisung2) $('#actionListAnleitung').append('<li><h4>'+rezept.anweisung2+'</h4><p style="white-space: normal;">' + rezept.text2 + '</p></li>');	if (rezept.anweisung3) $('#actionListAnleitung').append('<li><h4>'+rezept.anweisung3+'</h4><p style="white-space: normal;">' + rezept.text3 + '</p></li>');		$('#actionListAnleitung').append('<li data-role="list-divider" >Ober/Unterhitze</li>');	$('#actionListAnleitung').append('<li>Temperatur<span class="ui-li-aside">' + temp_ouhitze + '</span></li>');	$('#actionListAnleitung').append('<li>Backzeit<span class="ui-li-aside">' + backzeit_ouhitze + '</span></li>');	$('#actionListAnleitung').listview('refresh');	$('#actionListAnleitung').append('<li data-role="list-divider" >Umluft</li>');	$('#actionListAnleitung').append('<li>Temperatur<span class="ui-li-aside">' + temp_heissluft + '</span></li>');	$('#actionListAnleitung').append('<li>Backzeit<span class="ui-li-aside">' + backzeit_heissluft + '</span></li>');	$('#actionListAnleitung').listview('refresh');}function displayRezeptZutaten(data) {	var einheit = "", anzahl = "", zutat = "";	var id = $.getUrlVar('id');	//$('#tabelleZutaten tr').remove();			$.getJSON(serviceURL + 'mobile/rezepte-detail-zutaten.php?id='+id, function(json) {		$.each(json.items, function(i,val) {			if (i == 0) {				$('.titelRezept').text(val.titel);			}						if (val.einheit) einheit = val.einheit;  			if (val.anzahl) anzahl = val.anzahl;  			if (val.zutat) zutat = val.zutat;  					$('#tabelleZutaten tbody').append('<tr><td class="tabelleAnzahl">'+anzahl+'</td><td class="tabelleEinheit">'+einheit+'</td><td><b>'+zutat+'</b></td></tr>');			//$("#tabelleZutaten").table('refresh');		});	});}