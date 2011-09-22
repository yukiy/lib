function random (nInt1, nInt2) {
	if (typeof (nInt2) != "number") { 
		nInt2 = 1; 
	} 
	var nMax = Math.max(nInt1, nInt2); 
	var nMin = Math.min(nInt1, nInt2); 
	var nRandomInt = Math.floor(Math.random()*(nMax-nMin+1))+nMin; 
	return nRandomInt; 
}
