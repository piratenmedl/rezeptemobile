$(document).on('pageshow', '#rezeptDetailBild', function(event) {
	
	var id = $.getUrlVar('id');
	$(this).css('background', '#FFF');//`this` refers to `#pageDetail`
	
	$("#bildRezept1").attr("src", serviceURL+"images/rezepte/"+id+"_img_big.jpg");
	$("#linkZutat1").attr("href", "rezept-details-zutaten.html?id="+id);
	$("#linkAnleitung1").attr("href", "rezept-details-anleitung.html?id="+id);

	$.getJSON(serviceURL + 'mobile/rezept-detail.php?id='+id, displayRezept);

});

$(document).on('pageshow', '#rezeptDetailAnleitung', function(event) {
	
	var id = $.getUrlVar('id');
	$(this).css('background', '#FFF');
	
	$("#bildRezeptKlein3").attr("src", serviceURL+"images/rezepte/" + id + "_img_small.jpg");
	$("#linkBild3").attr("href", "rezept-details-bild.html?id="+id);
	$("#linkZutat3").attr("href", "rezept-details-zutaten.html?id="+id);

	$.getJSON(serviceURL + 'mobile/rezept-detail-anleitung.php?id='+id, displayRezeptAnleitung);

});

$(document).on('pageshow', '#rezeptDetailZutaten', function(event) {
	
	var id = $.getUrlVar('id');
	$(this).css('background', '#FFF');//`this` refers to `#pageDetail`
	
	$("#bildRezeptKlein2").attr("src", serviceURL+"images/rezepte/" + id + "_img_small.jpg");
	$("#linkBild2").attr("href", "rezept-details-bild.html?id="+id);
	//$("#linkZutat2").attr("href", "rezept-details-zutaten.html?id="+id);
	$("#linkAnleitung2").attr("href", "rezept-details-anleitung.html?id="+id);

	displayRezeptZutaten();

});

function displayRezept(data) {
	var rezept = data.item, wertung = "", schwierigkeit = "", kalorien = "", portionen = "";
	
	var id = $.getUrlVar('id');
	
	$('#titel1').html(rezept.titel);
	$('#utitel1').html(rezept.untertitel);

	if (rezept.wertung > 0) wertung = '<img src="icons/sterne/stern' + rezept.wertung + 'schwarz.png" alt="wertung" width="55" height="10">';  
	if (rezept.schwierigkeit > 0) schwierigkeit = '<img src="icons/sterne/stern' + rezept.schwierigkeit + 'schwarz.png" alt="schwierigkeit" width="55" height="10">';  
	if (rezept.kalorien > 0) kalorien = rezept.kalorien;  
	if (rezept.portionen > 0) portionen = rezept.portionen;  
	if (rezept.quelle > "") quelle = rezept.quelle;  
	if (rezept.wertung > 0) $('#actionListRezept').append('<li>Wertung<span class="ui-li-aside">'+wertung+'</span></li>');
	if (rezept.schwierigkeit > 0) $('#actionListRezept').append('<li>Schwierigkeit<span class="ui-li-aside">'+schwierigkeit+'</span></li>');
	if (rezept.portionen > 0) $('#actionListRezept').append('<li>Portionen<span class="ui-li-aside">' + portionen + '</span></li>');
	if (rezept.kalorien > 0) $('#actionListRezept').append('<li>Kalorien pro Person<span class="ui-li-aside">' + kalorien + '</span></li>');
	if (rezept.quelle > "") $('#actionListRezept').append('<li>Quelle<span class="ui-li-aside">' + quelle + '</span></li>');
	
	$('#actionListRezept').listview('refresh');

}

function displayRezeptAnleitung(data) {
	var rezept = data.item, temp_heissluft = "", temp_ouhitze = "", backzeit_heissluft = "", backzeit_ouhitze = "", zeit = "";
	var id = $.getUrlVar('id');
	
	$('#titel3').html(rezept.titel);
	$('#utitel3').html(rezept.untertitel);

	if (rezept.temp_ouhitze > 0) temp_ouhitze = rezept.temp_ouhitze;  
	if (rezept.backzeit_ouhitze > 0) backzeit_ouhitze = rezept.backzeit_ouhitze+" min";  
	if (rezept.temp_heissluft > 0) temp_heissluft = rezept.temp_heissluft;  
	if (rezept.backzeit_heissluft > 0) backzeit_heissluft = rezept.backzeit_heissluft+" min";  
	if (rezept.zeit > 0) zeit = rezept.zeit+" min";  
	
	if (rezept.anweisung1) $('#actionListAnleitung').append('<li><h4>'+rezept.anweisung1+'</h4><p style="white-space: normal;">' + rezept.text1 + '</p></li>');
	if (rezept.anweisung2) $('#actionListAnleitung').append('<li><h4>'+rezept.anweisung2+'</h4><p style="white-space: normal;">' + rezept.text2 + '</p></li>');
	if (rezept.anweisung3) $('#actionListAnleitung').append('<li><h4>'+rezept.anweisung3+'</h4><p style="white-space: normal;">' + rezept.text3 + '</p></li>');
	
	if (zeit > "") { 
		$('#actionListAnleitung').append('<li data-role="list-divider" ></li>');
		$('#actionListAnleitung').append('<li>Zubereitungszeit<span class="ui-li-aside">' + zeit + '</span></li>');
	}

	if (temp_ouhitze > "" || backzeit_ouhitze > "") { 
		$('#actionListAnleitung').append('<li data-role="list-divider" >Ober/Unterhitze</li>');
		if (temp_ouhitze > "") $('#actionListAnleitung').append('<li>Temperatur<span class="ui-li-aside">' + temp_ouhitze + '</span></li>');
		if (backzeit_ouhitze > "") $('#actionListAnleitung').append('<li>Backzeit<span class="ui-li-aside">' + backzeit_ouhitze + '</span></li>');
	}

	if (temp_heissluft > "" || backzeit_heissluft > "") { 
		$('#actionListAnleitung').append('<li data-role="list-divider" >Umluft</li>');
		if (temp_heissluft > "") $('#actionListAnleitung').append('<li>Temperatur<span class="ui-li-aside">' + temp_heissluft + '</span></li>');
		if (backzeit_heissluft > "") $('#actionListAnleitung').append('<li>Backzeit<span class="ui-li-aside">' + backzeit_heissluft + '</span></li>');
	}
	
	$('#actionListAnleitung').listview('refresh');

}

function displayRezeptZutaten(data) {
	var einheit = "", anzahl = "", zutat = "";
	var id = $.getUrlVar('id');
	//$('#tabelleZutaten tr').remove();
	
	$.getJSON(serviceURL + 'mobile/rezepte-detail-zutaten.php?id='+id, function(json) {
		var i = 0;
		$.each(json.items, function(i,val) {
			
			if (i == 0) {
				$('#titel2').html(val.titel);
				$('#utitel2').html(val.untertitel);
			}
			
			if (val.einheit) einheit = val.einheit;  
			if (val.anzahl) anzahl = val.anzahl;  
			if (val.zutat) zutat = val.zutat;  
		
			if ((zutat == "..." || zutat == "---") && i > 0 ) $('#actionListZutat').append('<li data-role="list-divider" ></li>');
			if (zutat != "..." || zutat != "---" ) $('#actionListZutat').append('<li data-role="fieldcontain"><label class="ui-input-text" >'+anzahl+' '+einheit+'</label><h2 class="ui-li-heading">' + zutat + '</h2></li>');
//$('#tabelleZutaten tbody').append('<tr><td class="tabelleAnzahl" style="padding:2px 2px 2px 10px">'+anzahl+' '+einheit+'</td>'+
			//'<td class="tabelleEinheit">'+einheit+'</td>'+
			//'<td><b>'+zutat+'</b></td></tr>');
			//$("#tabelleZutaten").table('refresh');
			i++;
		});
	});
}