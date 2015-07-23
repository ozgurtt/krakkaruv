function CNumButton(iX, iY, iNum){
    
    var _bDigitFirst;
    
    var _iNum;
    
    var _oParent;
    var _oBg;
    var _oNum;
    var _oButContainer;
    var _oCounter;
    var _oCounterPos;
    
    this._init = function(iX, iY, iNum){
        
        _bDigitFirst = false;
        
        _iNum = iNum;
        
        _oButContainer = new createjs.Container();
        _oButContainer.x = iX;
        _oButContainer.y = iY;
        s_oStage.addChild(_oButContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_num');
        _oBg = createBitmap(oSprite);
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;
        _oBg.regX = iWidth/2;
        _oBg.regY = iHeight/2;
          
        _oNum = new createjs.Text(iNum,"Bold 90px Arial", "#000000");
        _oNum.textAlign = "center";
        _oNum.textBaseline = "middle";
        
        _oButContainer.addChild(_oBg,_oNum);
        
        _oCounterPos = {x: iWidth/3-2, y: -iHeight/3 +5};
        
        this.setCounter(0);
        
        this._initListener();
        
    };
    
    this.unload = function(){
       _oButContainer.off("mousedown");
       _oButContainer.off("pressup");
       
       s_oStage.removeChild(_oButContainer);
    };
    
    this._initListener = function(){

       _oButContainer.on("mousedown", this.buttonDown);
       _oButContainer.on("pressup" , this.buttonRelease);      
    };    
    
    this.buttonRelease = function(){
        _oButContainer.scaleX = 1;
        _oButContainer.scaleY = 1;
        if(_bDigitFirst){
            s_oGame.setCurNum(_iNum);
            s_oInterface.setAllBlackColor();
            _oParent.changeNumColor(true);
            
        } else {
            s_oGame.writeNum(_iNum);
        }
        
    };
    
    this.buttonDown = function(){
        _oButContainer.scaleX = 0.9;
        _oButContainer.scaleY = 0.9;
    };
    
    this.changeNumColor = function(bMode){
        if(bMode){
            _oNum.color = "#ff8814";
        }else {
            _oNum.color = "#000000";
        }
        
    };
    
    this.changeMode = function(){
        _bDigitFirst = !_bDigitFirst;
    };
    
    this.setCounter = function(iNum){
        
        _oCounter = new createjs.Text(iNum," 30px Arial", "#000000");
        _oCounter.textAlign = "center";
        _oCounter.textBaseline = "middle";
        _oCounter.x = _oCounterPos.x;
        _oCounter.y = _oCounterPos.y;
        _oButContainer.addChild(_oCounter);
    };  
    
    this.clearCounter = function(){
        _oButContainer.removeChild(_oCounter);
    };
    
    _oParent = this;
    this._init(iX, iY, iNum);
    
};