var serviceURL = "http://www.bealisa.com/rezepte/";

$(document).on('pageinit', '#home', function(event) {
	$('#rezeptListe').append('<li style="background-color:#ffffff;background-image:none" ><a href="rezept-details-bild.html?id=13">' +
			'<img src="'+serviceURL+'images/rezepte/13_img_small.jpg" class="ui-li-thumb" />' +
			'<h4>Rezept</h4>' +
			'<p>Kategorie - Unterkategorie</p>' +
			'<p><img src="icons/sterne/stern5schwarz.png" alt="wertung" width="55" height="10" style="padding-top:5px" ></p>' +
			//'<span class="ui-li-aside"><img src="icons/sterne/stern5blau.png" alt="wertung" width="55" height="10"></span>'+
			'</a></li>');
	$("#rezeptListe").listview('refresh');
	
	getRezepteList();
});

function getRezepteList() {
		
	var wertung;
	$.getJSON(serviceURL + 'mobile/rezepte.php', function(json) {
		$('#rezeptListe li').remove();
        $.each(json.items, function(i,val) {
			
		if (val.wertung > 0) wertung = '<p><img src="icons/sterne/stern' + val.wertung + 'schwarz.png" alt="wertung" width="55" height="10"></p>';
		else wertung = "";  
			
		if (val.ukategorie) ukategorie = ' - ' + val.ukategorie;
		else ukategorie = "";  
		
		var imgsrc = 'icons/sterne/stern' + val.wertung + 'schwarz.png';
		var imgcheck = imgsrc.width;
		if (imgcheck==0) { }
		else image = '<img src="'+serviceURL+'images/rezepte/' + val.nr_rez + '_img_small.jpg" class="ui-li-thumb"/>';

		$('#rezeptListe').append('<li style="background-color:#ffffff;background-image:none" ><a href="rezept-details-bild.html?id=' + val.nr_rez + '">' +
					image +
					'<h2>' + val.titel + '</h2>' +
					'<p>' + val.kategorie + ukategorie + '</p>' +
					wertung +
					'</a></li>');
            $("#rezeptListe").listview('refresh');
		});
		alert("success");
	})
	.success(function() { alert("second success"); })
	.error(function() { alert("error"); })
	.complete(function() { alert("complete"); });;
}