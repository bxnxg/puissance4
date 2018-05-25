/* Puissance 4 */
var p4 = []; /* ou {} */
var j;
var compteur;

function changeJoueur(){
	if(typeof j === 'undefined'){
		j = 'j1';
	}else{
		if(j == 'j1'){
			j = 'j2';
		}else{
			j = 'j1';
		}
	}
	
	$('.infos >span').removeClass('bold');
	$('.infos .'+j).addClass('bold');
	$('#puissance4').removeClass('j1 j2');
	$('#puissance4').addClass(j);
}

function placePion(zone){
	if(!zone.hasClass('used')){
		var rang = zone.parent();
		$(rang.children().get().reverse()).each(function(){
			if(!$(this).hasClass('used')){
				zone = $(this);
				
				zone.addClass('used');
				zone.addClass(j);
				
				enregistrePosition(rang.data('id'),zone.data('id'));
				
				/* verification démarrage */
				compteur = 1;
				verificationGagne(rang.data('id'),zone.data('id'),7);
				
				changeJoueur();
				return false;
			}
		})
	}
}

function enregistrePosition(rangId,zoneId){
	p4[rangId][zoneId] = j;
	console.log(p4);
}

function verificationGagne(rangId,zoneId,positionRecherche){
	var jj = p4[rangId][zoneId];
	
	if(compteur >= 4){
		console.log(j+' à Gagné !')
		$('.infos .'+j).addClass('gagne');
		return false;
	}
	
	/* case du dessus (row -1) */
	if(positionRecherche == 1){

	/* case du dessous (row +1) */
	}else if(positionRecherche == 5){
		zoneId = zoneId+1;
		if((rangId in p4) && (zoneId in p4[rangId]) && p4[rangId][zoneId]){
			if(p4[rangId][zoneId] == j){
				compteur++;
			}else{
				return false;
			}
		}else{
			return false;
		}
	/* case de gauche (column -1) */
	}else if(positionRecherche == 7){
		rangId = rangId-1;
		if((rangId in p4) && (zoneId in p4[rangId]) && p4[rangId][zoneId]){
			if(p4[rangId][zoneId] == j){
				compteur++;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}

	verificationGagne(rangId,zoneId,positionRecherche);
	
	console.log(p4);
}

$(document).ready(function(){
	/* on récupère un tableau en parcourant les colonnes puis lignes */
	$('#puissance4 .rang').each(function(){
		if($(this).data('id')){
			var rangId = $(this).data('id');
			p4[rangId] = [];
			
			$(this).children().each(function(){
				if($(this).data('id')){
					p4[rangId][$(this).data('id')] = 0;
				}
			});
		}
	});
	console.log(p4);
	
	/* démarrage : par défaut : j1 commence */
	changeJoueur();
	
	/* event : click sur un rond (rang >div) : on remplace place la couleur du joueur */
	$('#puissance4 .rang >div').click(function(){
		var zone = $(this);
		
		placePion(zone);
	});
});