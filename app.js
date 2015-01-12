function updateShowHideText()
{
	if($("#collapseOne").hasClass('in')){
		document.getElementById("btnShowHide").innerHTML = "Show";
	}
	else{
		document.getElementById("btnShowHide").innerHTML = "Hide";
	}
}