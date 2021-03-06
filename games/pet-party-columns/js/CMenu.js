function CMenu(){
    var _oBg;
    var _oButPlay;
    var _oAudioToggle;
    var _oFade;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');

        _oButPlay = new CTextButton((CANVAS_WIDTH/2),CANVAS_HEIGHT-100,oSprite,TEXT_PLAY,"Arial","#ffffff",40);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle = new CToggle(CANVAS_WIDTH - (oSprite.width/4),10+ (oSprite.height/2),s_oSpriteLibrary.getSprite('audio_icon'));
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(_oAudioToggle){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        s_oStage.removeChild(_oBg);
        _oBg = null;
    };
    
    this._onButPlayRelease = function(){
        this.unload();
        s_oMain.gotoGame();
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
    
    this._init();
}