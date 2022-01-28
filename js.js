$(function () {
	if (typeof(asd_fav_afterload)!='undefined' && asd_fav_afterload == 'Y') {
		/*asd_fav_afterload = 'N';*/
		var asd_fav_IDs = new Array();
			$('.asd_'+sButton+'_button').each(function (index, value) {
				asd_fav_IDs.push($(this).data('id'));
		});
		//console.log(asd_fav_IDs);

		$.get('/bitrix/tools/asd_favorite.php', {
			id : asd_fav_IDs,
			action : 'getlike',
			type : sType
		},
		function(data){
			for(i in data.ELEMENTS) {
				$('#asd_count_' + i).html(data.ELEMENTS[i].COUNT);
				if (data.ELEMENTS[i].FAVED) {
					$('#asd_fav_' + i).addClass('asd_'+sButton+'ed');
					$('#asd_fav_' + i).addClass('is-added');
					$('#asd_fav_' + i).attr('title', sTitleDelFav);
				}
				sSessId = data.OPTIONS.SESSID;
				bGuest = data.OPTIONS.BGUEST;
			}
});
	}


	$('.asd_' + sButton + '_button').on('click',function(){
		var id = $(this).attr('id').substr(8);
		var curBtn = $(this);

            this.obPopupWin = BX.PopupWindowManager.create('CatalogaddFavorit_' + id, null, {
                autoHide: true,
                offsetLeft: 0,
                offsetTop: 0,
                overlay : false,
                closeByEsc: true,
                titleBar: true,
                closeIcon: true,
                contentColor: 'white'
            });
            strContent = '<div style="width: 100%; margin: 0; text-align: center;">'
				+ ($(this).hasClass('asd_'+sButton +'ed')? BX.message('MESS_REMOVE_FAFORIT') :BX.message('MESS_ADD_FAFORIT') )
                        + '</div>';

            this.obPopupWin.setContent(strContent);
            this.obPopupWin.show();
			setTimeout("$('#CatalogaddFavorit_" + id +" .popup-window-close-icon').click()", 1000);

		if ($(this).hasClass('asd_'+sButton +'ed')) {

			$.get('/bitrix/tools/asd_favorite.php', {
				id : id,
				action : 'unlike',
				sessid : sSessId,
				type : sType,
				key : $(this).attr('data-skey')
			}, function(data) {
				$(curBtn).removeClass('asd_'+sButton+'ed');
				$(curBtn).removeClass('is-added');
				$(curBtn).attr('title', sTitleAddFav);
				$('#asd_count_'+id).html(data.COUNT);
			});
		}
		else
		{
			$.get('/bitrix/tools/asd_favorite.php', {
				id : id,
				action : 'like',
				sessid : sSessId,
				type : sType,
				key : $(this).attr('data-skey')
			}, function(data) {
				$(curBtn).addClass('asd_'+sButton+'ed');
				$(curBtn).addClass('is-added');
				$(curBtn).attr('title', sTitleDelFav);
			});
		}
	});
});
