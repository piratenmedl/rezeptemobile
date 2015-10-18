var serviceURL = "http://www.bealisa.com/rezepte/";

$(document).on('pageshow', '#home', function(event) {
   
   if (localStorage.getItem("rezeptSearch")> "") { x = localStorage.getItem("rezeptSearch"); } else { x = ""; }
   $("#filter-for-listview").val(x);

	/*$('#rezeptListe').append('<li style="background-color:#ffffff;background-image:none" ><a href="rezept-details-bild.html?id=13">' +
			'<img src="'+serviceURL+'images/rezepte/13_img_small.jpg" class="ui-li-thumb" />' +
			'<h4>Rezept</h4>' +
			'<p>Kategorie - Unterkategorie</p>' +
			'<p><img src="icons/sterne/stern5schwarz.png" alt="wertung" width="55" height="10" style="padding-top:5px" ></p>' +
			//'<span class="ui-li-aside"><img src="icons/sterne/stern5blau.png" alt="wertung" width="55" height="10"></span>'+
			'</a></li>');
	$("#rezeptListe").listview('refresh');
	*/
	
	getRezepteList();
});

$(document).on('pagebeforehide', '#home', function(event) {
    //var text = $("div.ui-input-search").find("input").val();
    var text = $("#filter-for-listview").val();
	localStorage.setItem("rezepteSearch", text);
	//alert (text);
});

function getRezepteList() {
		
	var wertung = 0, image = "", ukategorie = "";
	$.getJSON(serviceURL + 'mobile/rezepte.php', function(json) {
		
		$('#rezeptListe li').remove();
        $.each(json.items, function(i,val) {
			
			if (val.wertung > 0) wertung = '<p><img src="icons/sterne/stern' + val.wertung + 'schwarz.png" alt="wertung" width="55" height="10"></p>';
			else wertung = "";  
				
			if (val.ukategorie) ukategorie = ' - ' + val.ukategorie;
			else ukategorie = "";  
			
			var imgsrc = 'icons/sterne/stern' + val.wertung + 'schwarz.png';
			var imgcheck = imgsrc.width;
			if (imgcheck == 0) { image = ""; }
			else image = '<img src="'+serviceURL+'images/rezepte/' + val.nr_rez + '_img_small.jpg" class="ui-li-thumb"/>';
	
			$('#rezeptListe').append('<li style="background-color:#ffffff;background-image:none" ><a href="rezept-details-bild.html?id=' + val.nr_rez + '">' +
					image +
					'<h1>' + val.titel + '</h1>' +
					'<h3>' + val.untertitel + '</h3>' +
					'<p>' + val.kategorie + ukategorie + '</p>' + wertung +
					'</a></li>');
		});
        
		//$('#error').html("success"); 
	})
	.success(function() { })
	.error(function() { $('#error').html("error"); })
	.complete(function() { /*$('#error').html("complete");*/ $("#rezeptListe").listview('refresh'); });
}