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
				compteur = 0;
				verificationGagne(1,1,1);
				
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
	console.log('check rang '+rangId+' - zone '+zoneId+' (position '+positionRecherche+')');
	
	var changePosition = false;
	
	if(compteur >= 4){
		console.log(j+' à Gagné !')
		$('.infos .'+j).addClass('gagne');
		return false;
	}
	
	if((zoneId <= 6) && (rangId <= 7) && (positionRecherche <= 2)){
		/* verifie si p4[rangId][zoneId] existe et p4[rangId][zoneId] == pion joeur */
		if((rangId in p4) && (zoneId in p4[rangId]) && (p4[rangId][zoneId] == j)){
			console.log('+1');
			compteur++;
		}else{
			console.log('0');
			compteur = 0;
		}
	
		/* case du dessous (row +1) */
		if(positionRecherche == 1){
			if(zoneId >= 6){
				if(rangId >= 7){
					positionRecherche++;
					rangId = 1;
				}else{
					rangId++;
				}
				zoneId = 1;

			}else{
				zoneId++;
			}
		/* case de droite (column +1) */
		}else if(positionRecherche == 2){
			if(rangId >=7){
				if(zoneId >= 6){
					positionRecherche++;
					zoneId = 1;
				}else{
					zoneId++
				}
				rangId = 1;
			}else{
				rangId++;
			}
		}
		
		verificationGagne(rangId,zoneId,positionRecherche);
	}
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