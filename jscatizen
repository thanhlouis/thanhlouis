!function() {
    "use strict";
    class U {
        static get(t, e, i) {
            return i ? Laya.Pool.getItemByCreateFun(t, i) : Laya.Pool.getItemByClass(t, e)
        }
        static put(t, e) {
            e && Laya.Pool.recover(t, e)
        }
    }
    class F {
        constructor() {
            this._urls = [],
            this._reference = 0,
            this._activeTime = 0
        }
        static create(t) {
            let e = U.get(F._sign, F);
            return e.setData(t),
            e
        }
        setData(t) {
            this._urls = t
        }
        destroy() {
            this._urls.forEach(t=>{
                Laya.loader.clearRes(t)
            }
            ),
            this._urls = [],
            this._reference = 0,
            this._activeTime = 0,
            U.put(F._sign, this)
        }
        canDestroy(t) {
            return !(0 < this._reference) && !(t - this._activeTime < 1e5)
        }
        addReference() {
            this._reference += 1,
            this._activeTime = Date.newDate().getTime()
        }
        removeReference() {
            --this._reference
        }
    }
    F._sign = "p_ResInfo";
    class a extends Laya.Animation {
        static registerTimer() {
            Laya.timer.loop(6e4, null, a.checkUnusedRes)
        }
        static checkUnusedRes() {
            if (a._resRef.size) {
                var e, i, s = Date.newDate().getTime();
                let t = a._resRef;
                for ([e,i] of t)
                    i.canDestroy(s) && (i.destroy(),
                    t.delete(e))
            }
        }
        static addResRef(t) {
            let e = a._resRef.get(t);
            e || (e = F.create([t]),
            a._resRef.set(t, e)),
            e.addReference()
        }
        static removeResRef(t) {
            let e = a._resRef.get(t);
            e && e.removeReference()
        }
        static create() {
            return U.get(a._sign, a)
        }
        loadAtlas(t, e=null, i="") {
            return a.addResRef(t),
            this._skin = t,
            super.loadAtlas(t, e, i),
            this
        }
        recover() {
            a.removeResRef(this._skin),
            this.destroyed || (this.clear(),
            this.offAll(),
            this.removeSelf(),
            this._skin = null,
            U.put(a._sign, this))
        }
        destroy(t) {
            a.removeResRef(this._skin),
            super.destroy(t)
        }
    }
    a._resRef = new Map,
    a._sign = "p_Animation",
    a.registerTimer();
    class B extends Laya.UIComponent {
        constructor(t=!1) {
            super(),
            this._autoPlay = !1,
            this._loopCount = 0,
            this._completedLoop = 0,
            this._autoRemove = !1,
            this._noAdjustSize = !1,
            this._baseScaleX = 1,
            this._baseScaleY = 1,
            this._aniScaleX = 1,
            this._aniScaleY = 1,
            this._initBaseScale = !1,
            this._noAdjustSize = t;
            this.ani = new a;
            this.addChild(this.ani)
        }
        get loopCount() {
            return this._loopCount
        }
        set loopCount(t) {
            this._completedLoop = 0,
            this.ani.off(Laya.Event.COMPLETE, this, this.onLoopComplete),
            0 < t && this.ani.on(Laya.Event.COMPLETE, this, this.onLoopComplete),
            this._loopCount = t
        }
        get autoRemove() {
            return this._autoRemove
        }
        set autoRemove(t) {
            this._autoRemove = t
        }
        get autoPlay() {
            return this._autoPlay
        }
        set autoPlay(t) {
            this._autoPlay != t && (this._autoPlay = t,
            (this.ani.autoPlay = t) || (this.ani.graphics = null))
        }
        get isPlaying() {
            return this.ani.isPlaying
        }
        get skin() {
            return this._skin
        }
        set skin(t) {
            this._skin != t && (this._removeAsset(this._skin),
            "" != (this._skin = t) && (this._addAsset(t),
            Laya.loader.loadP(t, null, Laya.Loader.ATLAS, 2).then(()=>{
                this.setAtlas(t)
            }
            )))
        }
        get miniAniScaleX() {
            return this._aniScaleX
        }
        get miniAniScaleY() {
            return this._aniScaleY
        }
        set scaleAniX(t) {
            this._baseScaleX = t,
            this.scaleX = this._aniScaleX * this._baseScaleX
        }
        get scaleAniX() {
            return this._baseScaleX
        }
        set scaleAniY(t) {
            this._baseScaleY = t,
            this.scaleY = this._aniScaleY * this._baseScaleY
        }
        get scaleAniY() {
            return this._baseScaleY
        }
        _addAsset(t) {}
        _removeAsset(t) {}
        setAtlas(e) {
            if (!this.destroyed) {
                var i = Laya.Loader.getRes(e);
                if (i) {
                    let t = 1;
                    for (var s in i.mc) {
                        s = i.mc[s];
                        this.ani.interval = 1e3 / s.frameRate,
                        s.scale && (t = parseFloat(s.scale));
                        break
                    }
                    this._aniScaleX = this._aniScaleY = t,
                    this._initBaseScale || (this._baseScaleX = this.scaleX,
                    this._baseScaleY = this.scaleY,
                    this._initBaseScale = !0),
                    this.scaleAniX = this._baseScaleX,
                    this.scaleAniY = this._baseScaleY,
                    this._noAdjustSize || this.adjustBoundSize(i),
                    this.ani.frames = a.createFrames(e, ""),
                    this.autoPlay || (this.ani.graphics = null),
                    this.event(Laya.Event.LOADED)
                }
            }
        }
        adjustBoundSize(t) {
            let e = 0
              , i = 0;
            for (var s in t.res) {
                s = t.res[s];
                e = Math.max(e, s.w),
                i = Math.max(i, s.h)
            }
            this.width = this.width || e,
            this.height = this.height || i,
            this.ani.x = this.width / 2,
            this.ani.y = this.height / 2
        }
        play(t) {
            this.ani.play(t)
        }
        gotoAndStop(t) {
            this.ani.gotoAndStop(t)
        }
        stop() {
            this.ani.stop(),
            this.ani.graphics = null
        }
        clear() {
            this._skin = "",
            this.ani.clear()
        }
        onLoopComplete() {
            this._completedLoop++,
            0 < this._loopCount && this._completedLoop >= this._loopCount && Laya.timer.callLater(this, ()=>{
                this.stop(),
                this.event(Laya.Event.COMPLETE),
                this._autoRemove && this.removeSelf()
            }
            )
        }
        get animation() {
            return this.ani
        }
        destroy(t=!0) {
            this.scaleX = 1,
            this.scaleY = 1,
            this._aniScaleX = 1,
            this._aniScaleY = 1,
            this._baseScaleX = 1,
            this._baseScaleY = 1,
            this._initBaseScale = !1,
            this.offAll(),
            this.clear(),
            super.destroy(t)
        }
    }
    class G {
        constructor(t) {
            this._downMode = !1,
            this._clicked = !1,
            this.outed = !1,
            this.canceled = !1,
            this.scale = .9,
            this.button = t
        }
        static create(t) {
            return new G(t)
        }
        onEvent(t) {
            let e = t.type;
            e === Laya.Event.MOUSE_DOWN ? this.promise = this.scaleDown().then(()=>{}
            ) : e === Laya.Event.MOUSE_OUT || e === Laya.Event.MOUSE_UP ? (this.outed = !0,
            this.promise && this.promise.then(()=>this.scaleUp())) : e === Laya.Event.CLICK && (this._clicked = !0,
            this.promise && this.promise.then(()=>!this.outed && this.scaleUp()).then(()=>{
                this._clicked = !1,
                this.doClick()
            }
            )),
            this.promise && this.promise.then(()=>{
                if (!this.canceled) {
                    let t = this.button;
                    t.selected || t.setState(Laya.Button.stateMap[e])
                }
            }
            )
        }
        scaleDown() {
            return this.downMode = !0,
            Promise.resolve(void 0)
        }
        scaleUp() {
            return this.downMode = !1,
            Promise.resolve(void 0)
        }
        get downMode() {
            return this._downMode
        }
        set downMode(t) {
            let e = this.button;
            var i, s, a, n, o, r, h;
            e.parent && this._downMode != t && (this._downMode = t,
            e.parent,
            i = e.left,
            s = e.right,
            a = e.top,
            n = e.bottom,
            e.top = e.bottom = e.left = e.right = NaN,
            t ? (this._oldPivotX = e.pivotX,
            this._oldPivotY = e.pivotY,
            t = .5 * e.width,
            h = .5 * e.height,
            o = (t - this._oldPivotX) * e.scaleX,
            r = (h - this._oldPivotY) * e.scaleY,
            e.pivot(t, h),
            e.pos(e.x + o, e.y + r),
            e.set_scaleX(e.scaleX * this.scale),
            e.set_scaleY(e.scaleY * this.scale)) : (e.set_scaleX(e.scaleX / this.scale),
            e.set_scaleY(e.scaleY / this.scale),
            t = (this._oldPivotX - e.pivotX) * e.scaleX,
            h = (this._oldPivotY - e.pivotY) * e.scaleY,
            e.pivot(this._oldPivotX, this._oldPivotY),
            e.pos(e.x + t, e.y + h),
            e.left = i,
            e.right = s,
            e.top = a,
            e.bottom = n))
        }
        cancel() {
            this.downMode && (this._clicked && this.doClick(),
            this.downMode = !1)
        }
        doClick() {
            if (!this.downMode) {
                let t = this.button;
                t.toggle && (t.selected = !t.selected),
                t.clickHandler && t.clickHandler.run()
            }
        }
    }
    class O extends Laya.Button {
        constructor() {
            super(...arguments),
            this._enableAnimating = !0,
            this._reversed = !1,
            this._reverseDirection = O.REVERSE_HORIZONTAL,
            this.enableLongPress = !1
        }
        onAwake() {
            super.onAwake(),
            this.text.wordWrap = !0,
            this.text.x += 15
        }
        get enableAnimating() {
            return this._enableAnimating
        }
        set enableAnimating(t) {
            this._enableAnimating = t
        }
        set image(t) {
            if (this._imageSkin != t) {
                if (!this._image) {
                    let t = this._image = new Laya.Image;
                    t.anchorX = t.anchorY = .5,
                    t.centerX = -0,
                    t.centerY = -8,
                    this.addChild(t)
                }
                this._imageSkin = t,
                this._image.skin = t,
                Laya.timer.callLater(this, this.changeImages)
            }
        }
        get image() {
            return this._imageSkin
        }
        get imageItem() {
            return this._image
        }
        get effectOn() {
            return this._effectOn
        }
        set effectOn(t) {
            this._effectOn != t && (this._effectOn = t,
            Laya.timer.callLater(this, this.updateEffect))
        }
        get effect() {
            return this._effect
        }
        set effect(t) {
            this._effect != t && (this._effect = t,
            Laya.timer.callLater(this, this.updateEffect))
        }
        get effectAutoScale() {
            return this._effectAutoScale
        }
        set effectAutoScale(t) {
            this._effectAutoScale = t
        }
        get effectLayer() {
            return this._effectLayer
        }
        set effectLayer(t) {
            this._effectLayer != t && (this._effectLayer = t,
            Laya.timer.callLater(this, this.updateEffect))
        }
        get reverseDirection() {
            return this._reverseDirection
        }
        set reverseDirection(t) {
            this._reverseDirection != t && (this._reverseDirection = t)
        }
        get reversed() {
            return this._reversed
        }
        set reversed(t) {
            this._reversed != t && (this._reversed = t)
        }
        updateEffect() {
            if (this._effect)
                if (this._effectOn) {
                    var e = this._effectLayer || O.LAYER_BOTTOM;
                    let t = this._effectAni;
                    t || ((t = this._effectAni = new B).centerX = t.centerY = 0,
                    e == O.LAYER_TOP ? this.addChild(t) : e == O.LAYER_BOTTOM && this.addChildAt(t, 0)),
                    t.autoPlay = !0,
                    t.skin != this._effect && (t.skin = this._effect,
                    this._effectAutoScale && t.once(Laya.Event.LOADED, this, ()=>{
                        t.scaleX = this.width / t.width,
                        t.scaleY = this.height / t.height
                    }
                    ))
                } else {
                    let t = this._effectAni;
                    t && (t.autoPlay = !1)
                }
            else
                this._effectAni && (this._effectAni.autoPlay = !1)
        }
        onMouse(t) {
            this.enableAnimating ? !1 === this.toggle && this._selected || (this._mouseClick || (this._mouseClick = G.create(this)),
            t.type !== Laya.Event.MOUSE_DOWN && t.type !== Laya.Event.MOUSE_OVER || this._mouseClick.cancel(),
            this._mouseClick.onEvent(t),
            this.enableLongPress && t.type == Laya.Event.MOUSE_DOWN && t.stopPropagation()) : super.onMouse(t)
        }
        changeImages() {
            if (!this.destroyed) {
                let t = Laya.Loader.getRes(this._imageSkin);
                var e, i, s;
                t && (t.$_GID || (t.$_GID = Laya.Utils.getGID()),
                e = t.$_GID,
                (i = Laya.WeakObject.I.get(e)) ? this._imageSources = i : (this._imageSources = [t],
                i = Laya.Loader.getRes(this.getStateRes(this._imageSkin, "down")),
                s = Laya.Loader.getRes(this.getStateRes(this._imageSkin, "select")),
                i && this._imageSources.push(i),
                s && (i || this._imageSources.push(t),
                this._imageSources.push(s)),
                Laya.WeakObject.I.set(e, this._imageSources)))
            }
        }
        changeClips() {
            if (!this.destroyed && this._skin) {
                let t = Laya.Loader.getRes(this._skin);
                var e, i, s, a, n;
                t && (e = t.sourceWidth,
                i = t.sourceHeight,
                t.$_GID || (t.$_GID = Laya.Utils.getGID()),
                s = t.$_GID,
                (a = Laya.WeakObject.I.get(s)) ? this._sources = a : (this._sources = [t],
                a = Laya.Loader.getRes(this.getStateRes(this._skin, "down")),
                n = Laya.Loader.getRes(this.getStateRes(this._skin, "select")),
                a && this._sources.push(a),
                n && (a || this._sources.push(t),
                this._sources.push(n)),
                Laya.WeakObject.I.set(s, this._sources)),
                this._autoSize ? (this._bitmap.width = this.width || e,
                this._bitmap.height = this.height || i,
                this._text && (this._text.width = this._bitmap.width - 30,
                this._text.height = this._bitmap.height)) : this._text && (this._text.x = e))
            }
        }
        setState(t) {
            this.state = t
        }
        changeState() {
            var t;
            this.destroyed || (this._stateChanged = !1,
            this.runCallLater(this.changeClips),
            this._sources && (t = this._sources.length,
            t = this._state < t ? this._state : t - 1,
            t = this._sources[t],
            this._bitmap.source = t),
            this.runCallLater(this.changeImages),
            this._imageSources && this._image && (t = this._imageSources.length,
            t = this._state < t ? this._state : t - 1,
            t = this._imageSources[t],
            this._image.source = t),
            this.label && this._sources && (t = this._sources.length,
            t = this._state < t ? this._state : t - 1,
            this._text.color = this._labelColors[t],
            this._strokeColors && (this._text.strokeColor = this._strokeColors[t])))
        }
        getStateRes(t, e) {
            var i = t.lastIndexOf(".");
            return i < 0 ? t : t.substr(0, i) + "$" + e + t.substr(i)
        }
        destroy(t=!0) {
            Laya.timer.clearAll(this),
            super.destroy(t)
        }
    }
    O.REVERSE_HORIZONTAL = "horizontal",
    O.REVERSE_VERTICAL = "vertical",
    O.LAYER_TOP = "top",
    O.LAYER_BOTTOM = "bottom";
    class q extends Laya.CheckBox {
    }
    class H extends Laya.ComboBox {
    }
    class V extends Laya.HBox {
        constructor() {
            super(),
            this.filterVisible = !1,
            this.enable = !0,
            this.filterHandler = new Laya.Handler(this,this._defaultFilter)
        }
        sortItem(t) {
            this.sortHandler && this.sortHandler.runWith([t])
        }
        _defaultFilter(t) {
            return !!t && !(this.filterVisible && !t.visible)
        }
        changeItems() {
            if (this.enable) {
                this._itemChanged = !1;
                let i = []
                  , s = 0;
                for (let t = 0, e = this.numChildren; t < e; t++) {
                    var n = this.getChildAt(t);
                    this.filterHandler.runWith(n) && (i.push(n),
                    s = this.height || Math.max(s, n.height * n.scaleY))
                }
                this.sortItem(i);
                let a = 0;
                for (let e = 0, t = i.length; e < t; e++) {
                    let t = i[e];
                    t.x = a,
                    a += t.width * t.scaleX + this._space,
                    this._align == V.TOP ? t.y = 0 : this._align == V.MIDDLE ? t.y = .5 * (s - t.height * t.scaleY) : this._align == V.BOTTOM && (t.y = s - t.height * t.scaleY)
                }
                this.event(Laya.Event.RESIZE),
                this.onCompResize()
            }
        }
        get contentWidth() {
            return this.measureWidth
        }
        get contentHeight() {
            return this.measureHeight
        }
        commitMeasure() {
            super.commitMeasure(),
            this.runCallLater(this.changeItems)
        }
    }
    class W extends Laya.VBox {
        constructor() {
            super(),
            this.filterVisible = !1,
            this.enable = !0,
            this.filterHandler = new Laya.Handler(this,this._defaultFilter)
        }
        sortItem(t) {
            this.sortHandler && this.sortHandler.runWith([t])
        }
        _defaultFilter(t) {
            return !!t && !(this.filterVisible && !t.visible)
        }
        changeItems() {
            if (this.enable) {
                this._itemChanged = !1;
                let i = []
                  , s = 0;
                for (let t = 0, e = this.numChildren; t < e; t++) {
                    var a = this.getChildAt(t);
                    this.filterHandler.runWith(a) && (i.push(a),
                    s = this.width || Math.max(s, a.width * a.scaleX))
                }
                this.sortItem(i);
                var n = 0;
                for (let e = 0, t = i.length; e < t; e++) {
                    let t = i[e];
                    t.y = n,
                    n += t.height * t.scaleY + this._space,
                    this._align == W.LEFT ? t.x = 0 : this._align == W.CENTER ? t.x = .5 * (s - t.width * t.scaleX) : this._align == W.RIGHT && (t.x = s - t.width * t.scaleX)
                }
                this.event(Laya.Event.RESIZE),
                this.onCompResize()
            }
        }
        get contentWidth() {
            return this.measureWidth
        }
        get contentHeight() {
            return this.measureHeight
        }
        commitMeasure() {
            super.commitMeasure(),
            this.runCallLater(this.changeItems)
        }
    }
    function Y(s) {
        for (var e in s.on(Laya.Event.CLICK, s, (e,i)=>{
            var s = i.target.name;
            if (s) {
                let t = e["onClick" + s];
                t && t.call(e, i)
            }
        }
        , [s]),
        s)
            if (s.hasOwnProperty(e)) {
                if (e.includes("m_chb_")) {
                    let t = s[e];
                    var i = e.replace("m_chb_", "")
                      , i = s["onSelect" + i];
                    i && (t.clickHandler = Laya.Handler.create(s, i, [t], !1))
                }
                if (e.includes("m_cob_")) {
                    let t = s[e];
                    var i = e.replace("m_cob_", "")
                      , a = s["onSelect" + i];
                    a && (t.selectHandler = Laya.Handler.create(s, a, null, !1))
                }
                if (e.includes("m_lst_")) {
                    let t = s[e];
                    a = e.replace("m_lst_", "");
                    let i = s["onSelect" + a];
                    i && (t.selectHandler = Laya.Handler.create(s, i, null, !1)),
                    t.renderHandler = Laya.Handler.create(s, (t,e)=>{
                        t.dataChanged && t.dataChanged(e)
                    }
                    , null, !1),
                    (i = s["onClick" + a]) && (t.mouseHandler = Laya.Handler.create(s, (t,e)=>{
                        t.type == Laya.Event.CLICK && i && i.apply(s, [t, e])
                    }
                    , null, !1)),
                    t.scrollBar && (t.scrollBar.elasticDistance = 100,
                    t.scrollBar.elasticBackTime = 200,
                    t.scrollBar.hide = !0)
                }
                if (e.includes("m_sli_")) {
                    let t = s[e];
                    var n = e.replace("m_sli_", "")
                      , n = s["onChange" + n];
                    n && (t.changeHandler = Laya.Handler.create(s, n, null, !1))
                }
                if (e.includes("m_rg_")) {
                    let t = s[e];
                    var n = e.replace("m_rg_", "")
                      , o = s["onSelect" + n];
                    o && (t.selectHandler = Laya.Handler.create(s, o, null, !1))
                }
                if (e.includes("m_tab_")) {
                    let t = s[e];
                    var o = e.replace("m_tab_", "")
                      , r = s["onSelect" + o];
                    r && (t.selectHandler = Laya.Handler.create(s, r, null, !1))
                }
                if (e.includes("m_pan_")) {
                    let t = s[e];
                    t.vScrollBar && (t.vScrollBar.elasticDistance = 100,
                    t.vScrollBar.elasticBackTime = 200,
                    t.vScrollBar.hide = !0),
                    t.hScrollBar && (t.hScrollBar.elasticDistance = 100,
                    t.hScrollBar.elasticBackTime = 200,
                    t.hScrollBar.hide = !0)
                }
            }
    }
    function X(e) {
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                if (i.includes("m_chb_")) {
                    let t = e[i];
                    t.clickHandler && (t.clickHandler.recover(),
                    t.clickHandler = null)
                }
                if (i.includes("m_cob_")) {
                    let t = e[i];
                    t.selectHandler && (t.selectHandler.recover(),
                    t.selectHandler = null)
                }
                if (i.includes("m_lst_")) {
                    let t = e[i];
                    t.renderHandler && (t.renderHandler.recover(),
                    t.renderHandler = null),
                    t.selectHandler && (t.selectHandler.recover(),
                    t.selectHandler = null),
                    t.mouseHandler && (t.mouseHandler.recover(),
                    t.mouseHandler = null)
                }
                if (i.includes("m_sli_")) {
                    let t = e[i];
                    t.changeHandler && (t.changeHandler.recover(),
                    t.changeHandler = null)
                }
                if (i.includes("m_rg_")) {
                    let t = e[i];
                    t.selectHandler && (t.selectHandler.recover(),
                    t.selectHandler = null)
                }
                if (i.includes("m_tab_")) {
                    let t = e[i];
                    t.selectHandler && (t.selectHandler.recover(),
                    t.selectHandler = null)
                }
            }
    }
    let $ = new Laya.EventDispatcher;
    class K extends Laya.Scene {
        onAwake() {
            super.onAwake(),
            this.registerModelEvents(!0),
            Y(this)
        }
        onDestroy() {
            super.onDestroy(),
            this.registerModelEvents(!1),
            X(this)
        }
        registerModelEvents(e) {
            this._modelEvents && this._modelEvents.length && this._modelEvents.forEach(t=>{
                e ? $.on(t.eventType, this, t.handler) : $.off(t.eventType, this, t.handler)
            }
            )
        }
    }
    class z extends Laya.View {
        constructor() {
            super(...arguments),
            this._preFuncs = [],
            this._preUrls = []
        }
        get assetCollector() {
            return this._assetCollector
        }
        set assetCollector(t) {
            this._assetCollector = t
        }
        onAwake() {
            super.onAwake(),
            this.adaptBg(),
            this.registerModelEvents(!0),
            Y(this)
        }
        onDestroy() {
            super.onDestroy(),
            this.registerModelEvents(!1),
            this.cancelLoadRes(),
            Laya.Tween.clearAll(this),
            X(this)
        }
        openView() {
            return new Promise((t,e)=>{
                this.addPreFunc(()=>this.loadViewComplete()),
                this.addPreFunc(()=>this.loadPreRes());
                let i = [];
                this._preFuncs.forEach(t=>i.push(t())),
                Promise.all(i).then(()=>{
                    (this.destroyed ? e : t)()
                }
                ).catch(t=>{
                    console.error(t),
                    e()
                }
                )
            }
            )
        }
        loadP(t, e, i, s, a) {
            return Laya.loader.loadP(t, null, e, i, s, a)
        }
        registerModelEvents(e) {
            this._modelEvents && this._modelEvents.length && this._modelEvents.forEach(t=>{
                e ? $.on(t.eventType, this, t.handler) : $.off(t.eventType, this, t.handler)
            }
            )
        }
        addPreRes(t) {
            Array.isArray(t) ? this._preUrls = t : this._preUrls.push(t)
        }
        addPreFunc(t) {
            this._preFuncs.pushOnce(t)
        }
        loadViewComplete() {
            return this._viewCreated ? Promise.resolve(this) : new Promise((t,e)=>{
                this.once("onViewCreated", this, ()=>t(this))
            }
            )
        }
        loadPreRes() {
            return this._preUrls.length ? new Promise((t,e)=>{
                this.loadP(this._preUrls, null, 0).then(()=>{
                    this._preUrls = null,
                    t()
                }
                )
            }
            ) : Promise.resolve()
        }
        cancelLoadRes() {
            this._preUrls && (Laya.loader.cancelLoadByUrls(this._preUrls),
            this._preUrls = null)
        }
        adaptBg() {
            let t = this.m_img_AdaptBg;
            var e;
            t && (e = Mmobay.Utils.getScreenInfo(),
            t.size(e.stageWidth, e.stageHeight),
            t.centerX = t.centerY = 0,
            t.mouseEnabled = !0,
            t.mouseThrough = !1)
        }
    }
    const j = {};
    var c, s, h;
    (e = c = c || {})[e.Fight = 0] = "Fight",
    e[e.Main = 1] = "Main",
    e[e.Secondary = 2] = "Secondary",
    e[e.Fixui = 3] = "Fixui",
    e[e.Popup = 4] = "Popup",
    e[e.Effect = 5] = "Effect",
    e[e.Toast = 6] = "Toast",
    e[e.Loading = 7] = "Loading",
    e[e.System = 8] = "System",
    (e = s = s || {})[e.Yes = 1] = "Yes",
    e[e.No = 2] = "No",
    e[e.YesNo = 3] = "YesNo",
    (e = h = h || {})[e.None = 0] = "None",
    e[e.Yes = 1] = "Yes",
    e[e.No = 2] = "No",
    e[e.Skip = 3] = "Skip";
    class Z extends Laya.UIComponent {
        constructor(t) {
            super(),
            this.size(560, 1120),
            this.centerX = this.centerY = 0,
            this.name = t.name,
            this.zOrder = t.zOrder,
            this.mouseThrough = !0,
            this._layer = t.layer
        }
        get layer() {
            return this._layer
        }
    }
    class n {
        constructor() {
            this._mainDlgs = [],
            this._secondaryDlgs = [],
            this._popupDlgs = []
        }
        static get instance() {
            return n._instance
        }
        static init() {
            let t = [{
                name: "fight",
                layer: c.Fight,
                zOrder: 1100
            }, {
                name: "main",
                layer: c.Main,
                zOrder: 1200
            }, {
                name: "secondary",
                layer: c.Secondary,
                zOrder: 1300
            }, {
                name: "fixui",
                layer: c.Fixui,
                zOrder: 1400
            }, {
                name: "popup",
                layer: c.Popup,
                zOrder: 1500
            }, {
                name: "effect",
                layer: c.Effect,
                zOrder: 1600
            }, {
                name: "toast",
                layer: c.Toast,
                zOrder: 1700
            }, {
                name: "loading",
                layer: c.Loading,
                zOrder: 1800
            }, {
                name: "system",
                layer: c.System,
                zOrder: 1900
            }]
              , e = (t.forEach(t=>{
                var e = new Z(t);
                Laya.stage.addChild(e),
                this._containers[t.layer] = e
            }
            ),
            n._instance = new n);
            e.createMask(),
            e.crateFixui()
        }
        static add2Container(t, e) {
            let i = n._containers[e];
            i && i.addChild(t)
        }
        get fightLayer() {
            return n._containers[c.Fight]
        }
        get mainLayer() {
            return n._containers[c.Main]
        }
        get secondaryLayer() {
            return n._containers[c.Secondary]
        }
        get fixuiLayer() {
            return n._containers[c.Fixui]
        }
        get popupLayer() {
            return n._containers[c.Popup]
        }
        get effectLayer() {
            return n._containers[c.Effect]
        }
        get systemLayer() {
            return n._containers[c.System]
        }
        enableShield(t) {
            if (t) {
                if (!this._boxShield) {
                    let t = this._boxShield = new Laya.Box;
                    t.zOrder = 2e3,
                    t.size(Laya.stage.width, Laya.stage.height),
                    t.centerX = t.centerY = 0,
                    t.mouseEnabled = !0
                }
                Laya.stage.addChild(this._boxShield)
            } else
                this._boxShield && this._boxShield.removeSelf()
        }
        show(e, i=c.Popup, t=j) {
            if (e && !e.destroyed)
                if (i == c.Main)
                    this.add2Main(e, t);
                else if (i == c.Secondary)
                    this.add2Secondary(e, t);
                else if (i == c.Popup)
                    this.add2Popup(e, t);
                else {
                    let t = n._containers[i];
                    t.addChild(e)
                }
        }
        close(e, t=h.None, i) {
            if (e && !e.destroyed) {
                var s = e.parent;
                if (s)
                    "secondary" == s.name ? this.checkSecondary(e) : "popup" == s.name && this.checkPopup(e);
                else {
                    for (let t = 0; t < this._secondaryDlgs.length; t++)
                        if (e == this._secondaryDlgs[t]) {
                            this._secondaryDlgs.splice(t, 1);
                            break
                        }
                    for (let t = 0; t < this._popupDlgs.length; t++)
                        if (e == this._popupDlgs[t]) {
                            this._popupDlgs.splice(t, 1);
                            break
                        }
                }
                e.event(Laya.Event.CLOSE, i ? [t, i] : t),
                e.destroy()
            }
        }
        clearMain() {
            let t = this._mainDlgs;
            t.forEach(t=>{
                t.destroy()
            }
            ),
            this._mainDlgs.length = 0
        }
        add2Main(t, e) {
            let i = this._mainDlgs.pop();
            i && i.destroy(),
            this.mainLayer.addChild(t),
            this._mainDlgs.push(t)
        }
        add2Secondary(t, i) {
            if (t.hitTestPrior = !1,
            i.isInstant) {
                var s = this._secondaryDlgs.length;
                for (let e = 0; e < s; e++) {
                    let t = this._secondaryDlgs[e];
                    if (t instanceof i.cf) {
                        this._secondaryDlgs.splice(e, 1),
                        t.destroy();
                        break
                    }
                }
            }
            if (i.hideCurrent) {
                var e = this._secondaryDlgs.length;
                let t = this._secondaryDlgs[e - 1];
                t && t.removeSelf()
            }
            this.secondaryLayer.addChild(t),
            this._secondaryDlgs.push(t),
            this.mainLayer.removeSelf()
        }
        add2Popup(t, e) {
            if (t.hitTestPrior = !1,
            e.clearPopup)
                this._popupDlgs.forEach(t=>{
                    t.event(Laya.Event.CLOSE, h.None),
                    t.destroy()
                }
                ),
                this._popupDlgs = [];
            else {
                var i = this._popupDlgs.length;
                let t = this._popupDlgs[i - 1];
                e.retainPopup ? t && (t.zOrder = -1) : t && t.removeSelf()
            }
            this.popupLayer.addChild(t),
            this._popupDlgs.push(t),
            t.zOrder = this._popupDlgs.length,
            e.showEffect && Laya.Tween.from(t, {
                alpha: 0,
                scaleX: .8,
                scaleY: .8
            }, 200, Laya.Ease.backOut),
            this._boxMask.visible = !0
        }
        checkSecondary(e) {
            for (let t = 0; t < this._secondaryDlgs.length; t++)
                if (e == this._secondaryDlgs[t]) {
                    this._secondaryDlgs.splice(t, 1);
                    break
                }
            var t = this._secondaryDlgs.length
              , t = this._secondaryDlgs[t - 1];
            t && this.secondaryLayer.addChild(t),
            0 != this._secondaryDlgs.length || this.mainLayer.parent || Laya.stage.addChild(this.mainLayer)
        }
        getCurSecondaryDlg() {
            var t = this._secondaryDlgs.length;
            return this._secondaryDlgs[t - 1] || null
        }
        checkPopup(e) {
            for (let t = 0; t < this._popupDlgs.length; t++)
                if (e == this._popupDlgs[t]) {
                    this._popupDlgs.splice(t, 1);
                    break
                }
            var i = this._popupDlgs.length;
            if (i) {
                let t = this._popupDlgs[i - 1];
                t.zOrder = i,
                this.popupLayer.addChild(t)
            } else
                this._boxMask.visible = !1
        }
        removeTopPopup() {
            var t = this._popupDlgs.length
              , t = this._popupDlgs[t - 1];
            t.closeOnSide && this.close(t)
        }
        removeAllPopup() {
            this._popupDlgs.forEach(t=>{
                t.event(Laya.Event.CLOSE, h.None),
                t.destroy()
            }
            ),
            this._popupDlgs = [],
            this._boxMask.visible = !1
        }
        removeAllsecondary() {
            this._secondaryDlgs.forEach(t=>{
                t.event(Laya.Event.CLOSE, h.None),
                t.destroy()
            }
            ),
            this._secondaryDlgs = [],
            this.checkSecondary(null)
        }
        createMask() {
            let t = new Laya.Box;
            t.size(Laya.stage.width + 2, Laya.stage.height),
            t.bgColor = "#000000",
            t.zOrder = 0,
            t.alpha = .7,
            t.centerX = t.centerY = 0,
            t.visible = !1,
            t.mouseThrough = !1,
            t.mouseEnabled = !0,
            t.on(Laya.Event.CLICK, this, this.removeTopPopup),
            this._boxMask = t,
            this.popupLayer.addChild(t)
        }
        crateFixui() {
            if (!(Mmobay.adaptOffsetHeight <= 0)) {
                let t = .5 * Mmobay.adaptOffsetHeight
                  , e = (t < 80 && (t = 80),
                new Laya.Box)
                  , i = (e.size(560, t),
                e.centerX = 0,
                e.top = -t,
                e.on(Laya.Event.CLICK, this, ()=>{
                    console.log("click top fixui")
                }
                ),
                this.fixuiLayer.addChild(e),
                new Laya.Image("cat/ui_comm/s9_po9.png"))
                  , s = (i.sizeGrid = "1,1,1,1",
                i.left = i.right = 0,
                i.top = i.bottom = -2,
                e.addChild(i),
                new Laya.Image("cat/ui_comm/fix_flower.png"))
                  , a = (s.bottom = 0,
                s.left = 65,
                s.scaleX = -1,
                e.addChild(s),
                new Laya.Image("cat/ui_comm/fix_flower.png"))
                  , n = (a.bottom = 0,
                a.right = 0,
                e.addChild(a),
                new Laya.Box);
                n.size(560, t),
                n.centerX = 0,
                n.bottom = -t,
                n.on(Laya.Event.CLICK, this, ()=>{
                    console.log("click bottom fixui")
                }
                ),
                this.fixuiLayer.addChild(n),
                (i = new Laya.Image("cat/ui_comm/s9_po9.png")).sizeGrid = "1,1,1,1",
                i.left = i.right = 0,
                i.top = i.bottom = -1,
                n.addChild(i),
                (s = new Laya.Image("cat/ui_comm/fix_flower.png")).scaleX = -1,
                s.left = 65,
                s.top = 0,
                n.addChild(s),
                (a = new Laya.Image("cat/ui_comm/fix_flower.png")).top = 0,
                a.right = 0,
                n.addChild(a)
            }
        }
    }
    n._containers = {},
    window.DialogManager = n;
    class J extends Laya.UIComponent {
        constructor(e, t=0, i) {
            super();
            let s = 560
              , a = (0 < Mmobay.adaptOffsetWidth && (s += Mmobay.adaptOffsetWidth),
            this.size(s, 72),
            this.top = 0,
            this.centerX = 0,
            new O("cat/ui_comm/img_public_btn_back.png"));
            if (a.stateNum = 1,
            a.left = 7,
            a.centerY = 0,
            a.name = "Back",
            this.addChild(a),
            !i && e) {
                let t = new Laya.Label(e);
                t.fontSize = 24,
                t.x += 10,
                t.color = "#ffffff",
                t.centerX = t.centerY = 0,
                t.bold = !0,
                t.wordWrap = !0,
                t.width = 390,
                t.align = "center",
                this.addChild(t),
                this._txtInfo = t
            }
            this.mouseThrough = !0
        }
        update(t) {
            this._txtInfo.text = t
        }
    }
    class Q extends z {
        constructor() {
            super(...arguments),
            this.m_closeOnSide = !0
        }
        static get manager() {
            return n.instance
        }
        get closeOnSide() {
            return this.m_closeOnSide
        }
        set closeOnSide(t) {
            this.m_closeOnSide = t
        }
        get title() {
            return this._title
        }
        showDialog(t, e) {
            this.closeOnSide = e.closeOnSide,
            Q.manager.show(this, t, e)
        }
        closeDialog(t=h.No, e) {
            Q.manager.close(this, t, e)
        }
        wait() {
            return new Promise((i,t)=>{
                this.once(Laya.Event.CLOSE, this, (t,e)=>{
                    i({
                        type: t,
                        data: e
                    })
                }
                )
            }
            )
        }
        checkOpen() {
            return !0
        }
        addTitle(t, e, i) {
            this._title || (t = new J(t,!!e,i),
            this._title = t,
            this.addChild(t))
        }
        updateTitle(t) {
            this._title && this._title.update(t)
        }
        onClickClose(t) {
            this.closeDialog()
        }
        onClickBack(t) {
            this.closeDialog()
        }
        onClickHelp(t) {}
    }
    var t, e = z, i = Q, o = Laya.ClassUtils.regClass, r = t = t || {};
    r = (r = r.cat || (r.cat = {})).views || (r.views = {});
    {
        r = r.common || (r.common = {});
        class xs extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/BuyItemDlg")
            }
        }
        r.BuyItemDlgUI = xs,
        o("ui.cat.views.common.BuyItemDlgUI", xs);
        class Ts extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/CommRewardDlg")
            }
        }
        r.CommRewardDlgUI = Ts,
        o("ui.cat.views.common.CommRewardDlgUI", Ts);
        class Ss extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/CountView")
            }
        }
        r.CountViewUI = Ss,
        o("ui.cat.views.common.CountViewUI", Ss);
        class Is extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/FingerView")
            }
        }
        r.FingerViewUI = Is,
        o("ui.cat.views.common.FingerViewUI", Is);
        class Ds extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/FishCoinView")
            }
        }
        r.FishCoinViewUI = Ds,
        o("ui.cat.views.common.FishCoinViewUI", Ds);
        class Ls extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/LoadingView")
            }
        }
        r.LoadingViewUI = Ls,
        o("ui.cat.views.common.LoadingViewUI", Ls);
        class As extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/LvView")
            }
        }
        r.LvViewUI = As,
        o("ui.cat.views.common.LvViewUI", As);
        class Es extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/MsgBox")
            }
        }
        r.MsgBoxUI = Es,
        o("ui.cat.views.common.MsgBoxUI", Es);
        class Rs extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/NewView")
            }
        }
        r.NewViewUI = Rs,
        o("ui.cat.views.common.NewViewUI", Rs);
        class Ms extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/SystemNotice")
            }
        }
        r.SystemNoticeUI = Ms,
        o("ui.cat.views.common.SystemNoticeUI", Ms);
        class Ns extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/ToastView")
            }
        }
        r.ToastViewUI = Ns,
        o("ui.cat.views.common.ToastViewUI", Ns);
        class Ps extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/common/WifiView")
            }
        }
        r.WifiViewUI = Ps,
        o("ui.cat.views.common.WifiViewUI", Ps)
    }
    r = t = t || {};
    r = (r = r.cat || (r.cat = {})).views || (r.views = {});
    {
        r = r.entrance || (r.entrance = {});
        class Us extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/entrance/GameEntrance")
            }
        }
        r.GameEntranceUI = Us,
        o("ui.cat.views.entrance.GameEntranceUI", Us)
    }
    r = t = t || {};
    r = (r = r.cat || (r.cat = {})).views || (r.views = {});
    {
        r = r.fish || (r.fish = {});
        class Fs extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishAutoDlg")
            }
        }
        r.FishAutoDlgUI = Fs,
        o("ui.cat.views.fish.FishAutoDlgUI", Fs);
        class Bs extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishDlg")
            }
        }
        r.FishDlgUI = Bs,
        o("ui.cat.views.fish.FishDlgUI", Bs);
        class Gs extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishHistoryCellView")
            }
        }
        r.FishHistoryCellViewUI = Gs,
        o("ui.cat.views.fish.FishHistoryCellViewUI", Gs);
        class Os extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishItemView")
            }
        }
        r.FishItemViewUI = Os,
        o("ui.cat.views.fish.FishItemViewUI", Os);
        class qs extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishRankCellView")
            }
        }
        r.FishRankCellViewUI = qs,
        o("ui.cat.views.fish.FishRankCellViewUI", qs);
        class Hs extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishRankDlg")
            }
        }
        r.FishRankDlgUI = Hs,
        o("ui.cat.views.fish.FishRankDlgUI", Hs);
        class Vs extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishRewardDetailCellView")
            }
        }
        r.FishRewardDetailCellViewUI = Vs,
        o("ui.cat.views.fish.FishRewardDetailCellViewUI", Vs);
        class Ws extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishRewardDetailDlg")
            }
        }
        r.FishRewardDetailDlgUI = Ws,
        o("ui.cat.views.fish.FishRewardDetailDlgUI", Ws);
        class Ys extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishRewardDlg")
            }
        }
        r.FishRewardDlgUI = Ys,
        o("ui.cat.views.fish.FishRewardDlgUI", Ys);
        class Xs extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishRewardRuleDlg")
            }
        }
        r.FishRewardRuleDlgUI = Xs,
        o("ui.cat.views.fish.FishRewardRuleDlgUI", Xs);
        class $s extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishRuleDlg")
            }
        }
        r.FishRuleDlgUI = $s,
        o("ui.cat.views.fish.FishRuleDlgUI", $s);
        class Ks extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishSkipResultDlg")
            }
        }
        r.FishSkipResultDlgUI = Ks,
        o("ui.cat.views.fish.FishSkipResultDlgUI", Ks);
        class zs extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishSuccDlg")
            }
        }
        r.FishSuccDlgUI = zs,
        o("ui.cat.views.fish.FishSuccDlgUI", zs);
        class js extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/fish/FishUpgradeDlg")
            }
        }
        r.FishUpgradeDlgUI = js,
        o("ui.cat.views.fish.FishUpgradeDlgUI", js)
    }
    r = t = t || {};
    r = (r = r.cat || (r.cat = {})).views || (r.views = {});
    {
        r = r.home || (r.home = {});
        class Zs extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/AirDropGiftTimesView")
            }
        }
        r.AirDropGiftTimesViewUI = Zs,
        o("ui.cat.views.home.AirDropGiftTimesViewUI", Zs);
        class Js extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/AutoDlg")
            }
        }
        r.AutoDlgUI = Js,
        o("ui.cat.views.home.AutoDlgUI", Js);
        class Qs extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/AutoPlusDlg")
            }
        }
        r.AutoPlusDlgUI = Qs,
        o("ui.cat.views.home.AutoPlusDlgUI", Qs);
        class ta extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/ChooseWalletDlg")
            }
        }
        r.ChooseWalletDlgUI = ta,
        o("ui.cat.views.home.ChooseWalletDlgUI", ta);
        class ea extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/FirstRechargeDlg")
            }
        }
        r.FirstRechargeDlgUI = ea,
        o("ui.cat.views.home.FirstRechargeDlgUI", ea);
        class ia extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/NotCoinGiftDlg")
            }
        }
        r.NotCoinGiftDlgUI = ia,
        o("ui.cat.views.home.NotCoinGiftDlgUI", ia);
        class sa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/OffLineDlg")
            }
        }
        r.OffLineDlgUI = sa,
        o("ui.cat.views.home.OffLineDlgUI", sa);
        class aa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/OfficeDlg")
            }
        }
        r.OfficeDlgUI = aa,
        o("ui.cat.views.home.OfficeDlgUI", aa);
        class na extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/PurchaseMethodDlg")
            }
        }
        r.PurchaseMethodDlgUI = na,
        o("ui.cat.views.home.PurchaseMethodDlgUI", na);
        class oa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/RandomEventsDlg")
            }
        }
        r.RandomEventsDlgUI = oa,
        o("ui.cat.views.home.RandomEventsDlgUI", oa);
        class ra extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/ShopCellView")
            }
        }
        r.ShopCellViewUI = ra,
        o("ui.cat.views.home.ShopCellViewUI", ra);
        class ha extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/ShopDlg")
            }
        }
        r.ShopDlgUI = ha,
        o("ui.cat.views.home.ShopDlgUI", ha);
        class la extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/SpeedDlg")
            }
        }
        r.SpeedDlgUI = la,
        o("ui.cat.views.home.SpeedDlgUI", la);
        class ca extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/SumCatView")
            }
        }
        r.SumCatViewUI = ca,
        o("ui.cat.views.home.SumCatViewUI", ca);
        class ma extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/UpGradeDlg")
            }
        }
        r.UpGradeDlgUI = ma,
        o("ui.cat.views.home.UpGradeDlgUI", ma);
        class da extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/home/VkittyGainWayDlg")
            }
        }
        r.VkittyGainWayDlgUI = da,
        o("ui.cat.views.home.VkittyGainWayDlgUI", da)
    }
    r = t = t || {};
    r = (r = r.cat || (r.cat = {})).views || (r.views = {});
    {
        r = r.lunchPool || (r.lunchPool = {});
        class _a extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/AssetCellView")
            }
        }
        r.AssetCellViewUI = _a,
        o("ui.cat.views.lunchPool.AssetCellViewUI", _a);
        class ua extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/AssetsDlg")
            }
        }
        r.AssetsDlgUI = ua,
        o("ui.cat.views.lunchPool.AssetsDlgUI", ua);
        class pa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/BoostMiningDlg")
            }
        }
        r.BoostMiningDlgUI = pa,
        o("ui.cat.views.lunchPool.BoostMiningDlgUI", pa);
        class ga extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/LunchCellView")
            }
        }
        r.LunchCellViewUI = ga,
        o("ui.cat.views.lunchPool.LunchCellViewUI", ga);
        class Ca extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/LunchDetailView")
            }
        }
        r.LunchDetailViewUI = Ca,
        o("ui.cat.views.lunchPool.LunchDetailViewUI", Ca);
        class ya extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/LunchDlg")
            }
        }
        r.LunchDlgUI = ya,
        o("ui.cat.views.lunchPool.LunchDlgUI", ya);
        class ba extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/LunchInfoView")
            }
        }
        r.LunchInfoViewUI = ba,
        o("ui.cat.views.lunchPool.LunchInfoViewUI", ba);
        class va extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/LunchListDlg")
            }
        }
        r.LunchListDlgUI = va,
        o("ui.cat.views.lunchPool.LunchListDlgUI", va);
        class ka extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/StakeCatBackDlg")
            }
        }
        r.StakeCatBackDlgUI = ka,
        o("ui.cat.views.lunchPool.StakeCatBackDlgUI", ka);
        class fa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/StakeCatDlg")
            }
        }
        r.StakeCatDlgUI = fa,
        o("ui.cat.views.lunchPool.StakeCatDlgUI", fa);
        class wa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/StakeFishBackDlg")
            }
        }
        r.StakeFishBackDlgUI = wa,
        o("ui.cat.views.lunchPool.StakeFishBackDlgUI", wa);
        class xa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/lunchPool/StakeFishDlg")
            }
        }
        r.StakeFishDlgUI = xa,
        o("ui.cat.views.lunchPool.StakeFishDlgUI", xa)
    }
    r = t = t || {};
    r = (r = r.cat || (r.cat = {})).views || (r.views = {});
    {
        r = r.recharge || (r.recharge = {});
        class Ta extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/recharge/DailyBackClaimDlg")
            }
        }
        r.DailyBackClaimDlgUI = Ta,
        o("ui.cat.views.recharge.DailyBackClaimDlgUI", Ta);
        class Sa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/recharge/DailyBackGiftDlg")
            }
        }
        r.DailyBackGiftDlgUI = Sa,
        o("ui.cat.views.recharge.DailyBackGiftDlgUI", Sa);
        class Ia extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/recharge/RechargeCellView")
            }
        }
        r.RechargeCellViewUI = Ia,
        o("ui.cat.views.recharge.RechargeCellViewUI", Ia);
        class Da extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/recharge/RechargeDlg")
            }
        }
        r.RechargeDlgUI = Da,
        o("ui.cat.views.recharge.RechargeDlgUI", Da);
        class La extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/recharge/RechargeProcessingDlg")
            }
        }
        r.RechargeProcessingDlgUI = La,
        o("ui.cat.views.recharge.RechargeProcessingDlgUI", La);
        class Aa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/recharge/RechargeSuccessDlg")
            }
        }
        r.RechargeSuccessDlgUI = Aa,
        o("ui.cat.views.recharge.RechargeSuccessDlgUI", Aa)
    }
    r = t = t || {};
    r = (r = r.cat || (r.cat = {})).views || (r.views = {});
    {
        r = r.squad || (r.squad = {});
        class Ea extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/BoostCellView")
            }
        }
        r.BoostCellViewUI = Ea,
        o("ui.cat.views.squad.BoostCellViewUI", Ea);
        class Ra extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/FrenZenDlg")
            }
        }
        r.FrenZenDlgUI = Ra,
        o("ui.cat.views.squad.FrenZenDlgUI", Ra);
        class Ma extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/FrenZoneDlg")
            }
        }
        r.FrenZoneDlgUI = Ma,
        o("ui.cat.views.squad.FrenZoneDlgUI", Ma);
        class Na extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/FriendCellView")
            }
        }
        r.FriendCellViewUI = Na,
        o("ui.cat.views.squad.FriendCellViewUI", Na);
        class Pa extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/FriendInviteCellView")
            }
        }
        r.FriendInviteCellViewUI = Pa,
        o("ui.cat.views.squad.FriendInviteCellViewUI", Pa);
        class Ua extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/HeadView")
            }
        }
        r.HeadViewUI = Ua,
        o("ui.cat.views.squad.HeadViewUI", Ua);
        class Fa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/InviteDetailShowDlg")
            }
        }
        r.InviteDetailShowDlgUI = Fa,
        o("ui.cat.views.squad.InviteDetailShowDlgUI", Fa);
        class Ba extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/InvitePartyKingsDlg")
            }
        }
        r.InvitePartyKingsDlgUI = Ba,
        o("ui.cat.views.squad.InvitePartyKingsDlgUI", Ba);
        class Ga extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/JoinSquadListDlg")
            }
        }
        r.JoinSquadListDlgUI = Ga,
        o("ui.cat.views.squad.JoinSquadListDlgUI", Ga);
        class Oa extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/RankCellView")
            }
        }
        r.RankCellViewUI = Oa,
        o("ui.cat.views.squad.RankCellViewUI", Oa);
        class qa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/SquadBoostDlg")
            }
        }
        r.SquadBoostDlgUI = qa,
        o("ui.cat.views.squad.SquadBoostDlgUI", qa);
        class Ha extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/SquadCellView")
            }
        }
        r.SquadCellViewUI = Ha,
        o("ui.cat.views.squad.SquadCellViewUI", Ha);
        class Va extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/SquadInfoDlg")
            }
        }
        r.SquadInfoDlgUI = Va,
        o("ui.cat.views.squad.SquadInfoDlgUI", Va);
        class Wa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/SquadRankListDlg")
            }
        }
        r.SquadRankListDlgUI = Wa,
        o("ui.cat.views.squad.SquadRankListDlgUI", Wa);
        class Ya extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/TotalScoreDetailDlg")
            }
        }
        r.TotalScoreDetailDlgUI = Ya,
        o("ui.cat.views.squad.TotalScoreDetailDlgUI", Ya);
        class Xa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/squad/TotalScoreShowDlg")
            }
        }
        r.TotalScoreShowDlgUI = Xa,
        o("ui.cat.views.squad.TotalScoreShowDlgUI", Xa)
    }
    r = t = t || {};
    r = (r = r.cat || (r.cat = {})).views || (r.views = {});
    {
        r = r.table || (r.table = {});
        class $a extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/ExitDlg")
            }
        }
        r.ExitDlgUI = $a,
        o("ui.cat.views.table.ExitDlgUI", $a);
        class Ka extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/FinalClaimView")
            }
        }
        r.FinalClaimViewUI = Ka,
        o("ui.cat.views.table.FinalClaimViewUI", Ka);
        class za extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/HelpDlg")
            }
        }
        r.HelpDlgUI = za,
        o("ui.cat.views.table.HelpDlgUI", za);
        class ja extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/HelpOtherDlg")
            }
        }
        r.HelpOtherDlgUI = ja,
        o("ui.cat.views.table.HelpOtherDlgUI", ja);
        class Za extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/NoTimeDlg")
            }
        }
        r.NoTimeDlgUI = Za,
        o("ui.cat.views.table.NoTimeDlgUI", Za);
        class Ja extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/PlayAddTimeDlg")
            }
        }
        r.PlayAddTimeDlgUI = Ja,
        o("ui.cat.views.table.PlayAddTimeDlgUI", Ja);
        class Qa extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/PlayDiamondDlg")
            }
        }
        r.PlayDiamondDlgUI = Qa,
        o("ui.cat.views.table.PlayDiamondDlgUI", Qa);
        class tn extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/PlayDlg")
            }
        }
        r.PlayDlgUI = tn,
        o("ui.cat.views.table.PlayDlgUI", tn);
        class en extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/PlayDoubleDiamondDlg")
            }
        }
        r.PlayDoubleDiamondDlgUI = en,
        o("ui.cat.views.table.PlayDoubleDiamondDlgUI", en);
        class sn extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/PlayMoneyDlg")
            }
        }
        r.PlayMoneyDlgUI = sn,
        o("ui.cat.views.table.PlayMoneyDlgUI", sn);
        class an extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/PlayNewDlg")
            }
        }
        r.PlayNewDlgUI = an,
        o("ui.cat.views.table.PlayNewDlgUI", an);
        class nn extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/SuccessDlg")
            }
        }
        r.SuccessDlgUI = nn,
        o("ui.cat.views.table.SuccessDlgUI", nn);
        class on extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/TableAfterDlg")
            }
        }
        r.TableAfterDlgUI = on,
        o("ui.cat.views.table.TableAfterDlgUI", on);
        class rn extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/TableDlg")
            }
        }
        r.TableDlgUI = rn,
        o("ui.cat.views.table.TableDlgUI", rn);
        class hn extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/TablePreDlg")
            }
        }
        r.TablePreDlgUI = hn,
        o("ui.cat.views.table.TablePreDlgUI", hn);
        class ln extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/TipView")
            }
        }
        r.TipViewUI = ln,
        o("ui.cat.views.table.TipViewUI", ln);
        class cn extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/TurnTableClaimCellView")
            }
        }
        r.TurnTableClaimCellViewUI = cn,
        o("ui.cat.views.table.TurnTableClaimCellViewUI", cn);
        class mn extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/TurnTableHelpCellView")
            }
        }
        r.TurnTableHelpCellViewUI = mn,
        o("ui.cat.views.table.TurnTableHelpCellViewUI", mn);
        class dn extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/TurnTableRecordDlg")
            }
        }
        r.TurnTableRecordDlgUI = dn,
        o("ui.cat.views.table.TurnTableRecordDlgUI", dn);
        class _n extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/TurnTableRuleDlg")
            }
        }
        r.TurnTableRuleDlgUI = _n,
        o("ui.cat.views.table.TurnTableRuleDlgUI", _n);
        class un extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/table/TurnTableSpinCellView")
            }
        }
        r.TurnTableSpinCellViewUI = un,
        o("ui.cat.views.table.TurnTableSpinCellViewUI", un)
    }
    r = t = t || {};
    r = (r = r.cat || (r.cat = {})).views || (r.views = {});
    {
        r = r.task || (r.task = {});
        class pn extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/task/AchievementInviteCellView")
            }
        }
        r.AchievementInviteCellViewUI = pn,
        o("ui.cat.views.task.AchievementInviteCellViewUI", pn);
        class gn extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/task/AchievementOneCellView")
            }
        }
        r.AchievementOneCellViewUI = gn,
        o("ui.cat.views.task.AchievementOneCellViewUI", gn);
        class Cn extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/task/AchievementTypeCellView")
            }
        }
        r.AchievementTypeCellViewUI = Cn,
        o("ui.cat.views.task.AchievementTypeCellViewUI", Cn);
        class yn extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/task/BindTwitterDlg")
            }
        }
        r.BindTwitterDlgUI = yn,
        o("ui.cat.views.task.BindTwitterDlgUI", yn);
        class bn extends i {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/task/TaskMainDlg")
            }
        }
        r.TaskMainDlgUI = bn,
        o("ui.cat.views.task.TaskMainDlgUI", bn);
        class vn extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/task/TaskOneCellView")
            }
        }
        r.TaskOneCellViewUI = vn,
        o("ui.cat.views.task.TaskOneCellViewUI", vn);
        class kn extends e {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                this.loadScene("cat/views/task/TaskTypeCellView")
            }
        }
        r.TaskTypeCellViewUI = kn,
        o("ui.cat.views.task.TaskTypeCellViewUI", kn)
    }
    class y {
    }
    y.GAME_LOCKED = "onGameLockChange",
    y.DATA_LOADED = "onDataLoaded",
    y.ENTER_GAME = "onEnterGame",
    y.NET_DISCONNECTED = "onNetDisconnected",
    y.NET_RECONNECTED = "onNetReconnected",
    y.NET_RESTARTGAME = "onNetRestartGame",
    y.NET_TYPE_CHANGE = "onNetTypeChanged",
    y.REENTER_GAME = "onReEnterGame",
    y.CLUB_UPDATE = "onClubUpdate",
    y.CREATE_VIEW_DONE = "onCreateViewDone",
    y.FISHCOIN_CHANGE = "onFishCoinChange",
    y.COUNT_CHANGE = "onCountChange",
    y.UPDATE_FISH_SYS = "onUpdateFishSys",
    y.DO_CONTINUE_FISH = "onDoContinueFish",
    y.FISHDATA_CHANGE = "onFishDataChange",
    y.MOVE_CAT = "onMoveCat",
    y.CAT_MATCH = "onCatMatch",
    y.SHAKE_CAT = "onShakeCat",
    y.UPDATE_CAT = "onUpdateCat",
    y.MaxCAT_CHANGE = "onMaxCatChange",
    y.UPDATE_ITEM = "onUpdateItem",
    y.BUY_CAT = "onBuyCat",
    y.UPDATE_SPEED = "onUpdateSpeed",
    y.UPDATE_OUTPUT = "onUpdateOutPut",
    y.UPDATE_RECHARGE_RED = "onUpdateRechargeRed",
    y.HOME_GOLD_ANI = "onHomeGoldAni",
    y.OPNE_AIR_DROP = "onOpenAirDrop",
    y.AIR_DROP = "onAirDrop",
    y.RANDOM_EVENT_TIME_CHANGE = "onRandomEventTimeChange",
    y.CHANGE_CHARGE_CHAIN_GIFT = "onChangeChargeChainGift",
    y.WALLET_CONNECTED = "onWalletConnected",
    y.WALLET_DISCONNECT = "onWalletDisconnect",
    y.RECHARGE_SUCCESS = "onRechargeSuccess",
    y.DAY_EVENT_GOODS_CLAIM_SUCCESS = "onDayEventGoodsClaimSuccess",
    y.SPEED_FREE = "onSpeedFree",
    y.UPDATE_LUNCH = "onUpdateLunch",
    y.POOLBONUS = "onPoolBonus",
    y.HELP_TURN_ADD_CHECK = "onHelpTurnAddCheck",
    y.UPDATE_TABLE = "onUpdateTable",
    y.UPDATE_TABLE_TIME = "onUpdateTableTime",
    y.TASK_UPDATE_LIST = "onTaskUpdateList",
    y.TASK_UPDATE_COUNT = "onTaskUpdateCount",
    y.TASK_UPDATE_STATE = "onTaskUpdateState",
    y.TASK_PLAY_SCORE = "onTaskPlayScore",
    y.TASK_UPDATE_ACHIEVEMENT = "onTaskUpdateAchievement",
    y.TASK_AUTO_CHECK = "onTaskAutoCheck",
    y.UPDATE_TWITTER_STATUS = "onUpdateTwitterStatus",
    y.START_CHECK_TWITTER = "onStartCheckTwitter",
    y.UPDATE_MOUSE_MOVE = "onUpdateMouseMove",
    y.OFFLINE_CHANGE = "onOfflineChange";
    class tt {
        constructor(t=0) {
            this._delay = 0,
            this._queue = [],
            this._timerEnabled = !1,
            this._delay = t
        }
        static create(t) {
            t = new tt(t);
            return this._queues.pushOnce(t),
            t
        }
        add(t, e) {
            this._queue.push({
                item: t,
                cb: e
            }),
            this._timerEnabled || (Laya.timer.loop(this._delay, this, this.onTimer),
            this._timerEnabled = !0)
        }
        onTimer() {
            let e = this._queue;
            if (0 < e.length) {
                let t = e.shift();
                t.cb(t.item)
            }
            0 == e.length && (Laya.timer.clear(this, this.onTimer),
            this._timerEnabled = !1)
        }
        remove(e) {
            var t = this._queue.findIndex(t=>t.item == e);
            -1 != t && this._queue.splice(t, 1)
        }
        clear() {
            Laya.timer.clear(this, this.onTimer),
            tt._queues.remove(this),
            this._queue = []
        }
    }
    tt._queues = [];
    const et = {};
    let it = {};
    var l;
    const st = tt.create(1e3);
    let at, nt, ot, rt, ht, lt;
    function ct(t, e, i) {
        let s = new t(...(i || {}).params || []);
        return s.checkOpen() ? (i.cf = t,
        s.centerY = s.centerX = 0,
        -1 == t.name.indexOf("BattleView") && pt(),
        s.openView().then(()=>(gt(),
        s.pivotX = s.width / 2,
        s.pivotY = s.height / 2,
        s.showDialog(e, i),
        s)).catch(()=>(gt(),
        null))) : Promise.reject({
            code: -1,
            message: "功能不可开启"
        })
    }
    function mt(t) {
        t.loadingImpl && (at = t.loadingImpl),
        t.wifiImpl && (nt = t.wifiImpl),
        t.msgBoxImpl && (ot = t.msgBoxImpl),
        t.toastImpl && (rt = t.toastImpl),
        t.verifyPwdImpl && (ht = t.verifyPwdImpl),
        t.opCheckLimit && (lt = t.opCheckLimit),
        t.modelEventsDispatcher && (t = t.modelEventsDispatcher,
        $ = t),
        n.init()
    }
    function m(t, e=j) {
        return null == e.isInstant && (e.isInstant = !0),
        ct(t, c.Secondary, e)
    }
    function d(t, e=j) {
        return null == e.closeOnSide && (e.closeOnSide = !0),
        null == e.showEffect && (e.showEffect = !0),
        ct(t, c.Popup, e)
    }
    function dt(t) {
        n.instance.enableShield(t)
    }
    function _(t, e) {
        let i = new t(...(e || {}).params || []);
        return i.openView().then(()=>(Laya.timer.frameOnce(1, this, ()=>{
            e && e.dispatch && P.event(y.CREATE_VIEW_DONE)
        }
        ),
        i))
    }
    function _t(t, e) {
        e != c.Popup && n.add2Container(t, e)
    }
    function ut(t) {
        return ct(ot, c.Popup, {
            params: [t],
            closeOnSide: !0,
            showEffect: !0,
            clearPopup: t.clearPopup
        }).then(t=>t.wait())
    }
    function u(t) {
        t = [t];
        let e = new rt(...t);
        e.openView().then(()=>{
            e.mouseEnabled = !1,
            e.mouseThrough = !0,
            _t(e, c.Toast)
        }
        )
    }
    function pt() {
        return at.show(),
        ()=>{
            at.reduce()
        }
    }
    function gt() {
        at.clear()
    }
    function Ct() {
        nt && nt.clear()
    }
    class yt {
        constructor() {
            this.finished = !1,
            this.defaultTimeOut = 2e4,
            this.transId = 0,
            this.startTime = 0,
            this._timeOutNum = 0,
            this.timeoutMax = 5
        }
        static create() {
            return U.get(yt._sign, yt)
        }
        get timeout() {
            let t = this.defaultTimeOut;
            var e = this.opt;
            return t = e && e.timeout ? e.timeout : t
        }
        open(t, e, i, s) {
            this.resolve = t,
            this.reject = e,
            this.onClearHandler = i,
            (this.opt = s) && s.noLoading && 0 != s.silent || this.showLoading(),
            Laya.timer.once(this.timeout, this, this.onTimeOut)
        }
        clear() {
            this.startTime = 0,
            Laya.timer.clear(this, this.onTimeOut),
            this.finished = !0,
            this._timeOutNum = 0,
            this.loadingCloser && this.loadingCloser(),
            this.onClearHandler && this.onClearHandler.run(),
            st.remove(this);
            var t = this.opt;
            t && t.noLoading && 0 != t.silent || gt(),
            U.put(yt._sign, this)
        }
        showLoading() {
            pt(),
            st.add(this, t=>{}
            )
        }
        onTimeOut() {
            var t = {
                code: 7,
                message: this.name + "req timeout!transId:" + this.transId,
                handled: !1
            };
            console.error(t),
            this.opt && this.opt.popTimeOut || (this.reject(t),
            this.clear())
        }
        resetTimeOut() {
            this._timeOutNum >= this.timeoutMax || (this._timeOutNum++,
            Laya.timer.clear(this, this.onTimeOut),
            Laya.timer.once(this.timeout, this, this.onTimeOut))
        }
        reset() {
            this.onClearHandler.recover(),
            this.onClearHandler = null,
            this.loadingCloser = null,
            this.resolve = null,
            this.reject = null,
            this.finished = !1,
            this.name = "",
            this._timeOutNum = 0,
            this.transId = 0,
            Laya.timer.clearAll(this)
        }
    }
    yt._sign = "p_PendingReqItem",
    (i = l = l || {})[i.NoneType = 0] = "NoneType",
    i[i.ErrorAck = 1] = "ErrorAck",
    i[i.ServerStateNtf = 4] = "ServerStateNtf",
    i[i.HeartBeatReq = 5] = "HeartBeatReq",
    i[i.HeartBeatAck = 6] = "HeartBeatAck",
    i[i.CreateRoleReq = 11] = "CreateRoleReq",
    i[i.CreateRoleAck = 12] = "CreateRoleAck",
    i[i.EnterGameReq = 13] = "EnterGameReq",
    i[i.EnterGameAck = 14] = "EnterGameAck",
    i[i.CommandReq = 15] = "CommandReq",
    i[i.CommandAck = 16] = "CommandAck",
    i[i.UserInfoNtf = 18] = "UserInfoNtf",
    i[i.AccountInfoChangeNtf = 19] = "AccountInfoChangeNtf",
    i[i.MessageEventNtf = 20] = "MessageEventNtf",
    i[i.ItemChangeNtf = 26] = "ItemChangeNtf",
    i[i.GenerateCatReq = 27] = "GenerateCatReq",
    i[i.GenerateCatAck = 28] = "GenerateCatAck",
    i[i.MergeCatReq = 29] = "MergeCatReq",
    i[i.MergeCatAck = 30] = "MergeCatAck",
    i[i.GatherGoldReq = 31] = "GatherGoldReq",
    i[i.GatherGoldAck = 32] = "GatherGoldAck",
    i[i.DelCatReq = 33] = "DelCatReq",
    i[i.DelCatAck = 34] = "DelCatAck",
    i[i.SwitchPosCatReq = 35] = "SwitchPosCatReq",
    i[i.SwitchPosCatAck = 36] = "SwitchPosCatAck",
    i[i.BoostGoldReq = 37] = "BoostGoldReq",
    i[i.BoostGoldAck = 38] = "BoostGoldAck",
    i[i.GetOffLineGoldReq = 39] = "GetOffLineGoldReq",
    i[i.GetOffLineGoldAck = 40] = "GetOffLineGoldAck",
    i[i.GetAirDropCatReq = 41] = "GetAirDropCatReq",
    i[i.GetAirDropCatAck = 42] = "GetAirDropCatAck",
    i[i.BoostGoldNtf = 44] = "BoostGoldNtf",
    i[i.TokensInfoChangeNtf = 46] = "TokensInfoChangeNtf",
    i[i.GetFreeCatReq = 47] = "GetFreeCatReq",
    i[i.GetFreeCatAck = 48] = "GetFreeCatAck",
    i[i.RandomEventReq = 49] = "RandomEventReq",
    i[i.RandomEventAck = 50] = "RandomEventAck",
    i[i.GetRandomEventAwardReq = 51] = "GetRandomEventAwardReq",
    i[i.GetRandomEventAwardAck = 52] = "GetRandomEventAwardAck",
    i[i.GetRandomEventBoxReq = 53] = "GetRandomEventBoxReq",
    i[i.GetRandomEventBoxAck = 54] = "GetRandomEventBoxAck",
    i[i.MergeCatAutoReq = 55] = "MergeCatAutoReq",
    i[i.MergeCatAutoAck = 56] = "MergeCatAutoAck",
    i[i.RandomEventChangeNtf = 58] = "RandomEventChangeNtf",
    i[i.OffLineGoldNtf = 59] = "OffLineGoldNtf",
    i[i.CountsChangeNtf = 60] = "CountsChangeNtf",
    i[i.GetFreeBoxNumReq = 61] = "GetFreeBoxNumReq",
    i[i.GetFreeBoxNumAck = 62] = "GetFreeBoxNumAck",
    i[i.SyncRechargeNtf = 98] = "SyncRechargeNtf",
    i[i.ReceiveRechargeReq = 99] = "ReceiveRechargeReq",
    i[i.ReceiveRechargeAck = 100] = "ReceiveRechargeAck",
    i[i.JoinClubReq = 103] = "JoinClubReq",
    i[i.JoinClubAck = 104] = "JoinClubAck",
    i[i.GetRecruitClubListReq = 105] = "GetRecruitClubListReq",
    i[i.GetRecruitClubListAck = 106] = "GetRecruitClubListAck",
    i[i.QuitClubReq = 107] = "QuitClubReq",
    i[i.QuitClubAck = 108] = "QuitClubAck",
    i[i.ClubMemberRankReq = 109] = "ClubMemberRankReq",
    i[i.ClubMemberRankAck = 110] = "ClubMemberRankAck",
    i[i.GetStatsReq = 111] = "GetStatsReq",
    i[i.GetStatsAck = 112] = "GetStatsAck",
    i[i.GetGoldRankListReq = 113] = "GetGoldRankListReq",
    i[i.GetGoldRankListAck = 114] = "GetGoldRankListAck",
    i[i.ClubInfoReq = 115] = "ClubInfoReq",
    i[i.ClubInfoAck = 116] = "ClubInfoAck",
    i[i.FrensInfoReq = 117] = "FrensInfoReq",
    i[i.FrensInfoAck = 118] = "FrensInfoAck",
    i[i.InviteRankListReq = 119] = "InviteRankListReq",
    i[i.InviteRankListAck = 120] = "InviteRankListAck",
    i[i.GetClubGoldRankListReq = 121] = "GetClubGoldRankListReq",
    i[i.GetClubGoldRankListAck = 122] = "GetClubGoldRankListAck",
    i[i.GetMyRankReq = 123] = "GetMyRankReq",
    i[i.GetMyRankAck = 124] = "GetMyRankAck",
    i[i.GoldChangeNtf = 126] = "GoldChangeNtf",
    i[i.FrensInviterDoubleInfoReq = 127] = "FrensInviterDoubleInfoReq",
    i[i.FrensInviterDoubleInfoAck = 128] = "FrensInviterDoubleInfoAck",
    i[i.CreateClubReq = 157] = "CreateClubReq",
    i[i.CreateClubAck = 158] = "CreateClubAck",
    i[i.ClubGroupUserNameReq = 159] = "ClubGroupUserNameReq",
    i[i.ClubGroupUserNameAck = 160] = "ClubGroupUserNameAck",
    i[i.ClubInfoNtf = 188] = "ClubInfoNtf",
    i[i.GetWalletAddrReq = 201] = "GetWalletAddrReq",
    i[i.GetWalletAddrAck = 202] = "GetWalletAddrAck",
    i[i.BindWalletReq = 203] = "BindWalletReq",
    i[i.BindWalletAck = 204] = "BindWalletAck",
    i[i.FishingReq = 251] = "FishingReq",
    i[i.FishingAck = 252] = "FishingAck",
    i[i.MyFishInfoReq = 253] = "MyFishInfoReq",
    i[i.MyFishInfoAck = 254] = "MyFishInfoAck",
    i[i.FishRankListReq = 255] = "FishRankListReq",
    i[i.FishRankListAck = 256] = "FishRankListAck",
    i[i.FishInfoReq = 257] = "FishInfoReq",
    i[i.FishInfoAck = 258] = "FishInfoAck",
    i[i.FishRewardPoolReq = 263] = "FishRewardPoolReq",
    i[i.FishRewardPoolAck = 264] = "FishRewardPoolAck",
    i[i.GetFishRankRewardReq = 265] = "GetFishRankRewardReq",
    i[i.GetFishRankRewardAck = 266] = "GetFishRankRewardAck",
    i[i.FishHistoryReq = 267] = "FishHistoryReq",
    i[i.FishHistoryAck = 268] = "FishHistoryAck",
    i[i.FishRodUpReq = 269] = "FishRodUpReq",
    i[i.FishRodUpAck = 270] = "FishRodUpAck",
    i[i.GetLaunchListReq = 301] = "GetLaunchListReq",
    i[i.GetLaunchListAck = 302] = "GetLaunchListAck",
    i[i.LaunchStakeReq = 303] = "LaunchStakeReq",
    i[i.LaunchStakeAck = 304] = "LaunchStakeAck",
    i[i.RetrieveStakeReq = 305] = "RetrieveStakeReq",
    i[i.RetrieveStakeAck = 306] = "RetrieveStakeAck",
    i[i.ReceiveLaunchProfitReq = 307] = "ReceiveLaunchProfitReq",
    i[i.ReceiveLaunchProfitAck = 308] = "ReceiveLaunchProfitAck",
    i[i.LaunchPoolBonusNtf = 310] = "LaunchPoolBonusNtf",
    i[i.TurnInfoReq = 351] = "TurnInfoReq",
    i[i.TurnInfoAck = 352] = "TurnInfoAck",
    i[i.TurnReq = 353] = "TurnReq",
    i[i.TurnAck = 354] = "TurnAck",
    i[i.ClaimTurnCountReq = 355] = "ClaimTurnCountReq",
    i[i.ClaimTurnCountAck = 356] = "ClaimTurnCountAck",
    i[i.HelpOtherTurnReq = 357] = "HelpOtherTurnReq",
    i[i.HelpOtherTurnAck = 358] = "HelpOtherTurnAck",
    i[i.OtherHelpTurnNtf = 360] = "OtherHelpTurnNtf",
    i[i.TurnWithdrawReq = 361] = "TurnWithdrawReq",
    i[i.TurnWithdrawAck = 362] = "TurnWithdrawAck",
    i[i.StartTurnReq = 363] = "StartTurnReq",
    i[i.StartTurnAck = 364] = "StartTurnAck",
    i[i.TurnRecordReq = 365] = "TurnRecordReq",
    i[i.TurnRecordAck = 366] = "TurnRecordAck",
    i[i.HelpTurnRecordReq = 367] = "HelpTurnRecordReq",
    i[i.HelpTurnRecordAck = 368] = "HelpTurnRecordAck",
    i[i.TurnWithdrawRecordReq = 369] = "TurnWithdrawRecordReq",
    i[i.TurnWithdrawRecordAck = 370] = "TurnWithdrawRecordAck",
    i[i.PreHelpOtherTurnReq = 371] = "PreHelpOtherTurnReq",
    i[i.PreHelpOtherTurnAck = 372] = "PreHelpOtherTurnAck",
    i[i.GetOffHelpTurnRecordReq = 373] = "GetOffHelpTurnRecordReq",
    i[i.GetOffHelpTurnRecordAck = 374] = "GetOffHelpTurnRecordAck",
    i[i.TurnWithdrawHistoryReq = 375] = "TurnWithdrawHistoryReq",
    i[i.TurnWithdrawHistoryAck = 376] = "TurnWithdrawHistoryAck",
    i[i.TonExchangeRateReq = 565] = "TonExchangeRateReq",
    i[i.TonExchangeRateAck = 566] = "TonExchangeRateAck",
    i[i.RequestPrePayReq = 567] = "RequestPrePayReq",
    i[i.RequestPrePayAck = 568] = "RequestPrePayAck",
    i[i.RequestPayReq = 569] = "RequestPayReq",
    i[i.RequestPayAck = 570] = "RequestPayAck",
    i[i.CheckPayReq = 571] = "CheckPayReq",
    i[i.CheckPayAck = 572] = "CheckPayAck",
    i[i.PayClubBoosterReq = 573] = "PayClubBoosterReq",
    i[i.PayClubBoosterAck = 574] = "PayClubBoosterAck",
    i[i.BCCheckInReq = 575] = "BCCheckInReq",
    i[i.BCCheckInAck = 576] = "BCCheckInAck",
    i[i.BCCheckInDataReq = 577] = "BCCheckInDataReq",
    i[i.BCCheckInDataAck = 578] = "BCCheckInDataAck",
    i[i.SysMsgNtf = 602] = "SysMsgNtf",
    i[i.WatchMsgReq = 603] = "WatchMsgReq",
    i[i.WatchMsgAck = 604] = "WatchMsgAck",
    i[i.UnWatchMsgReq = 605] = "UnWatchMsgReq",
    i[i.UnWatchMsgAck = 606] = "UnWatchMsgAck",
    i[i.ExDataNtf = 2062] = "ExDataNtf";
    class bt extends Laya.EventDispatcher {
        constructor() {
            super(...arguments),
            this._pendingReq = {},
            this._transId = 0,
            this._reconnectcount = 0,
            this._autoReconnect = !0,
            this._isConnected = !1,
            this._debugLog = Mmobay.MConfig.showNetLog,
            this._pingArr = []
        }
        get addr() {
            return this._addr
        }
        get autoReconnect() {
            return this._autoReconnect
        }
        get reconnectcount() {
            return this._reconnectcount
        }
        get isConnected() {
            return this._isConnected
        }
        set reconnectcount(t) {
            this._reconnectcount = t
        }
        set messageHandler(t) {
            this._messageHandler = t
        }
        get averagePing() {
            var t = this._pingArr.reduce((t,e)=>t + e, 0) / this._pingArr.length;
            return Math.floor(t)
        }
        addMessageHandler(t) {
            this._messageHandler = Object.assign(this._messageHandler, t)
        }
        connect(t) {
            this._autoReconnect = !0,
            this._isConnected = !1,
            this._addr = t,
            console.log("new socket  by connect");
            let e = new window.WebSocket(t);
            e.binaryType = "arraybuffer",
            e.onerror = this.onError.bind(this),
            e.onopen = this.onOpen.bind(this),
            e.onclose = this.onClose.bind(this),
            e.onmessage = this.onMessage.bind(this),
            this.ws = e,
            this.clean()
        }
        disconnect(t) {
            this._autoReconnect = !!t,
            this._isConnected && (this._isConnected = !1,
            this.closeSocket(),
            console.log("socket clean by disconnect"),
            this.clean())
        }
        closeSocket() {
            this.ws.close(),
            this.ws.onerror = null,
            this.ws.onopen = null,
            this.ws.onclose = null,
            this.ws.onmessage = null
        }
        onOpen(t) {
            this._isConnected = !0,
            this.ws.binaryType = "arraybuffer",
            this.event(Laya.Event.OPEN, t)
        }
        onMessage(e) {
            var e = protobuf.util.newBuffer(e.data)
              , e = pb.CSMessage.decode(e)
              , i = l[e.cmdId];
            let s = pb[i];
            if (s) {
                var a = s.decode(e.body)
                  , n = e.transId;
                this._debugLog && console.log(`net ack/ntf :  ${i}, ${e.cmdId}, ${e.transId}, ` + JSON.stringify(a));
                let t = this._messageHandler.onHookRecvPacket;
                t && t(a, n),
                this.handlerMessage(n, i, a)
            } else
                console.warn(i + " not find in pb")
        }
        handlerMessage(e, i, s) {
            let a = this._pendingReq[e];
            if (a) {
                var t;
                if (a.startTime && (t = Date.newDate().getTime() - a.startTime,
                5 <= this._pingArr.length && this._pingArr.shift(),
                this._pingArr.push(t)),
                s.constructor.name == pb.ErrorAck.name && 0 != s.code) {
                    let t = {
                        code: s.code,
                        langId: s.langId,
                        handled: !1
                    };
                    a.reject(t),
                    Laya.timer.callLater(this, ()=>{
                        t.handled || (it.errorSpawnImpl(t.code, t.langId),
                        t.handled = !0)
                    }
                    )
                } else
                    a.resolve(s);
                a.clear()
            } else {
                let t = this._messageHandler["on" + i];
                t ? Promise.resolve().then(()=>{
                    t(s, e)
                }
                ) : this._messageHandler.onUnknownPacket && this._messageHandler.onUnknownPacket(s, e)
            }
        }
        onClose(t) {
            this._isConnected = !1,
            console.log("socket clean by onClose"),
            this.clean(),
            this.event(Laya.Event.CLOSE, t)
        }
        onError(t) {
            this._isConnected = !1,
            console.log("socket clean by onError"),
            this.clean(),
            this.event(Laya.Event.ERROR, t)
        }
        send(t, e) {
            if (!this._isConnected || 1 < this.ws.readyState)
                return 0;
            let i = pb.CSMessage.create();
            i.cmdId = e,
            i.transId = this._transId;
            e = l[e];
            i.body = pb[e].encode(t).finish();
            let s = pb.CSMessage.encode(i).finish()
              , a = (Laya.Browser.onWeiXin ? this.ws.send(s.slice().buffer) : this.ws.send(s),
            this._debugLog && console.log("net req :", e, i.cmdId, i.transId, t),
            this._messageHandler.onHookSendPacket);
            return a && a(t, 0),
            this._transId
        }
        sendAndWait(o, r, t, h) {
            return new Promise((i,s)=>{
                var a = ++this._transId
                  , n = this.send(o, r);
                if (0 == n)
                    s({
                        code: 6,
                        message: "Network disconnected"
                    });
                else {
                    if (-1 == n)
                        return it.errorSpawnImpl(5, "message too long"),
                        void s({
                            code: 5,
                            message: "message too long"
                        });
                    let t = this._messageHandler.onHookSendPacket;
                    t && t(o, a);
                    n = l[r];
                    let e = yt.create();
                    e.transId = a,
                    e.name = n,
                    e.startTime = Date.newDate().getTime(),
                    e.open(i, s, Laya.Handler.create(this, this.clearPendingReq, [a]), h),
                    this._pendingReq[a] = e
                }
            }
            )
        }
        clearPendingReq(t) {
            delete this._pendingReq[t]
        }
        clean(e=!0) {
            for (var i in this._transId = 0,
            this._pendingReq) {
                let t = this._pendingReq[i];
                t && (i = {
                    code: 6,
                    message: t.name + " network disconnected"
                },
                console.error(i),
                e && t.reject(i),
                t.clear())
            }
            this._pendingReq = {}
        }
        reset() {
            this.offAll(),
            this.disconnect(),
            this._autoReconnect = !0,
            this._isConnected = !1
        }
    }
    const vt = tt.create(200);
    class kt extends Laya.EventDispatcher {
        constructor() {
            super(...arguments),
            this._http = new Laya.Browser.window.XMLHttpRequest
        }
        static create(t) {
            let e = U.get(kt._sign, kt);
            return t.showLoading && it.loadingImpl && (e._showLoadingItem = {
                finished: !1
            },
            vt.add(e._showLoadingItem, t=>{
                t.finished || (t.loadingCloser = it.loadingImpl())
            }
            )),
            e._retryTimes = t.retryTimes || 0,
            e._opt = t || et,
            e
        }
        get status() {
            return this._http.status
        }
        send(t, e=null, i="get", s="text", a=null) {
            this._requestInfo = {
                url: t,
                data: e,
                method: i,
                responseType: s,
                headers: a
            },
            this.doSend()
        }
        doSend() {
            let {url: t, data: e, method: i, responseType: s, headers: a} = this._requestInfo
              , n = (this._responseType = s,
            this._data = null,
            this._http);
            if ("get" == i && e && (t += "?" + e),
            n.open(i, t, !0),
            a)
                for (let t = 0; t < a.length - 1; t += 2)
                    n.setRequestHeader(a[t], a[t + 1]);
            else
                e && "string" != typeof e ? n.setRequestHeader("Content-Type", "application/json") : n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            n.responseType = "arraybuffer" !== s ? "text" : "arraybuffer",
            n.onerror = t=>this.onError(t),
            n.onload = t=>this.onLoad(t),
            "get" == i ? n.send() : n.send(e)
        }
        onLoad(t) {
            var e = this._http
              , i = void 0 !== e.status ? e.status : 200;
            200 === i || 204 === i || 266 === i || 0 === i ? this.complete() : this.error("[" + e.status + "]" + e.statusText + ":" + e.responseURL)
        }
        onError(t) {
            if (0 < this._retryTimes)
                return this._retryTimes--,
                void Laya.timer.once(this._opt.retryInterval || 1e3, this, this.doSend);
            this.error("Request failed Status:" + this._http.status + " text:" + this._http.statusText)
        }
        complete() {
            this.clear();
            let e = !0;
            try {
                var t = this._http;
                "json" === this._responseType ? this._data = JSON.parse(t.responseText) : "xml" === this._responseType ? this._data = Laya.Utils.parseXMLFromString(t.responseText) : this._data = t.response || t.responseText
            } catch (t) {
                e = !1,
                this.error(t.message)
            }
            e && this.event(Laya.Event.COMPLETE, Array.isArray(this._data) ? [this._data] : this._data)
        }
        error(t) {
            this.clear(),
            this.event(Laya.Event.ERROR, t)
        }
        clear() {
            let t = this._http
              , e = this._showLoadingItem;
            e && (e.finished = !0,
            e.loadingCloser && e.loadingCloser()),
            this._showLoadingItem = null,
            t.onerror = t.onload = null
        }
        reset() {
            this.offAll(),
            Laya.timer.clear(this, this.doSend),
            this._requestInfo = null,
            this._responseType = null,
            this._data = null,
            this._showLoadingItem = null,
            this._opt = null,
            this._retryTimes = 0
        }
        release() {
            0 < this._retryTimes || U.put(kt._sign, this)
        }
    }
    kt._sign = "p_HttpRequest";
    const ft = "yyyy/mm/dd HH:MM:ss"
      , wt = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMs])\1?|[LloSZWN]/g;
    function xt(t, e=ft) {
        let i = !1;
        "u" == e.charAt(0) && (e = e.slice(1),
        i = !0);
        "g" == e.charAt(0) && (e = e.slice(1));
        var s = i ? "getUTC" : "get"
          , a = t[s + "Date"]()
          , n = (t[s + "Day"](),
        t[s + "Month"]())
          , o = t[s + "FullYear"]()
          , r = t[s + "Hours"]()
          , h = t[s + "Minutes"]()
          , l = t[s + "Seconds"]();
        t[s + "Milliseconds"](),
        i || t.getTimezoneOffset();
        let c = {
            d: a,
            dd: Tt(a),
            m: n + 1,
            mm: Tt(n + 1),
            yy: String(o).slice(2),
            yyyy: o,
            h: r % 12 || 12,
            hh: Tt(r % 12 || 12),
            H: r,
            HH: Tt(r),
            M: h,
            MM: Tt(h),
            s: l,
            ss: Tt(l)
        };
        return e = e.replace(wt, t=>"mm" == t || "dd" == t ? +c[t] + "" : c[t])
    }
    function Tt(t, e=2) {
        let i = String(t);
        for (; i.length < e; )
            i = "0" + i;
        return i
    }
    let St = {
        booster: 1,
        randomEvent: 2,
        offLine: 3,
        goods2002: 4,
        dayGoods: 5
    };
    let It = {
        fish: 1,
        gold: 2,
        xZen: 3,
        usdt: 4
    }
      , Dt = {
        turnStart: 1,
        turnHelp: 2,
        turnStartDay: 3,
        goods2001: 2001,
        goods2002: 2002,
        goods2003: 2003,
        goods2004: 2004,
        dayGoods: 4
    }
      , Lt = {
        clubBooster: 1e4,
        booster: 10001,
        randomEventTime: 10002,
        randomEventBox: 10003,
        randomEventBoxOffLine: 10004,
        dayGoods: 10005,
        goods2002: 2002,
        goods2003: 2003,
        goods2004: 2004
    }
      , At = {
        normalGoods: 1,
        clubBooster: 2,
        bcCheckIn: 3,
        onlyOnceGoods: 4,
        dayGoods: 5
    }
      , Et = {
        en: 1,
        tc: 2,
        jp: 3,
        vi: 4,
        ko: 5,
        fr: 6,
        ptbr: 7,
        tr: 8,
        ru: 9,
        es: 10,
        th: 11,
        ind: 12
    };
    let Rt = {
        roll: 1,
        fish: 2,
        turn: 3
    }
      , Mt = {
        lang: 1,
        copper: 2,
        fishweight: 3,
        fishcoin: 4,
        xZen: 5,
        icon: 6
    }
      , Nt = {
        ban: 1,
        forbidTalk: 2
    }
      , Pt = {
        close: 1,
        free: 2,
        chain: 3,
        fishCoin: 4
    }
      , Ut = {
        box: 1,
        multiple: 2
    }
      , Ft = {
        client: 1,
        gateway: 2,
        game: 3,
        gamedb: 4,
        world: 5,
        login: 6,
        tgbot: 7,
        gmt: 8,
        hybrid: 9,
        pay: 10,
        rank: 11,
        task: 12
    };
    let Bt = {
        fish: 1,
        helpTurn: 2
    };
    let Gt = {
        0: 1e3,
        1: 1001,
        2: 1002,
        3: 1003,
        4: 1004,
        5: 1045,
        6: 1046
    };
    function Ot(t) {
        return (t += "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    var C, qt, p, g, Ht, Vt, b, v, Wt, Yt, Xt;
    let $t = {
        cn: "重启游戏后生效",
        en: "It will take effect after restarting the game",
        jp: "ゲームを再起動して有効化する",
        tc: "重啓遊戲後生效",
        vi: "Có hiệu lực sau khi khởi động lại trò chơi",
        ko: "게임 재시작 시 적용",
        fr: "Redémarrer pour prendre effet",
        ptbr: "Reinicie para entrar em efeito",
        tr: "Geçerli olması için yeniden başlat",
        ru: "Перезапустите, чтобы изменения вступили в силу",
        es: "Reinicia para que tenga efecto",
        th: "มีผลหลังจากรีสตาร์ทเกมใหม่",
        ind: "Buka ulang game agar perubahan dapat berlaku."
    };
    function k(t, ...e) {
        let i = "en";
        for (const a in Et)
            if (Mmobay.Utils.getLanguage() == Et[a]) {
                i = a;
                break
            }
        let s = function(t, e) {
            if (2064 == t)
                return $t[e] || $t.en || "";
            let i = "";
            switch (e) {
            case "en":
                var s = Data.getLang(t);
                s && (i = s.en);
                break;
            case "jp":
                s = Data.getLangJP && Data.getLangJP(t);
                s && (i = s.jp);
                break;
            case "cn":
                s = Data.getLangCN && Data.getLangCN(t);
                s && (i = s.cn);
                break;
            case "tc":
                s = Data.getLangTC && Data.getLangTC(t);
                s && (i = s.tc);
                break;
            case "vi":
                s = Data.getLangVI && Data.getLangVI(t);
                s && (i = s.vi);
                break;
            case "ko":
                s = Data.getLangKO && Data.getLangKO(t);
                s && (i = s.ko);
                break;
            case "fr":
                s = Data.getLangFR && Data.getLangFR(t);
                s && (i = s.fr);
                break;
            case "ptbr":
                s = Data.getLangPTBR && Data.getLangPTBR(t);
                s && (i = s.ptbr);
                break;
            case "tr":
                s = Data.getLangTR && Data.getLangTR(t);
                s && (i = s.tr);
                break;
            case "ru":
                s = Data.getLangRU && Data.getLangRU(t);
                s && (i = s.ru);
                break;
            case "es":
                s = Data.getLangES && Data.getLangES(t);
                s && (i = s.es);
                break;
            case "th":
                s = Data.getLangTH && Data.getLangTH(t);
                s && (i = s.th);
                break;
            case "ind":
                s = Data.getLangIND && Data.getLangIND(t);
                s && (i = s.ind)
            }
            return i = "" == i && (e = Data.getLang(t)) ? e.en : i
        }(t, i);
        return s ? 0 < e.length ? s.format.apply(s, e) : s : ""
    }
    function Kt(t, e, i, s) {
        t -= i,
        i = e - s;
        return Math.sqrt(t * t + i * i)
    }
    function zt(s, e, a, n, o, r) {
        var h = [.3 * 1.5, .75, .6 * 1.5, .75];
        for (let t = 0; t < e; t++) {
            var l = .1 * Math.randRange(8, 10)
              , l = [150, 600 * l, 400 * l];
            let t = new Laya.Image
              , e = (r ? r.addChild(t) : _t(t, c.Effect),
            t.anchorX = t.anchorY = .5,
            t.scale(h[0], h[0]),
            t.skin = s,
            t.pos(a.x, a.y),
            new Laya.TimeLine)
              , i = new Laya.TimeLine;
            e.to(t, {
                scaleX: h[1],
                scaleY: h[1]
            }, l[0]).to(t, {
                y: t.y - Math.randRange(0, 100),
                x: t.x + Math.randRange(-100, 100),
                scaleX: h[2],
                scaleY: h[2]
            }, l[1], Laya.Ease.circOut).to(t, {
                x: n.x,
                y: n.y,
                scaleX: h[3],
                scaleY: h[3]
            }, l[2], null),
            e.once(Laya.Event.COMPLETE, null, ()=>{
                i.destroy(),
                e.destroy(),
                t.destroy(),
                o && o()
            }
            ),
            t.onDestroy = ()=>{
                e.total && e.destroy(),
                i.total && i.destroy()
            }
            ,
            e.play(0, !1)
        }
    }
    function jt(t) {
        let e = t.toString()
          , i = ""
          , s = e.length;
        for (; 0 < s; )
            i = e.slice(Math.max(s - 3, 0), s) + i,
            0 < (s -= 3) && (i = "," + i);
        return i
    }
    function f(t) {
        var e = Math.ceil(Math.log10(t));
        if (e <= 6)
            return t;
        if (6 < e && e <= 9)
            return Math.floor(t / Math.pow(10, 3)) + "K";
        if (e <= 12)
            return Math.floor(t / Math.pow(10, 6)) + "M";
        if (e <= 15)
            return Math.floor(t / Math.pow(10, 9)) + "B";
        if (e <= 18)
            return Math.floor(t / Math.pow(10, 12)) + "T";
        if (e <= 21)
            return Math.floor(t / Math.pow(10, 15)) + "Q";
        var i = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        let s = [];
        var e = Math.floor((e - 22) / 3)
          , a = e / i.length;
        return s[1] = Math.floor(a),
        s[0] = e - Math.floor(a) * i.length,
        Math.floor(t / Math.pow(10, 18) / Math.pow(10, 26 * s[1] * 3) / Math.pow(10, 3 * s[0])) + "" + i[s[1]] + i[s[0]]
    }
    function Zt() {
        return Mmobay.MConfig.botName || (window.GameUrlParas || {}).botname
    }
    function Jt() {
        let t = Date.newDate();
        return t.setMinutes(0, 0, 0),
        t.setHours(t.getHours() + 1, 0),
        t.getTime()
    }
    function Qt(t) {
        var t = t.split(".")
          , e = t[1] || 0;
        return Intl.NumberFormat().format(+t[0]) + "." + e
    }
    (e = C = C || {})[e.Succ = 0] = "Succ",
    e[e.Unkown = 1] = "Unkown",
    e[e.SysError = 2] = "SysError",
    e[e.ParamsError = 3] = "ParamsError",
    e[e.ConfigError = 4] = "ConfigError",
    e[e.NetError = 5] = "NetError",
    e[e.NetDisconnect = 6] = "NetDisconnect",
    e[e.ReqTimeout = 7] = "ReqTimeout",
    e[e.ConnectTimeout = 8] = "ConnectTimeout",
    e[e.PwdError = 9] = "PwdError",
    e[e.NoRole = 10] = "NoRole",
    e[e.NoAccount = 11] = "NoAccount",
    e[e.DupAccount = 12] = "DupAccount",
    e[e.FuncNotOpen = 13] = "FuncNotOpen",
    e[e.OtherLogined = 14] = "OtherLogined",
    e[e.ItemNotEnough = 15] = "ItemNotEnough",
    e[e.EatMax = 16] = "EatMax",
    e[e.LvlMax = 17] = "LvlMax",
    e[e.CantBuySelfGoods = 18] = "CantBuySelfGoods",
    e[e.GoodsPriceError = 19] = "GoodsPriceError",
    e[e.NoGoods = 20] = "NoGoods",
    e[e.TradeNumLiimit = 21] = "TradeNumLiimit",
    e[e.NotYourGoods = 22] = "NotYourGoods",
    e[e.GoodsSold = 23] = "GoodsSold",
    e[e.CopperNotEnough = 24] = "CopperNotEnough",
    e[e.TradeError = 25] = "TradeError",
    e[e.PlayerNotEnough = 26] = "PlayerNotEnough",
    e[e.InvalidData = 27] = "InvalidData",
    e[e.NoData = 28] = "NoData",
    e[e.AbnormalData = 29] = "AbnormalData",
    e[e.HasGot = 30] = "HasGot",
    e[e.Nonstandard = 31] = "Nonstandard",
    e[e.NoUserData = 32] = "NoUserData",
    e[e.NoItem = 33] = "NoItem",
    e[e.IsAct = 34] = "IsAct",
    e[e.NotAct = 35] = "NotAct",
    e[e.LvMax = 36] = "LvMax",
    e[e.NoClub = 37] = "NoClub",
    e[e.WaitClubCheck = 38] = "WaitClubCheck",
    e[e.ClubMbSizeLimit = 39] = "ClubMbSizeLimit",
    e[e.NoPrivileges = 40] = "NoPrivileges",
    e[e.HadClub = 41] = "HadClub",
    e[e.ClubApplied = 42] = "ClubApplied",
    e[e.ViceChairmanFull = 43] = "ViceChairmanFull",
    e[e.ClubNameDup = 44] = "ClubNameDup",
    e[e.MemberOffClub = 45] = "MemberOffClub",
    e[e.ChairmanCantOff = 46] = "ChairmanCantOff",
    e[e.IllegalRequest = 47] = "IllegalRequest",
    e[e.CantEquipArms = 48] = "CantEquipArms",
    e[e.InCD = 49] = "InCD",
    e[e.CreateRoleErr = 50] = "CreateRoleErr",
    e[e.ClubErr = 51] = "ClubErr",
    e[e.TradeErr = 52] = "TradeErr",
    e[e.WorldServerErr = 53] = "WorldServerErr",
    e[e.DBServerErr = 54] = "DBServerErr",
    e[e.PassUnable = 55] = "PassUnable",
    e[e.vitMax = 56] = "vitMax",
    e[e.soldOut = 57] = "soldOut",
    e[e.vitNotEnough = 58] = "vitNotEnough",
    e[e.InBattle = 59] = "InBattle",
    e[e.MCNotEnough = 60] = "MCNotEnough",
    e[e.TapTokenNotEnough = 61] = "TapTokenNotEnough",
    e[e.NoWearSkin = 62] = "NoWearSkin",
    e[e.NoSkin = 63] = "NoSkin",
    e[e.NoHero = 64] = "NoHero",
    e[e.UpLvLimit = 65] = "UpLvLimit",
    e[e.InputTooLong = 66] = "InputTooLong",
    e[e.IllegalChar = 67] = "IllegalChar",
    e[e.IsUsed = 68] = "IsUsed",
    e[e.CodeIsUsed = 69] = "CodeIsUsed",
    e[e.MailServerErr = 70] = "MailServerErr",
    e[e.WalletIsBind = 71] = "WalletIsBind",
    e[e.WalletBindFail = 72] = "WalletBindFail",
    e[e.WalletError = 73] = "WalletError",
    e[e.HasBindWallet = 74] = "HasBindWallet",
    e[e.InSettle = 75] = "InSettle",
    e[e.BanAccount = 76] = "BanAccount",
    e[e.BeKickoff = 77] = "BeKickoff",
    e[e.MapOver = 78] = "MapOver",
    e[e.NoTimes = 79] = "NoTimes",
    e[e.CannotBuy = 80] = "CannotBuy",
    e[e.GameOutTime = 81] = "GameOutTime",
    e[e.SessExpire = 82] = "SessExpire",
    e[e.NoBindWallet = 83] = "NoBindWallet",
    e[e.ItemReturned = 84] = "ItemReturned",
    e[e.PaymentSuccess = 85] = "PaymentSuccess",
    e[e.PaymentFail = 86] = "PaymentFail",
    e[e.NotSupportPurchase = 87] = "NotSupportPurchase",
    e[e.BindingSuccess = 88] = "BindingSuccess",
    e[e.MailSendSuccess = 89] = "MailSendSuccess",
    e[e.AccountBound = 90] = "AccountBound",
    e[e.LoginFail = 91] = "LoginFail",
    e[e.LoginSuccess = 92] = "LoginSuccess",
    e[e.ActivityOver = 93] = "ActivityOver",
    e[e.HasTeam = 94] = "HasTeam",
    e[e.NoTeam = 95] = "NoTeam",
    e[e.TeamMemberMax = 96] = "TeamMemberMax",
    e[e.TeamBattling = 97] = "TeamBattling",
    e[e.OnlyLeaderCanDo = 98] = "OnlyLeaderCanDo",
    e[e.NoTeamMember = 99] = "NoTeamMember",
    e[e.RankRewardOver = 100] = "RankRewardOver",
    e[e.CannotJoin = 101] = "CannotJoin",
    e[e.AccountNameInvalid = 102] = "AccountNameInvalid",
    e[e.PwdInvalid = 103] = "PwdInvalid",
    e[e.AccessDenied = 104] = "AccessDenied",
    e[e.WalletSignError = 105] = "WalletSignError",
    e[e.Maintain = 106] = "Maintain",
    e[e.WalletVerifyFail = 107] = "WalletVerifyFail",
    e[e.SecurityPwdInvalid = 108] = "SecurityPwdInvalid",
    e[e.PleaseSetSecurityPwd = 109] = "PleaseSetSecurityPwd",
    e[e.AlreadyOpenSkipPwd = 110] = "AlreadyOpenSkipPwd",
    e[e.NotOpenSkipPwd = 111] = "NotOpenSkipPwd",
    e[e.IsSet = 112] = "IsSet",
    e[e.NoTimesToday = 113] = "NoTimesToday",
    e[e.Cd12Hours = 114] = "Cd12Hours",
    e[e.Cd24Hours = 115] = "Cd24Hours",
    e[e.VerifyCodeError = 116] = "VerifyCodeError",
    e[e.TodayMaxWinCount = 117] = "TodayMaxWinCount",
    e[e.EmailBeBoundWeb = 118] = "EmailBeBoundWeb",
    e[e.EmailDupBindError = 119] = "EmailDupBindError",
    e[e.EleNotEnough = 120] = "EleNotEnough",
    e[e.ChatServerErr = 121] = "ChatServerErr",
    e[e.ForbidTalk = 122] = "ForbidTalk",
    e[e.MonthCardActived = 123] = "MonthCardActived",
    e[e.InvalidCode = 124] = "InvalidCode",
    e[e.ExpireCode = 125] = "ExpireCode",
    e[e.EmailBeBoundHasAsset = 126] = "EmailBeBoundHasAsset",
    e[e.EmailNotBound = 127] = "EmailNotBound",
    e[e.FantasyNotEnough = 128] = "FantasyNotEnough",
    e[e.SkinNoEle = 129] = "SkinNoEle",
    e[e.CanNotClearSP = 130] = "CanNotClearSP",
    e[e.ApprovalPending = 131] = "ApprovalPending",
    e[e.NotUser = 132] = "NotUser",
    e[e.NotAddFriendSelf = 133] = "NotAddFriendSelf",
    e[e.UnFriend = 134] = "UnFriend",
    e[e.FriendMax = 135] = "FriendMax",
    e[e.FriendExist = 136] = "FriendExist",
    e[e.NotWearSameTypeRune = 137] = "NotWearSameTypeRune",
    e[e.NotWearRuneRough = 138] = "NotWearRuneRough",
    e[e.NotResetRuneRough = 139] = "NotResetRuneRough",
    e[e.TooFarAway = 140] = "TooFarAway",
    e[e.VigorNotEnough = 141] = "VigorNotEnough",
    e[e.VigorMax = 142] = "VigorMax",
    e[e.DurableNotEnough = 143] = "DurableNotEnough",
    e[e.DurableMax = 144] = "DurableMax",
    e[e.TreasureNow = 145] = "TreasureNow",
    e[e.TransferBufFail = 146] = "TransferBufFail",
    e[e.NotOpenMap = 147] = "NotOpenMap",
    e[e.FFriendMax = 148] = "FFriendMax",
    e[e.InLive = 149] = "InLive",
    e[e.WebAccountBeBound = 150] = "WebAccountBeBound",
    e[e.GameAccountBeBound = 151] = "GameAccountBeBound",
    e[e.SeasonOver = 152] = "SeasonOver",
    e[e.BattleEnd = 153] = "BattleEnd",
    e[e.DiamondNotEnough = 154] = "DiamondNotEnough",
    e[e.WealthNotEnough = 155] = "WealthNotEnough",
    e[e.NoSeats = 156] = "NoSeats",
    e[e.KittyNotEnough = 157] = "KittyNotEnough",
    e[e.FishNotEntough = 158] = "FishNotEntough",
    e[e.GoodsOnceBuy = 160] = "GoodsOnceBuy",
    e[e.ItemGone = 161] = "ItemGone",
    e[e.ClubNotExist = 162] = "ClubNotExist",
    e[e.ClubOnList = 163] = "ClubOnList",
    e[e.RankServerErr = 164] = "RankServerErr",
    e[e.Helped = 165] = "Helped",
    e[e.HelpedMax = 166] = "HelpedMax",
    e[e.TokenNotEntough = 167] = "TokenNotEntough",
    e[e.TurnDayLimit = 168] = "TurnDayLimit",
    (r = v = v || {})[r.Succ = 1] = "Succ",
    r[r.Unkown = 2] = "Unkown",
    r[r.SysError = 3] = "SysError",
    r[r.ParamsError = 4] = "ParamsError",
    r[r.ConfigError = 5] = "ConfigError",
    r[r.NetError = 6] = "NetError",
    r[r.NetDisconnect = 7] = "NetDisconnect",
    r[r.ReqTimeout = 8] = "ReqTimeout",
    r[r.ConnectTimeout = 9] = "ConnectTimeout",
    r[r.PwdError = 10] = "PwdError",
    r[r.NoRole = 11] = "NoRole",
    r[r.NoAccount = 12] = "NoAccount",
    r[r.DupAccount = 13] = "DupAccount",
    r[r.FuncNotOpen = 14] = "FuncNotOpen",
    r[r.OtherLogined = 15] = "OtherLogined",
    r[r.ItemNotEnough = 16] = "ItemNotEnough",
    r[r.EatMax = 17] = "EatMax",
    r[r.LvlMax = 18] = "LvlMax",
    r[r.CantBuySelfGoods = 19] = "CantBuySelfGoods",
    r[r.GoodsPriceError = 20] = "GoodsPriceError",
    r[r.NoGoods = 21] = "NoGoods",
    r[r.TradeNumLiimit = 22] = "TradeNumLiimit",
    r[r.NotYourGoods = 23] = "NotYourGoods",
    r[r.GoodsSold = 24] = "GoodsSold",
    r[r.CopperNotEnough = 25] = "CopperNotEnough",
    r[r.TradeError = 26] = "TradeError",
    r[r.PlayerNotEnough = 27] = "PlayerNotEnough",
    r[r.InvalidData = 28] = "InvalidData",
    r[r.NoData = 29] = "NoData",
    r[r.AbnormalData = 30] = "AbnormalData",
    r[r.HasGot = 31] = "HasGot",
    r[r.Nonstandard = 32] = "Nonstandard",
    r[r.NoUserData = 33] = "NoUserData",
    r[r.NoItem = 34] = "NoItem",
    r[r.IsAct = 35] = "IsAct",
    r[r.NotAct = 36] = "NotAct",
    r[r.LvMax = 37] = "LvMax",
    r[r.NoClub = 38] = "NoClub",
    r[r.WaitClubCheck = 39] = "WaitClubCheck",
    r[r.ClubMbSizeLimit = 40] = "ClubMbSizeLimit",
    r[r.NoPrivileges = 41] = "NoPrivileges",
    r[r.HadClub = 42] = "HadClub",
    r[r.ClubApplied = 43] = "ClubApplied",
    r[r.ViceChairmanFull = 44] = "ViceChairmanFull",
    r[r.ClubNameDup = 45] = "ClubNameDup",
    r[r.MemberOffClub = 46] = "MemberOffClub",
    r[r.ChairmanCantOff = 47] = "ChairmanCantOff",
    r[r.IllegalRequest = 48] = "IllegalRequest",
    r[r.CantEquipArms = 49] = "CantEquipArms",
    r[r.InCD = 50] = "InCD",
    r[r.CreateRoleErr = 51] = "CreateRoleErr",
    r[r.ClubErr = 52] = "ClubErr",
    r[r.TradeErr = 53] = "TradeErr",
    r[r.WorldServerErr = 54] = "WorldServerErr",
    r[r.DBServerErr = 55] = "DBServerErr",
    r[r.PassUnable = 56] = "PassUnable",
    r[r.vitMax = 57] = "vitMax",
    r[r.soldOut = 58] = "soldOut",
    r[r.vitNotEnough = 59] = "vitNotEnough",
    r[r.InBattle = 60] = "InBattle",
    r[r.MCNotEnough = 62] = "MCNotEnough",
    r[r.TapTokenNotEnough = 61] = "TapTokenNotEnough",
    r[r.NoWearSkin = 63] = "NoWearSkin",
    r[r.NoSkin = 64] = "NoSkin",
    r[r.NoHero = 65] = "NoHero",
    r[r.UpLvLimit = 66] = "UpLvLimit",
    r[r.InputTooLong = 67] = "InputTooLong",
    r[r.IllegalChar = 68] = "IllegalChar",
    r[r.IsUsed = 69] = "IsUsed",
    r[r.CodeIsUsed = 70] = "CodeIsUsed",
    r[r.MailServerErr = 71] = "MailServerErr",
    r[r.WalletIsBind = 72] = "WalletIsBind",
    r[r.WalletBindFail = 73] = "WalletBindFail",
    r[r.WalletError = 74] = "WalletError",
    r[r.HasBindWallet = 75] = "HasBindWallet",
    r[r.InSettle = 76] = "InSettle",
    r[r.BanAccount = 77] = "BanAccount",
    r[r.BeKickoff = 78] = "BeKickoff",
    r[r.MapOver = 79] = "MapOver",
    r[r.NoTimes = 80] = "NoTimes",
    r[r.CannotBuy = 81] = "CannotBuy",
    r[r.GameOutTime = 82] = "GameOutTime",
    r[r.SessExpire = 83] = "SessExpire",
    r[r.NoBindWallet = 84] = "NoBindWallet",
    r[r.ItemReturned = 85] = "ItemReturned",
    r[r.PaymentSuccess = 86] = "PaymentSuccess",
    r[r.PaymentFail = 87] = "PaymentFail",
    r[r.NotSupportPurchase = 88] = "NotSupportPurchase",
    r[r.BindingSuccess = 89] = "BindingSuccess",
    r[r.MailSendSuccess = 90] = "MailSendSuccess",
    r[r.AccountBound = 91] = "AccountBound",
    r[r.LoginFail = 92] = "LoginFail",
    r[r.LoginSuccess = 93] = "LoginSuccess",
    r[r.ActivityOver = 94] = "ActivityOver",
    r[r.HasTeam = 95] = "HasTeam",
    r[r.NoTeam = 96] = "NoTeam",
    r[r.TeamMemberMax = 97] = "TeamMemberMax",
    r[r.TeamBattling = 98] = "TeamBattling",
    r[r.OnlyLeaderCanDo = 99] = "OnlyLeaderCanDo",
    r[r.NoTeamMember = 100] = "NoTeamMember",
    r[r.RankRewardOver = 101] = "RankRewardOver",
    r[r.CannotJoin = 102] = "CannotJoin",
    r[r.AccountNameInvalid = 103] = "AccountNameInvalid",
    r[r.PwdInvalid = 104] = "PwdInvalid",
    r[r.AccessDenied = 105] = "AccessDenied",
    r[r.WalletSignError = 106] = "WalletSignError",
    r[r.Maintain = 107] = "Maintain",
    r[r.WalletVerifyFail = 108] = "WalletVerifyFail",
    r[r.SecurityPwdInvalid = 109] = "SecurityPwdInvalid",
    r[r.PleaseSetSecurityPwd = 110] = "PleaseSetSecurityPwd",
    r[r.AlreadyOpenSkipPwd = 111] = "AlreadyOpenSkipPwd",
    r[r.NotOpenSkipPwd = 112] = "NotOpenSkipPwd",
    r[r.IsSet = 113] = "IsSet",
    r[r.NoTimesToday = 116] = "NoTimesToday",
    r[r.Cd12Hours = 117] = "Cd12Hours",
    r[r.Cd24Hours = 118] = "Cd24Hours",
    r[r.VerifyCodeError = 121] = "VerifyCodeError",
    r[r.TodayMaxWinCount = 122] = "TodayMaxWinCount",
    r[r.EmailBeBoundWeb = 123] = "EmailBeBoundWeb",
    r[r.EmailDupBindError = 124] = "EmailDupBindError",
    r[r.EleNotEnough = 125] = "EleNotEnough",
    r[r.ChatServerErr = 127] = "ChatServerErr",
    r[r.ForbidTalk = 128] = "ForbidTalk",
    r[r.MonthCardActived = 129] = "MonthCardActived",
    r[r.InvalidCode = 130] = "InvalidCode",
    r[r.ExpireCode = 131] = "ExpireCode",
    r[r.EmailBeBoundHasAsset = 132] = "EmailBeBoundHasAsset",
    r[r.EmailNotBound = 133] = "EmailNotBound",
    r[r.FantasyNotEnough = 134] = "FantasyNotEnough",
    r[r.SkinNoEle = 135] = "SkinNoEle",
    r[r.CanNotClearSP = 136] = "CanNotClearSP",
    r[r.ApprovalPending = 138] = "ApprovalPending",
    r[r.NotUser = 139] = "NotUser",
    r[r.NotAddFriendSelf = 140] = "NotAddFriendSelf",
    r[r.UnFriend = 141] = "UnFriend",
    r[r.FriendMax = 143] = "FriendMax",
    r[r.FriendExist = 144] = "FriendExist",
    r[r.NotWearSameTypeRune = 145] = "NotWearSameTypeRune",
    r[r.NotWearRuneRough = 146] = "NotWearRuneRough",
    r[r.NotResetRuneRough = 147] = "NotResetRuneRough",
    r[r.TooFarAway = 148] = "TooFarAway",
    r[r.VigorNotEnough = 149] = "VigorNotEnough",
    r[r.VigorMax = 150] = "VigorMax",
    r[r.DurableNotEnough = 151] = "DurableNotEnough",
    r[r.DurableMax = 152] = "DurableMax",
    r[r.TreasureNow = 153] = "TreasureNow",
    r[r.TransferBufFail = 154] = "TransferBufFail",
    r[r.NotOpenMap = 155] = "NotOpenMap",
    r[r.FFriendMax = 156] = "FFriendMax",
    r[r.InLive = 157] = "InLive",
    r[r.WebAccountBeBound = 158] = "WebAccountBeBound",
    r[r.GameAccountBeBound = 159] = "GameAccountBeBound",
    r[r.SeasonOver = 160] = "SeasonOver",
    r[r.BattleEnd = 163] = "BattleEnd",
    r[r.DiamondNotEnough = 165] = "DiamondNotEnough",
    r[r.WealthNotEnough = 166] = "WealthNotEnough",
    r[r.NoSeats = 1027] = "NoSeats",
    r[r.KittyNotEnough = 168] = "KittyNotEnough",
    r[r.FishNotEntough = 169] = "FishNotEntough",
    r[r.GoodsOnceBuy = 170] = "GoodsOnceBuy",
    r[r.ItemGone = 171] = "ItemGone",
    r[r.ClubNotExist = 172] = "ClubNotExist",
    r[r.ClubOnList = 173] = "ClubOnList",
    r[r.RankServerErr = 175] = "RankServerErr",
    r[r.Helped = 177] = "Helped",
    r[r.HelpedMax = 178] = "HelpedMax",
    r[r.TokenNotEntough = 179] = "TokenNotEntough",
    r[r.TurnDayLimit = 180] = "TurnDayLimit";
    let te = {
        [C.Succ]: [v.Succ],
        [C.Unkown]: [v.Unkown],
        [C.SysError]: [v.SysError],
        [C.ParamsError]: [v.ParamsError],
        [C.ConfigError]: [v.ConfigError],
        [C.NetError]: [v.NetError],
        [C.NetDisconnect]: [v.NetDisconnect],
        [C.ReqTimeout]: [v.ReqTimeout],
        [C.ConnectTimeout]: [v.ConnectTimeout],
        [C.PwdError]: [v.PwdError],
        [C.NoRole]: [v.NoRole],
        [C.NoAccount]: [v.NoAccount],
        [C.DupAccount]: [v.DupAccount],
        [C.FuncNotOpen]: [v.FuncNotOpen],
        [C.OtherLogined]: [v.OtherLogined],
        [C.ItemNotEnough]: [v.ItemNotEnough],
        [C.EatMax]: [v.EatMax],
        [C.LvlMax]: [v.LvlMax],
        [C.CantBuySelfGoods]: [v.CantBuySelfGoods],
        [C.GoodsPriceError]: [v.GoodsPriceError],
        [C.NoGoods]: [v.NoGoods],
        [C.TradeNumLiimit]: [v.TradeNumLiimit],
        [C.NotYourGoods]: [v.NotYourGoods],
        [C.GoodsSold]: [v.GoodsSold],
        [C.CopperNotEnough]: [v.CopperNotEnough],
        [C.TradeError]: [v.TradeError],
        [C.PlayerNotEnough]: [v.PlayerNotEnough],
        [C.InvalidData]: [v.InvalidData],
        [C.NoData]: [v.NoData],
        [C.AbnormalData]: [v.AbnormalData],
        [C.HasGot]: [v.HasGot],
        [C.Nonstandard]: [v.Nonstandard],
        [C.NoUserData]: [v.NoUserData],
        [C.NoItem]: [v.NoItem],
        [C.IsAct]: [v.IsAct],
        [C.NotAct]: [v.NotAct],
        [C.LvMax]: [v.LvMax],
        [C.NoClub]: [v.NoClub],
        [C.WaitClubCheck]: [v.WaitClubCheck],
        [C.ClubMbSizeLimit]: [v.ClubMbSizeLimit],
        [C.NoPrivileges]: [v.NoPrivileges],
        [C.HadClub]: [v.HadClub],
        [C.ClubApplied]: [v.ClubApplied],
        [C.ViceChairmanFull]: [v.ViceChairmanFull],
        [C.ClubNameDup]: [v.ClubNameDup],
        [C.MemberOffClub]: [v.MemberOffClub],
        [C.ChairmanCantOff]: [v.ChairmanCantOff],
        [C.IllegalRequest]: [v.IllegalRequest],
        [C.CantEquipArms]: [v.CantEquipArms],
        [C.InCD]: [v.InCD],
        [C.CreateRoleErr]: [v.CreateRoleErr],
        [C.ClubErr]: [v.ClubErr],
        [C.TradeErr]: [v.TradeErr],
        [C.WorldServerErr]: [v.WorldServerErr],
        [C.DBServerErr]: [v.DBServerErr],
        [C.PassUnable]: [v.PassUnable],
        [C.vitMax]: [v.vitMax],
        [C.soldOut]: [v.soldOut],
        [C.vitNotEnough]: [v.vitNotEnough],
        [C.InBattle]: [v.InBattle],
        [C.MCNotEnough]: [v.MCNotEnough],
        [C.TapTokenNotEnough]: [v.TapTokenNotEnough],
        [C.NoWearSkin]: [v.NoWearSkin],
        [C.NoSkin]: [v.NoSkin],
        [C.NoHero]: [v.NoHero],
        [C.UpLvLimit]: [v.UpLvLimit],
        [C.InputTooLong]: [v.InputTooLong],
        [C.IllegalChar]: [v.IllegalChar],
        [C.IsUsed]: [v.IsUsed],
        [C.CodeIsUsed]: [v.CodeIsUsed],
        [C.MailServerErr]: [v.MailServerErr],
        [C.WalletIsBind]: [v.WalletIsBind],
        [C.WalletBindFail]: [v.WalletBindFail],
        [C.WalletError]: [v.WalletError],
        [C.HasBindWallet]: [v.HasBindWallet],
        [C.InSettle]: [v.InSettle],
        [C.BanAccount]: [v.BanAccount],
        [C.BeKickoff]: [v.BeKickoff],
        [C.MapOver]: [v.MapOver],
        [C.NoTimes]: [v.NoTimes],
        [C.CannotBuy]: [v.CannotBuy],
        [C.GameOutTime]: [v.GameOutTime],
        [C.SessExpire]: [v.SessExpire],
        [C.NoBindWallet]: [v.NoBindWallet],
        [C.ItemReturned]: [v.ItemReturned],
        [C.PaymentSuccess]: [v.PaymentSuccess],
        [C.PaymentFail]: [v.PaymentFail],
        [C.NotSupportPurchase]: [v.NotSupportPurchase],
        [C.BindingSuccess]: [v.BindingSuccess],
        [C.MailSendSuccess]: [v.MailSendSuccess],
        [C.AccountBound]: [v.AccountBound],
        [C.LoginFail]: [v.LoginFail],
        [C.LoginSuccess]: [v.LoginSuccess],
        [C.ActivityOver]: [v.ActivityOver],
        [C.HasTeam]: [v.HasTeam],
        [C.NoTeam]: [v.NoTeam],
        [C.TeamMemberMax]: [v.TeamMemberMax],
        [C.TeamBattling]: [v.TeamBattling],
        [C.OnlyLeaderCanDo]: [v.OnlyLeaderCanDo],
        [C.NoTeamMember]: [v.NoTeamMember],
        [C.RankRewardOver]: [v.RankRewardOver],
        [C.CannotJoin]: [v.CannotJoin],
        [C.AccountNameInvalid]: [v.AccountNameInvalid],
        [C.PwdInvalid]: [v.PwdInvalid],
        [C.AccessDenied]: [v.AccessDenied],
        [C.WalletSignError]: [v.WalletSignError],
        [C.Maintain]: [v.Maintain],
        [C.WalletVerifyFail]: [v.WalletVerifyFail],
        [C.SecurityPwdInvalid]: [v.SecurityPwdInvalid],
        [C.PleaseSetSecurityPwd]: [v.PleaseSetSecurityPwd],
        [C.AlreadyOpenSkipPwd]: [v.AlreadyOpenSkipPwd],
        [C.NotOpenSkipPwd]: [v.NotOpenSkipPwd],
        [C.IsSet]: [v.IsSet],
        [C.NoTimesToday]: [v.NoTimesToday],
        [C.Cd12Hours]: [v.Cd12Hours],
        [C.Cd24Hours]: [v.Cd24Hours],
        [C.VerifyCodeError]: [v.VerifyCodeError],
        [C.TodayMaxWinCount]: [v.TodayMaxWinCount],
        [C.EmailBeBoundWeb]: [v.EmailBeBoundWeb],
        [C.EmailDupBindError]: [v.EmailDupBindError],
        [C.EleNotEnough]: [v.EleNotEnough],
        [C.ChatServerErr]: [v.ChatServerErr],
        [C.ForbidTalk]: [v.ForbidTalk],
        [C.MonthCardActived]: [v.MonthCardActived],
        [C.InvalidCode]: [v.InvalidCode],
        [C.ExpireCode]: [v.ExpireCode],
        [C.EmailBeBoundHasAsset]: [v.EmailBeBoundHasAsset],
        [C.EmailNotBound]: [v.EmailNotBound],
        [C.FantasyNotEnough]: [v.FantasyNotEnough],
        [C.SkinNoEle]: [v.SkinNoEle],
        [C.CanNotClearSP]: [v.CanNotClearSP],
        [C.ApprovalPending]: [v.ApprovalPending],
        [C.NotUser]: [v.NotUser],
        [C.NotAddFriendSelf]: [v.NotAddFriendSelf],
        [C.UnFriend]: [v.UnFriend],
        [C.FriendMax]: [v.FriendMax],
        [C.FriendExist]: [v.FriendExist],
        [C.NotWearSameTypeRune]: [v.NotWearSameTypeRune],
        [C.NotWearRuneRough]: [v.NotWearRuneRough],
        [C.NotResetRuneRough]: [v.NotResetRuneRough],
        [C.TooFarAway]: [v.TooFarAway],
        [C.VigorNotEnough]: [v.VigorNotEnough],
        [C.VigorMax]: [v.VigorMax],
        [C.DurableNotEnough]: [v.DurableNotEnough],
        [C.DurableMax]: [v.DurableMax],
        [C.TreasureNow]: [v.TreasureNow],
        [C.TransferBufFail]: [v.TransferBufFail],
        [C.NotOpenMap]: [v.NotOpenMap],
        [C.FFriendMax]: [v.FFriendMax],
        [C.InLive]: [v.InLive],
        [C.WebAccountBeBound]: [v.WebAccountBeBound],
        [C.GameAccountBeBound]: [v.GameAccountBeBound],
        [C.SeasonOver]: [v.SeasonOver],
        [C.BattleEnd]: [v.BattleEnd],
        [C.DiamondNotEnough]: [v.DiamondNotEnough],
        [C.WealthNotEnough]: [v.WealthNotEnough],
        [C.NoSeats]: [v.NoSeats],
        [C.KittyNotEnough]: [v.KittyNotEnough],
        [C.FishNotEntough]: [v.FishNotEntough],
        [C.GoodsOnceBuy]: [v.GoodsOnceBuy],
        [C.ItemGone]: [v.ItemGone],
        [C.ClubNotExist]: [v.ClubNotExist],
        [C.ClubOnList]: [v.ClubOnList],
        [C.RankServerErr]: [v.RankServerErr],
        [C.Helped]: [v.Helped],
        [C.HelpedMax]: [v.HelpedMax],
        [C.TokenNotEntough]: [v.TokenNotEntough],
        [C.TurnDayLimit]: [v.TurnDayLimit]
    };
    function ee(t) {
        return k((t = t,
        te[t] || 0))
    }
    function ie(_, u, t, p, g) {
        return p = p || et,
        new Promise((i,s)=>{
            let a = kt.create(p), n = it.errorSpawnImpl, o, r = (p.showLoading && (o = it.loadingImpl()),
            p.retryTimes || 0), h = 0 < r ? p.retryInterval || 1e3 : 0, l = "get" == u ? function(t) {
                let e = [];
                for (var i in t)
                    e.push(i + "=" + encodeURIComponent(t[i]));
                return e.join("&")
            }(t) : t;
            function c(t, e) {
                a.on(Laya.Event.COMPLETE, null, m),
                a.on(Laya.Event.ERROR, null, ()=>{
                    d(C.NetError, "networkd exception", !0)
                }
                ),
                a.send(t, e, u, "text", g)
            }
            function m(t) {
                var e = a.status;
                o && o(),
                200 == e ? (e = JSON.parse(t)).code ? d(e.code, e.message) : i(e) : s(),
                a.release()
            }
            function d(t, e, i) {
                if (i && 0 < r)
                    return setTimeout(()=>c(_, l), h),
                    void r--;
                o && o(),
                s({
                    code: t,
                    message: e
                }),
                p.showError && n && n(t, e),
                a.release()
            }
            c(_, l)
        }
        )
    }
    let w = new bt;
    function x(t, e, i, s) {
        return w.sendAndWait(t, e, i, s)
    }
    const se = {
        White: "#ffffff",
        Green: "#99FF82",
        Blue: "#4DDBFF",
        Yellow: "#FFF056",
        Orange: "#FF864A",
        Gray: "#D5D5D5",
        DarkGray: "#51413B",
        Brown: "#8F593E",
        Red: "#FF4E4E"
    }
      , ae = ((o = p = p || {})[o.None = 0] = "None",
    o[o.TaskMain = 1] = "TaskMain",
    o[o.TaskAchievement = 2] = "TaskAchievement",
    o[o.Launchpool = 3] = "Launchpool",
    o[o.FishRecharge = 4] = "FishRecharge",
    o[o.ConnectWalletForBuyFishRecharge = 100] = "ConnectWalletForBuyFishRecharge",
    o[o.ConnectWalletForClubRecharge = 101] = "ConnectWalletForClubRecharge",
    o[o.ConnectWalletForSignInSpeed = 102] = "ConnectWalletForSignInSpeed",
    o[o.CheckOrderForSignInSpeed = 103] = "CheckOrderForSignInSpeed",
    o[o.ConnectWalletForFirstRecharge = 104] = "ConnectWalletForFirstRecharge",
    o[o.CheckOrderForFirstRecharge = 105] = "CheckOrderForFirstRecharge",
    o[o.ConnectWalletForTaskSignIn = 106] = "ConnectWalletForTaskSignIn",
    o[o.CheckOrderForTaskSignIn = 107] = "CheckOrderForTaskSignIn",
    (i = g = g || {})[i.Other = 0] = "Other",
    i[i.Tonkeeper = 1] = "Tonkeeper",
    i[i.TgWallet = 2] = "TgWallet",
    i[i.MetaMask = 3] = "MetaMask",
    i[i.OKX = 4] = "OKX",
    i[i.Bitget = 5] = "Bitget",
    i[i.Bybit = 6] = "Bybit",
    (e = Ht = Ht || {})[e.gameSignin = 1] = "gameSignin",
    e[e.taskSignin = 2] = "taskSignin",
    e[e.recharge = 3] = "recharge",
    e[e.deposit = 4] = "deposit",
    (r = Vt = Vt || {})[r.walletPay = 1] = "walletPay",
    r[r.tonConnect = 2] = "tonConnect",
    r[r.mantle = 3] = "mantle",
    r[r.star = 4] = "star",
    (v = b = b || {}).ton = "TON",
    v.mnt = "MNT",
    v.not = "NOT",
    v.star = "STAR",
    (o = Wt = Wt || {})[o.first = 1] = "first",
    o[o.buyFish = 2] = "buyFish",
    o[o.clubBooster = 3] = "clubBooster",
    o[o.notGift = 4] = "notGift",
    {
        [g.Other]: "other",
        [g.Tonkeeper]: "tonkeeper",
        [g.TgWallet]: "tgwallet",
        [g.MetaMask]: "metamask",
        [g.OKX]: "okx",
        [g.Bitget]: "bitget",
        [g.Bybit]: "bybit"
    })
      , ne = [g.MetaMask, g.OKX, g.Bitget, g.Bybit]
      , oe = {
        unknow: 1,
        insufficientFunds: 2
    }
      , T = {
        dailySignIn: 1,
        followTwitter: 2,
        retweenTitter: 3,
        joinTGGroup: 4,
        joinTGChannel: 5,
        becomePremium: 6,
        botUser: 8,
        inviteTotalUser: 9,
        invitePremiumUser: 10,
        cumulativeRecharge: 11,
        continuousSignIn: 12,
        loginCatizen: 14,
        dailyRecharge: 16,
        dailyInvite: 17,
        visitWebsite: 18,
        bitgetSignIn: 19,
        okxSignIn: 20,
        premiumBoots: 21,
        visitTelegramLink: 22
    }
      , re = [T.dailySignIn, T.botUser, T.loginCatizen, T.dailyRecharge];
    (i = Yt = Yt || {})[i.Basic = 1] = "Basic",
    i[i.Daily = 2] = "Daily",
    i[i.Premium = 3] = "Premium",
    i[i.Twitter = 4] = "Twitter",
    (e = Xt = Xt || {})[e.Signin = 1] = "Signin",
    e[e.NormalInvite = 2] = "NormalInvite",
    e[e.PremiumInvite = 3] = "PremiumInvite",
    e[e.Recharge = 4] = "Recharge";
    class S {
        static get(t, e=!1) {
            return e || (t += "_" + I.id),
            Laya.LocalStorage.getJSON(t) || ""
        }
        static set(t, e, i=!1) {
            i || (t += "_" + I.id),
            Laya.LocalStorage.setJSON(t, e)
        }
        static removeItem(t, e=!1) {
            e || (t += "_" + I.id),
            Laya.LocalStorage.removeItem(t)
        }
    }
    S.s_musicDisable = "CAT_MUSIC_DISABLE",
    S.s_soundDisable = "CAT_SOUND_DISABLE",
    S.s_taskRedCheck = "CAT_TASK_RED_CHECK",
    S.s_signInSpeedOrderTime = "CAT_SIGN_IN_SPEED_ORDER_TIME",
    S.s_firstRechargeOrderTime = "CAT_FIRST_RECHARGE_ORDER_TIME",
    S.s_notCoinGiftOrderTime = "NOTCOIN_GIFT_ORDER_TIME",
    S.s_taskId = "CAT_TASK_ID",
    S.s_fishSkipFlag = "FISH_SKIP_FLAG",
    S.s_taskSigninTime = "CAT_TASK_SIGNIN_TIME",
    S.s_autoPlusGift = "AUTO_PLUS_GIFT",
    S.s_autoPlusGold = "AUTO_PLUS_GOLD",
    S.s_signInRechargeGift = "SIGN_IN_Recharge_Gift",
    S.s_signInDayGift = "SIGN_IN_Day_Gift",
    S.s_signInDayGiftLastTime = "SIGN_IN_Day_Gift_Last_Time";
    let I = new class {
        constructor() {
            this.bag = {},
            this.rechargeIds = [],
            this.bcId = 0,
            this.offLine = null,
            this._linkType = p.None,
            this.fishData = null,
            this.wCati = "0",
            this.xZen = "0"
        }
        retainLink(t) {
            this._linkType = t
        }
        releaseLink() {
            var t = this._linkType;
            return this._linkType = p.None,
            t
        }
        init(t) {
            this.id = t.id,
            this.counts = t.counts,
            this.xZen = t.xZen,
            this.name = t.name,
            this.accountName = t.accountName,
            this.bag = t.bag,
            this.wCati = t.wCati,
            this._icon = +t.icon,
            this.m_fishCoin = t.fishCoin,
            this.fishData = t.fishData,
            P.lunch.stakeCats = t.stakeCats,
            this.freeCd = +t.exData.speedFreeTime,
            this.boostEndTime = +t.boostEndTime,
            this.chainCd = +t.exData.SpeedChainTime,
            P.cat.initCat(t),
            this.exdata = t.exData || {},
            this.m_gold = t.gold || 0,
            this.bcId = t.bcId,
            this.rankGold = t.rankGold,
            this.randomEvent = t.randomEvent,
            0 < this.bcId && (window.mbplatform.blockchainId = this.bcId),
            this.parseLinkType()
        }
        parseLinkType() {
            let e = p.None;
            if (window.Telegram) {
                var i = window.Telegram.WebApp.initDataUnsafe;
                if (i && i.start_param) {
                    let t = i.start_param;
                    i = t.split("_");
                    "open" == i[0] && i[1] && (e = parseInt(i[1]))
                }
            }
            e || (i = window.GameUrlParas || {},
            e = parseInt(i.open) || p.None),
            e && (this.retainLink(e),
            e == p.CheckOrderForSignInSpeed ? S.set(S.s_signInSpeedOrderTime, Date.now()) : e == p.CheckOrderForFirstRecharge ? S.set(S.s_firstRechargeOrderTime, Date.now()) : e == p.CheckOrderForTaskSignIn && S.set(S.s_taskSigninTime, Date.now()))
        }
        tokensInfoChange(t) {
            t.info.fishCoinDelta && "0" != t.info.fishCoinDelta && (this.fishCoin = +t.info.fishCoin),
            t.info.goldDelta && "0" != t.info.goldDelta && (this.gold = +t.info.gold),
            t.info.wCatiDelta && "0" != t.info.wCatiDelta && (this.wCati = t.info.wCati),
            t.info.xZenDelta && "0" != t.info.xZenDelta && (this.xZen = t.info.xZen)
        }
        countsChangeNtf(t) {
            this.counts = t.counts
        }
        set fishCoin(t) {
            this.m_fishCoin = t,
            P.event(y.FISHCOIN_CHANGE)
        }
        set gold(t) {
            this.m_gold = t,
            P.event(y.UPDATE_ITEM)
        }
        get gold() {
            return this.m_gold
        }
        get fishCoin() {
            return this.m_fishCoin
        }
        updateTokens(t) {}
        get icon() {
            return this._icon
        }
        set icon(t) {
            this._icon = t
        }
        getCountByType(t) {
            let e = 0;
            var i;
            return this.counts[t] && (i = 1e3 * +this.counts[t].refreshTime,
            Dt,
            Date.newDate(i).isToday() && (e = this.counts[t].count)),
            e
        }
        getBuyedGoods(t) {
            return !(!this.exdata || !this.exdata.buyGoods) && 0 < this.exdata.buyGoods[t]
        }
        addBuyedGoods(t) {
            t <= 0 || (this.exdata.buyGoods || (this.exdata.buyGoods = {}),
            this.exdata.buyGoods[t] ? this.exdata.buyGoods[t] += 1 : this.exdata.buyGoods[t] = 1)
        }
        updateRecharge(t) {
            t && 0 != t.length ? this.rechargeIds = t : this.rechargeIds = [],
            this.checkRecharge()
        }
        checkRecharge() {
            var t;
            this.rechargeIds && 0 != this.rechargeIds.length && (t = this.rechargeIds[0],
            this.receiveRecharge(t).then(t=>{
                this.rechargeIds.splice(0, 1),
                this.checkRecharge()
            }
            ))
        }
        receiveRecharge(t) {
            let e = pb.ReceiveRechargeReq.create();
            return e.id = t,
            x(e, l.ReceiveRechargeReq, pb.IReceiveRechargeAck).then(t=>{
                this.addBuyedGoods(t.GoodsId);
                var e = +t.addFishCoin || 0
                  , i = (0 < e && (this.fishCoin = +t.FishCoin || 0,
                P.event(y.UPDATE_ITEM)),
                +t.addGold || 0)
                  , s = (i && (this.gold = +t.Gold || 0),
                +t.addXZen || 0)
                  , a = (s && (this.xZen = t.XZen),
                Data.getGoods(t.GoodsId))
                  , a = a && a.boxNum || 0;
                return t.GoodsId == Lt.dayGoods ? P.event(y.DAY_EVENT_GOODS_CLAIM_SUCCESS) : (e || a || s) && P.event(y.RECHARGE_SUCCESS, [e, i, a, s]),
                t
            }
            )
        }
        checkFirstReCharge() {
            return !!this.exdata.buyGoods[1001]
        }
        checkNotcoinGiftReCharge() {
            return !!this.exdata.buyGoods[1002]
        }
        getWalletAddress(t) {
            let e = pb.GetWalletAddrReq.create();
            return e.rawAddress = t,
            x(e, l.GetWalletAddrReq, pb.IGetWalletAddrAck).then(t=>t)
        }
        requestPrePay(t) {
            let e = pb.RequestPrePayReq.create();
            return e.id = t,
            x(e, l.RequestPrePayReq, pb.IRequestPrePayAck).then(t=>t)
        }
        reqGetFreeBoxNumGet() {
            return x(pb.GetFreeBoxNumReq.create(), l.GetFreeBoxNumReq, pb.IGetFreeBoxNumAck).then(t=>(this.randomEvent = t.randomEventData,
            this.counts = t.counts,
            this.checkRandomBox(),
            t))
        }
        requestPay(t, e, i) {
            let s = pb.RequestPayReq.create();
            return s.id = t,
            s.payType = e,
            s.currencyCode = i,
            x(s, l.RequestPayReq, pb.IRequestPayAck)
        }
        BCCheckIn(t) {
            let e = pb.BCCheckInReq.create();
            return e.checkInType = t,
            x(e, l.BCCheckInReq, pb.IBCCheckInAck)
        }
        updateBCCheckIn(t, e, i) {
            let s = pb.BCCheckInDataReq.create();
            return s.checkInType = t,
            s.payData = e,
            s.checkInData = i,
            x(s, l.BCCheckInDataReq, pb.IBCCheckInDataAck).then(t=>t).catch(t=>(this._bcCheckParam = s,
            t))
        }
        retryUpdateBCCheckIn() {
            this._bcCheckParam && (x(this._bcCheckParam, l.BCCheckInDataReq, pb.IBCCheckInDataAck),
            this._bcCheckParam = null)
        }
        payClubBooster(t, e, i, s) {
            let a = pb.PayClubBoosterReq.create();
            return a.clubId = t,
            a.amount = e,
            a.payType = i,
            a.currencyCode = s,
            x(a, l.PayClubBoosterReq, pb.IPayClubBoosterAck)
        }
        serverMessageEvent(t) {
            0 < t.retCode && u(ee(t.retCode)),
            t.eventType && t.eventType == Lt.clubBooster && P.event(y.RECHARGE_SUCCESS)
        }
        getPurchaseGoods() {
            var t = Data.getChannel(Mmobay.MConfig.channelId);
            if (!t)
                return [];
            let e = []
              , i = []
              , s = [];
            for (const r in Data.Recharges) {
                var a, n = Data.getRecharge(+r), o = n.id, n = n[t.name];
                n && n.length && ((a = Data.getGoods(o)).type != At.normalGoods && a.type != At.dayGoods || (a.type == At.dayGoods ? 0 == I.getCountByType(a.id) ? i : s : e).push({
                    id: o,
                    name: a.name,
                    iconId: +a.iconId,
                    price: +n[1],
                    amount: a.fishCoin,
                    extra: a.extraFishCoin,
                    showDouble: !this.getBuyedGoods(o) && a.type != At.dayGoods,
                    dropBoxNum: a.boxNum,
                    goodsType: a.type,
                    xenNum: +a.xZen
                }))
            }
            return e = [].concat(i, e, s)
        }
        reqRandomEvent() {
            return x(pb.RandomEventReq.create(), l.RandomEventReq, pb.IRandomEventAck).then(t=>{
                this.randomEvent = t.randomEventData,
                P.event(y.RANDOM_EVENT_TIME_CHANGE),
                P.event(y.UPDATE_SPEED)
            }
            )
        }
        reqGetRandomEventAward(t=Pt.close) {
            let e = pb.GetRandomEventAwardReq.create();
            return e.opType = t,
            x(e, l.GetRandomEventAwardReq, pb.IGetRandomEventAwardAck).then(t=>{
                this.randomEvent = t.randomEventData,
                this.fishCoin = +t.fishCoin || 0,
                P.event(y.UPDATE_ITEM),
                this.checkRandomBox(),
                P.event(y.RANDOM_EVENT_TIME_CHANGE),
                P.event(y.UPDATE_SPEED)
            }
            )
        }
        reqGetRandomEventBox() {
            var t = pb.GetRandomEventBoxReq.create();
            let s = P.cat.allcats;
            return x(t, l.GetRandomEventBoxReq, pb.IGetRandomEventBoxAck, {
                noLoading: !0
            }).then(e=>{
                this.randomEvent = e.randomEventData;
                let i = 0;
                for (let t = 0; t < e.cats.length; t++)
                    !s[t] && e.cats[t] && (P.cat.airDropMap[t] = 1,
                    P.cat.allcats[t] = e.cats[t],
                    Laya.timer.once(50 * i, this, t=>{
                        P.event(y.AIR_DROP, [t, !1])
                    }
                    , [t]),
                    i++);
                P.event(y.UPDATE_CAT)
            }
            )
        }
        reqTonExchangeRate() {
            return x(pb.TonExchangeRateReq.create(), l.TonExchangeRateReq, pb.ITonExchangeRateAck).then(t=>t)
        }
        reqClubGroupUserName(t, e) {
            let i = pb.ClubGroupUserNameReq.create();
            return i.clubId = e,
            i.groupUserId = t,
            x(i, l.ClubGroupUserNameReq, pb.IClubGroupUserNameAck).then(t=>t)
        }
        checkRandomBox() {
            if (I.randomEvent && !(I.randomEvent.boxNum <= 0)) {
                var i = P.cat.allcats;
                let e = 0;
                for (let t = 0; t < i.length; t++)
                    i[t] || e++;
                e && this.reqGetRandomEventBox()
            }
        }
        doInviteAction(t) {
            Laya.Browser.onAndroid && window.mbplatform.disableClosingConfirmation();
            let e = `https://t.me/${Zt()}/gameapp?startapp=`;
            P.club.clubInfo && P.club.clubInfo.id ? e += `r_${P.club.clubInfo.id}_` + this.id : e += "rp_" + this.id;
            t = encodeURIComponent(t || `💰Catizen: Unleash, Play, Earn - Where Every Game Leads to an Airdrop Adventure!
🎁Let's play-to-earn airdrop right now!`),
            t = `https://t.me/share/url?url=${e}&text=` + t;
            window.mbplatform.openTelegramLink(t),
            Laya.Browser.onAndroid && window.mbplatform.closeApp()
        }
        doShareToTg(t, e) {
            window.mbplatform.disableClosingConfirmation();
            t = `https://t.me/${Zt()}?start=sg_${t}_` + e;
            window.mbplatform.openTelegramLink(t),
            window.mbplatform.closeApp()
        }
        doCreateClubAction() {
            window.mbplatform.disableClosingConfirmation();
            var t = "https://t.me/" + Zt() + "?start=cc";
            window.mbplatform.openTelegramLink(t),
            window.mbplatform.closeApp()
        }
        toPremiumTg() {
            window.mbplatform.disableClosingConfirmation();
            window.mbplatform.openTelegramLink("https://t.me/premium"),
            window.mbplatform.closeApp()
        }
        toSquadChat(t, e) {
            this.reqClubGroupUserName(t, e).then(t=>{
                window.mbplatform.disableClosingConfirmation();
                t = "https://t.me/" + t.groupUserName;
                window.mbplatform.openTelegramLink(t),
                window.mbplatform.closeApp()
            }
            )
        }
    }
    ;
    Mmobay.MConfig.showNetLog && (window.me = I);
    class he {
        constructor() {
            this.tapTokenPrice = .013,
            this.mcTokenPrice = .62
        }
        initAccount(t) {
            this.accountId = t.accountId,
            this.accountName = t.name,
            this.status = t.status
        }
        isForbidTalk() {
            return this.status == Nt.forbidTalk
        }
        accountInfoChange(t) {
            this.status = t.status
        }
        updateGold(t) {
            t.fishCoin && (I.fishCoin = +t.fishCoin),
            t.gold && (I.gold = +t.gold)
        }
    }
    Mmobay.MConfig.showNetLog && (window.reqTest = function(t, e, i) {
        t = pb[t].create();
        return Object.assign(t, i),
        x(t, e, pb.IBindWalletAck).then(t=>{
            console.log(t)
        }
        )
    }
    );
    class le {
        updateItem(t) {
            for (var e of t)
                I.bag[e.id] = e.num;
            P.event(y.UPDATE_ITEM)
        }
        getItemNum(t) {
            return I.bag[t] || 0
        }
        showBox(t) {}
        reqBuyItem(t, e) {}
    }
    var ce = Laya.SoundManager;
    class D {
        constructor() {
            this._musicDisable = !1,
            this._soundDisable = !1,
            this._musicVolume = 1,
            this._soundVolume = 1
        }
        static get instance() {
            return D._instance || (D._instance = new D),
            D._instance
        }
        init() {
            this._musicDisable = S.get(S.s_musicDisable),
            this._soundDisable = S.get(S.s_soundDisable)
        }
        get lastMusic() {
            return this._lastMusic
        }
        set lastMusic(t) {
            this._lastMusic = t
        }
        get musicEnable() {
            return !this._musicDisable
        }
        set musicEnable(t) {
            this._musicDisable = !t
        }
        get soundEnable() {
            return !this._soundDisable
        }
        set soundEnable(t) {
            this._soundDisable = !t
        }
        get musicVolume() {
            return this._musicVolume
        }
        set musicVolume(t) {
            this._musicVolume = t,
            ce.setMusicVolume(t)
        }
        get soundVolume() {
            return this._soundVolume
        }
        set soundVolume(t) {
            this._soundVolume = t,
            ce.setSoundVolume(t)
        }
        playMusic(t, e=0, i) {
            t && this.musicEnable && (this._lastMusic = t,
            t = this.formatUrl(t = "cat/bgm/" + t),
            this._musicChannel && this._musicChannel.url.includes(t) ? this._musicChannel.isStopped && this._musicChannel.resume() : this._musicChannel = ce.playMusic(t, e, i))
        }
        playSound(t, e=1, i) {
            t && this.soundEnable && 0 != this.soundVolume && (t = this.formatUrl(t = "cat/sound/" + t),
            ce.playSound(t, e, i))
        }
        pauseMusic() {
            this._musicChannel && this._musicChannel.pause()
        }
        resumeMusic() {
            this._musicChannel && this._musicChannel.resume()
        }
        stopMusic() {
            ce.stopMusic(),
            this._musicChannel = null
        }
        stopSound(t) {
            t ? (t = this.formatUrl(t = "cat/sound/" + t),
            ce.stopSound(t)) : ce.stopAllSound()
        }
        stopAll() {
            ce.stopAll(),
            this._musicChannel = null
        }
        formatUrl(t) {
            return t = t.replace(".ogg", "mp3")
        }
    }
    function L(t, e, i, s) {
        var a, n = arguments.length, o = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            o = Reflect.decorate(t, e, i, s);
        else
            for (var r = t.length - 1; 0 <= r; r--)
                (a = t[r]) && (o = (n < 3 ? a(o) : 3 < n ? a(e, i, o) : a(e, i)) || o);
        3 < n && o && Object.defineProperty(e, i, o)
    }
    function A(r, h) {
        const l = "_modelEvents";
        return function(t, e, i) {
            let s;
            if (t.hasOwnProperty(l))
                s = t[l];
            else {
                var a = t[l];
                if (t[l] = s = [],
                a)
                    for (var n in a) {
                        var o = a[n];
                        o.isPri || (s[n] = o)
                    }
            }
            s.push({
                eventType: r,
                handler: i.value,
                isPri: h
            })
        }
    }
    class me extends t.cat.views.fish.FishAutoDlgUI {
        onAwake() {
            super.onAwake(),
            this.m_view_Count.setData(1, Math.min(+Data.gameConf.fishCfg.maxNum, Math.floor(I.fishCoin / +Data.gameConf.fishCfg.costCoin)), 1),
            this.updateView();
            var t = Mmobay.LocalStorage.get(S.s_fishSkipFlag) || 0;
            this.m_rg_Skip.selected = !!t
        }
        updateView() {
            var t = Math.max(1, this.m_view_Count.count) * +Data.gameConf.fishCfg.costCoin;
            this.m_txt_Sel.text = "/" + t,
            this.m_txt_Num.text = I.fishCoin + "",
            this.m_txt_Num.color = I.fishCoin >= t ? "#764428" : se.Red
        }
        onClickAuto() {
            var t = this.m_rg_Skip.selected;
            Mmobay.LocalStorage.set(S.s_fishSkipFlag, t),
            this.closeDialog(this.m_view_Count.count ? h.Yes : h.No, [this.m_view_Count.count, t])
        }
    }
    L([A(y.COUNT_CHANGE)], me.prototype, "updateView", null);
    class de extends t.cat.views.fish.FishHistoryCellViewUI {
        dataChanged(t) {
            t ? this.dataSource = t : t = this.dataSource,
            Object.assign(this.m_div_Tip.style, {
                fontSize: 18,
                bold: !0,
                color: +t.param[1].val == Data.getFish(101).name ? se.Yellow : se.White,
                leading: 3,
                wordWrap: !0,
                width: 500
            }),
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && +t.param[1].val == Data.getFish(123).name && (t.param[1].val = Data.getFish(126).name),
            this.m_div_Tip.innerHTML = P.sysNotice.parseSysMsg(t) + "",
            this.height = this.m_div_Tip.contextHeight + 4
        }
    }
    function _e(n, e="D:HH:MM:ss") {
        n < 0 && (n = 0);
        let t = /D|([HhMs])\1?|S/
          , o = -1
          , r = -1
          , h = []
          , l = [];
        function i(e, t, i) {
            var s = Math.floor(+n / e);
            if (h.push(i),
            l.push(s),
            0 < s ? ((r = -1) == o && (o = i),
            n = +n % e) : -1 == r && (r = i),
            t) {
                var [e,a=2] = [s];
                let t = String(e);
                for (; t.length < a; )
                    t = "0" + t;
                return t
            }
            return s + ""
        }
        let s = 0
          , a = !1
          , c = "";
        for (; c != e; )
            "" != c && (e = c),
            c = e.replace(t, t=>{
                switch (s = 0,
                a = !1,
                t) {
                case "D":
                    s = 86400,
                    a = !0;
                    break;
                case "hh":
                case "HH":
                    a = !0;
                case "h":
                case "H":
                    s = 3600;
                    break;
                case "MM":
                    a = !0;
                case "M":
                    s = 60;
                    break;
                case "ss":
                    a = !0;
                case "s":
                case "S":
                    s = 1
                }
                return i(s, a, e.indexOf(t))
            }
            );
        let m = ""
          , d = e.indexOf("#");
        if (-1 < d && (m = -1 == o ? e.slice(d, d + 1) : e.slice(d, o)),
        -1 < (d = e.indexOf("&")) && ("" != m && (m += "|"),
        -1 == r ? m += e.slice(d, d + 1) : m += e.slice(r, d + 1)),
        -1 < (d = e.indexOf("@"))) {
            "" != m ? m += "|@" : m += "@";
            for (let t = 0; t < h.length; t++)
                0 == l[t] && (m = (m += "|") + e.slice(h[t], null == h[t + 1] ? d : h[t + 1]))
        }
        t = new RegExp(m,"g");
        let _ = (e = e.replace(t, "")).split(":");
        return 4 == _.length && "00" == _[0] && (_.shift(),
        e = _.join(":")),
        e
    }
    class E {
        constructor(t, e, i, s) {
            this.disposed = !1,
            this._endTime = t,
            this._interval = e,
            this._timeLabel = i,
            this._format = s
        }
        static create(t, e=1e3, i, s="D:HH:MM:ss") {
            return new E(t,e,i,s)
        }
        bindLabel(t) {
            this._timeLabel = t
        }
        set endTime(t) {
            this._endTime != t && (this._endTime = t)
        }
        get endTime() {
            return this._endTime
        }
        start() {
            Laya.timer.loop(this._interval, this, this.onTimerLoop),
            this.onTimerLoop()
        }
        onTimerLoop() {
            var t = Date.newDate().getTime();
            let e = this._endTime - t
              , i = (e <= 0 && (Laya.timer.clear(this, this.onTimerLoop),
            e = 0),
            e = Math.round(e / 1e3),
            "");
            if (i = null == this._format ? _e(e) : _e(e, this._format),
            this._timeLabel) {
                if (this._timeLabel.destroyed)
                    return void this.dispose();
                this._timeLabel.text = i
            }
            this.onTick && this.onTick(e),
            e <= 0 && Laya.timer.once(this._interval || 1e3, this, ()=>{
                this.onEnd && this.onEnd(),
                this.dispose()
            }
            )
        }
        dispose() {
            Laya.timer.clear(this, this.onTimerLoop),
            this._endTime = void 0,
            this._format = void 0,
            this._interval = void 0,
            this._timeLabel = null,
            this.onTick && (this.onTick = null),
            this.onEnd && (this.onEnd = null),
            this.disposed = !0
        }
    }
    class ue extends t.cat.views.fish.FishRewardDetailDlgUI {
        constructor() {
            super(...arguments),
            this.m_sel = 0
        }
        onAwake() {
            super.onAwake(),
            this.updateView(),
            ue.instance = this
        }
        onDestroy() {
            super.onDestroy(),
            ue.instance = null
        }
        updateView() {
            P.fish.reqMyFishInfo().then(t=>{
                t = this.getRank(+t.myRank);
                t && this.m_view_Me.dataChanged(null, {
                    settleCfg: t,
                    isSelf: !0
                }),
                this.m_view_Me.visible = !!t,
                this.m_txt_No.visible = !t;
                let e = []
                  , i = P.fish.getRankDetail();
                i.forEach(t=>{
                    e.push({
                        settleCfg: t,
                        isSelf: !1
                    })
                }
                ),
                this.m_lst_Rank.array = e
            }
            )
        }
        getRank(t) {
            if (!t || t < 0)
                return null;
            for (var e in Data.fishSettles) {
                e = Data.getFishSettle(+e);
                if (+e.start <= t && +e.end >= t)
                    return e
            }
        }
        onSelectType() {
            this.updateView()
        }
    }
    class pe extends t.cat.views.fish.FishRewardRuleDlgUI {
    }
    class ge extends t.cat.views.fish.FishRankDlgUI {
        onAwake() {
            super.onAwake(),
            P.fish.reqFishRank().then(t=>{
                this.updateView(t)
            }
            )
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clearAll(this),
            this.tick && this.tick.dispose(),
            this.tick_pool && this.tick_pool.dispose()
        }
        updateView(t) {
            this.tick && this.tick.dispose();
            let e = this.tick = E.create((i = Date.getMondayZeroTime().addDays(7).getTime(),
            0 < (s = Date.newDate().getTime() - i) ? (s = Math.ceil(s / 6048e5),
            Date.getMondayZeroTime().addDays(7 * (s + 1)).getTime()) : i), 1e3, this.m_txt_Time);
            var i, s;
            e.onEnd = ()=>{
                P.fish.reqFishRank().then(t=>{
                    this.updateView(t)
                }
                )
            }
            ,
            e.start();
            let a = [];
            t.forEach(t=>{
                a.push({
                    rankData: t,
                    isSelf: !1
                })
            }
            ),
            this.m_lst_Rank.array = a,
            P.fish.reqMyFishInfo().then(t=>{
                this.m_view_Me.visible = t.myRank && 0 < +t.myRank,
                this.m_txt_No.visible = !this.m_view_Me.visible,
                this.m_view_Me.visible && this.m_view_Me.dataChanged(null, {
                    rankData: {
                        userId: I.id,
                        rank: t.myRank,
                        score: t.myScore,
                        rankKey: t.myRankKey,
                        name: I.name,
                        icon: I.icon,
                        channelID: Mmobay.MConfig.channelId
                    },
                    isSelf: !0
                })
            }
            ),
            this.updatePool(),
            Laya.timer.loop(1e4, this, ()=>{
                this.updatePool(!0)
            }
            )
        }
        updatePool(t=!1) {
            P.fish.reqFishPool(t).then(()=>{
                this.checkBonusShow()
            }
            )
        }
        checkBonusShow() {
            if (this.m_txt_BonusNum.text) {
                if (this.m_oldPool != P.fish.m_fishPool) {
                    var i = Date.newDate().addMilliseconds(1e3).getTime();
                    this.tick_pool = E.create(i, 80);
                    let t = 0
                      , e = P.fish.m_fishPool - this.m_oldPool;
                    this.tick_pool.onTick = ()=>{
                        8 < t ? (this.m_oldPool = P.fish.m_fishPool,
                        this.m_txt_BonusNum.text = f(P.fish.m_fishPool)) : this.m_txt_BonusNum.text = f(this.m_oldPool + e / 8 * t),
                        t++
                    }
                    ,
                    this.tick_pool.start()
                }
            } else
                this.m_oldPool = P.fish.m_fishPool,
                this.m_txt_BonusNum.text = f(P.fish.m_fishPool)
        }
        onClickDetail() {
            d(ue)
        }
        onClickInfo() {
            d(pe)
        }
    }
    class Ce extends t.cat.views.fish.FishRuleDlgUI {
    }
    class ye extends t.cat.views.fish.FishSuccDlgUI {
        constructor(t, e=!1, i=!1) {
            super(),
            this.m_data = null,
            this.m_isAuto = !1,
            this.m_isFomo = !1,
            this.m_data = t,
            this.m_isAuto = e,
            this.m_isFomo = i
        }
        onAwake() {
            super.onAwake(),
            this.showUI(),
            D.instance.playSound("getfish.mp3")
        }
        showUI() {
            var t = this.m_data;
            let e = t.fishId;
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && 123 == e && (e = 126);
            var i, s = Data.getFish(e), a = (this.m_txt_Title.text = s && k(s.name),
            Data.getFishEvent(2)), n = a.goldMultiple[I.rankLeague] || 0, a = a.fishCoinMultiple || 0;
            0 < +this.m_data.addFishCoin ? (this.m_txt_FishCoin.text = this.m_isFomo ? "x" + f(+this.m_data.addFishCoin / a) : "x" + f(this.m_data.addFishCoin),
            this.m_box_FishCoin.visible = !0,
            this.m_isFomo && 0 < +a ? (this.m_box_Fomo.visible = !0,
            this.m_img_GetFish.height = 190,
            this.m_txt_Fomo.text = "x" + a,
            this.m_box_GoldT.visible = !0,
            this.m_img_Total.skin = "cat/ui_item/8.png",
            this.m_txt_Total.text = f(+this.m_data.addFishCoin),
            this.height = 820) : (this.height = 730,
            this.m_img_GetFish.height = 100,
            this.m_box_Weight.centerY = 0)) : 0 < +this.m_data.addgold ? (this.m_box_Gold.visible = this.m_box_GoldT.visible = !0,
            this.m_txt_Speed.text = f(P.cat.getBaseSpeed()) + "/s",
            this.m_img_SpeedBg.width = this.m_txt_Speed.width + 40 + 10,
            a = s.sellWorth,
            this.m_txt_Times.text = " x" + Math.floor(a / 60),
            i = I.exdata.fishRobLvl || 0,
            i = Data.getFishRod(i),
            this.m_isFomo && i ? (this.height = 920,
            this.m_img_GetFish.height = 280,
            this.m_box_Rod.top = 115,
            this.m_box_Fomo.visible = this.m_box_Rod.visible = !0,
            this.m_txt_Fomo.text = "x" + n,
            this.m_txt_Rod.text = "x" + f(i.multiple),
            this.m_txt_Total.text = f(P.cat.getBaseSpeed() * a * +i.multiple * n)) : this.m_isFomo ? (this.height = 810,
            this.m_img_GetFish.height = 190,
            this.m_box_Fomo.visible = !0,
            this.m_txt_Fomo.text = "x" + n,
            this.m_txt_Total.text = f(P.cat.getBaseSpeed() * a * n)) : i ? (this.height = 810,
            this.m_img_GetFish.height = 190,
            this.m_box_Rod.visible = !0,
            this.m_txt_Rod.text = "x" + f(i.multiple),
            this.m_txt_Total.text = f(a * P.cat.getBaseSpeed() * +i.multiple)) : (this.height = 730,
            this.m_img_GetFish.height = 100,
            this.m_box_Rod.visible = !1,
            this.m_txt_Total.text = f(a * P.cat.getBaseSpeed()))) : (124 == s.id ? (this.m_txt_TipsNoFish.text = k(1048),
            this.m_img_RightCoin.skin = "cat/ui_fish/earn2.png") : 125 == s.id && (this.m_txt_TipsNoFish.text = k(1047),
            this.m_img_RightCoin.skin = "cat/ui_fish/earn3.png"),
            this.height = 650,
            this.m_img_GetFish.height = 130,
            this.m_img_TotalGold.visible = !1,
            this.m_txt_TipsNoFish.visible = !0,
            this.m_box_Rod.visible = this.m_box_FishCoin.visible = this.m_box_Gold.visible = !1,
            this.m_box_Weight.centerY = 0,
            this.m_img_LeftCoin.visible = this.m_img_RightCoin.visible = !0),
            this.m_img_Fish.skin = this.m_img_FishSmall.skin = `cat/ui_fish/${e}.png`,
            this.m_txt_Weight.text = P.fish.formatWeight(t.weight),
            t.newMax == t.myNewMax && t.newMax > t.oldMax ? (this.m_view_New.destroy(),
            this.m_img_Top.visible = !0) : t.myNewMax > t.myOldMax ? (this.m_img_Top.destroy(),
            this.m_view_New.visible = !0) : (this.m_img_Top.destroy(),
            this.m_view_New.destroy()),
            this.m_isAuto ? (this.m_btn_CloseB.visible = !0,
            this.m_btn_Continue.visible = !1,
            this.m_box_Continue.visible = !1) : (this.m_txt_Num.text = I.fishCoin + "",
            this.m_txt_Need.text = "/" + Data.gameConf.fishCfg.costCoin,
            this.m_btn_CloseB.visible = !1,
            this.m_btn_Continue.visible = !0,
            this.m_box_Continue.visible = !0)
        }
        onClickContinue() {
            this.closeDialog(),
            P.event(y.DO_CONTINUE_FISH)
        }
        onClickShare() {
            let t = this.m_data.fishId;
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && 123 == t && (t = 126),
            I.doShareToTg(2, t)
        }
    }
    class be extends Laya.EventDispatcher {
        constructor() {
            super(...arguments),
            this._isLoading = !1,
            this._isLoaded = !1,
            this._reference = 0,
            this._activeTime = 0
        }
        static registerTimer() {
            Laya.timer.loop(3e4, null, be.checkUnusedRes)
        }
        static checkUnusedRes() {
            if (be._resRef.size) {
                var e, i, s = Date.newDate().getTime();
                let t = be._resRef;
                for ([e,i] of t)
                    i.canDestroy(s) && (i.destroy(),
                    t.delete(e))
            }
        }
        static create(t) {
            let e = be._resRef.get(t);
            return e || (e = new be,
            be._resRef.set(t, e)),
            e.init(t),
            e
        }
        init(t) {
            this._url = t,
            this._reference++,
            this._activeTime = Date.newDate().getTime(),
            this._templet && !this._templet.destroyed || (this._isLoading = !1,
            this._isLoaded = !1,
            this._templet = new Laya.SpineTemplet_3_x,
            this._templet.once(Laya.Event.COMPLETE, this, this.onLoadComplete),
            this._templet.once(Laya.Event.ERROR, this, this.onLoadError))
        }
        destroy() {
            this.offAll(),
            this._templet && (this._templet.offAll(),
            this._templet.destroy(),
            this._templet = null)
        }
        canDestroy(t) {
            return !(0 < this._reference) && !(t - this._activeTime < 6e4)
        }
        recover() {
            this._reference--
        }
        loadAni() {
            this._isLoaded ? this.event(Laya.Event.COMPLETE) : this._isLoading || (this._isLoading = !0,
            this._templet.loadAni(this._url))
        }
        buildSkeleton() {
            return this._templet.buildArmature()
        }
        onLoadComplete() {
            this._isLoading = !1,
            this._isLoaded = !0,
            this._templet.offAll(),
            0 < this._reference && this.event(Laya.Event.COMPLETE)
        }
        onLoadError() {
            this._isLoading = !1,
            this._templet.offAll(),
            0 < this._reference && this.event(Laya.Event.ERROR)
        }
    }
    be._resRef = new Map,
    be.registerTimer();
    class R extends Laya.Sprite {
        constructor() {
            super(),
            this._index = -1,
            this._offset = [],
            this.size(100, 100).pivot(50, 50)
        }
        static create(t) {
            let e = U.get(R._sign, R);
            e.setData(t);
            var i = t.px || 0
              , s = t.py || 0
              , a = t.scale || 1;
            return e.pos(i, s),
            e.scale(a, a),
            e.zOrder = t.zOrder || 0,
            t.alpha || 0 == t.alpha ? e.alpha = t.alpha : e.alpha = 1,
            t.parent && t.parent.addChild(e),
            e
        }
        get skeleton() {
            return this._skeleton
        }
        setData(t) {
            this._url = t.url,
            this._autoPlay = !!t.autoPlay,
            this._autoRemove = !!t.autoRemove,
            this._loop = !!t.loop,
            this._rate = t.rate || 1,
            this._offset = t.offset || [],
            this._templet = be.create(this._url),
            this._templet.once(Laya.Event.COMPLETE, this, this.onLoadComplete),
            this._templet.once(Laya.Event.ERROR, this, this.onLoadError),
            this._templet.loadAni()
        }
        onDestroy() {
            this._templet && (this._templet.off(Laya.Event.COMPLETE, this, this.onLoadComplete),
            this._templet.off(Laya.Event.ERROR, this, this.onLoadError),
            this._templet.recover(),
            this._templet = null),
            this._skeleton = null
        }
        recover() {
            this.destroyed || (this.offAll(),
            this.removeSelf(),
            this._url = null,
            this._rate = 1,
            this._autoPlay = !1,
            this._autoRemove = !1,
            this._loop = !1,
            this._loaded = !1,
            this._index = -1,
            this._settedPos = !1,
            this._offset = [],
            this._playHandler && this._playHandler.recover(),
            this._playHandler = null,
            this._templet && (this._templet.off(Laya.Event.COMPLETE, this, this.onLoadComplete),
            this._templet.off(Laya.Event.ERROR, this, this.onLoadError),
            this._templet.recover(),
            this._templet = null),
            this._skeleton && !this._skeleton.destroyed && this._skeleton.destroy(),
            this._skeleton = null,
            U.put(R._sign, this))
        }
        play(t=0, e=!1, i=null) {
            this._index == t && this._loop == e || (e && (i = null),
            this._autoPlay = !0,
            this._index = t,
            this._loop = e,
            this._playHandler = i,
            this._play())
        }
        stop() {
            this._skeleton && this._skeleton.stop()
        }
        _play() {
            this._loaded && this._skeleton && ((this._index < 0 || this._index >= this._skeleton.getAnimNum()) && (this._index = 0),
            this._skeleton.play(this._index, this._loop),
            this.event(Laya.Event.START),
            this._settedPos || (this._settedPos = !0,
            this._offset.length ? this._skeleton.pos(50 - this._offset[0], 100 - this._offset[1]) : this._skeleton.pos(50, 100)))
        }
        onLoadComplete() {
            if (!this.destroyed) {
                this._loaded = !0;
                let t = this._skeleton = this._templet.buildSkeleton();
                t.playbackRate(this._rate),
                t.on(Laya.Event.STOPPED, this, this.onPlayComplete),
                this.addChild(t),
                this._autoPlay && this._play()
            }
        }
        onLoadError() {
            console.log("load spine error==>" + this._url)
        }
        onPlayComplete() {
            if (this._autoRemove && this.recover(),
            this._playHandler) {
                var e = this._playHandler.caller;
                if (e && e.destroyed)
                    return this._playHandler.recover(),
                    void (this._playHandler = null);
                let t = this._playHandler;
                this._playHandler = null,
                t.run()
            }
        }
        getAniIndexByName(e) {
            return this.skeleton ? this.skeleton.skeleton.data.animations.findIndex(t=>t.name == e) : 0
        }
    }
    R._sign = "p_Spine";
    class ve extends t.cat.views.fish.FishRewardDlgUI {
        constructor(t, e) {
            super(),
            this.m_rank = e,
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        updateView() {
            this.m_txt_Desc.text = k(1037, this.m_rank),
            this.m_txt_BonusNum.text = f(this.m_data)
        }
    }
    class ke extends t.cat.views.recharge.RechargeProcessingDlgUI {
        constructor() {
            super(...arguments),
            this.m_waitTimes = 45
        }
        onAwake() {
            super.onAwake(),
            this.m_txt_Time.text = this.m_waitTimes + "s",
            Laya.timer.loop(1e3, this, this.startWait)
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clear(this, this.startWait)
        }
        onRechargeSuccess() {
            this.closeDialog()
        }
        startWait() {
            this.m_waitTimes--,
            this.m_txt_Time.text = this.m_waitTimes + "s",
            this.m_waitTimes <= 0 && (Laya.timer.clear(this, this.startWait),
            this.m_txt_Time.visible = !1,
            this.m_txt_Info.visible = !1,
            this.m_txt_Timeount.visible = !0)
        }
    }
    L([A(y.RECHARGE_SUCCESS)], ke.prototype, "onRechargeSuccess", null);
    class fe extends t.cat.views.home.ChooseWalletDlgUI {
        constructor(t=[]) {
            super(),
            this.m_excludeWallets = [],
            this.m_excludeWallets = t
        }
        onAwake() {
            super.onAwake(),
            this.m_excludeWallets.forEach(t=>{
                let e = this.m_box_Wallets.getChildByName("Wallet" + t);
                e && (e.mouseEnabled = !1,
                e.gray = !0)
            }
            )
        }
        onClickWallet3(t) {
            this.closeDialog(h.Yes, g.MetaMask)
        }
        onClickWallet4(t) {
            this.closeDialog(h.Yes, g.OKX)
        }
        onClickWallet5(t) {
            this.closeDialog(h.Yes, g.Bitget)
        }
        onClickWallet6(t) {
            this.closeDialog(h.Yes, g.Bybit)
        }
    }
    class we extends t.cat.views.home.PurchaseMethodDlgUI {
        constructor(t) {
            super(),
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.updateWallet(),
            this.m_img_Icon.skin = this.m_data.icon,
            this.m_txt_Name.text = this.m_data.name,
            this.m_txt_PriceUsd.text = "= $" + this.m_data.price,
            this.m_txt_MantlePrice.text = (this.m_data.mntPrice || 0).toFixed(2) + " MNT",
            this.m_txt_StartPrice.text = `${this.m_data.starPrice || 0} Star`,
            this.m_data.tonOffPrice ? (this.m_txt_TonPrice.text = this.m_data.tonOffPrice.toFixed(2) + " TON",
            this.m_txt_TonOldPrice.text = this.m_data.tonPrice.toFixed(2) + " TON",
            this.m_box_TonOldPrice.width = this.m_txt_TonOldPrice.width + 20) : (this.m_txt_TonPrice.text = (this.m_data.tonPrice || 0).toFixed(2) + " TON",
            this.m_box_TonOldPrice.visible = !1,
            this.m_img_TonOff.visible = !1,
            this.m_box_TonPriceInfo.centerX = 0),
            this.m_data.notOffPrice ? (this.m_txt_NotPrice.text = this.m_data.notOffPrice.toFixed(2) + " NOT",
            this.m_txt_NotOldPrice.text = this.m_data.notPrice.toFixed(2) + " NOT",
            this.m_box_NotOldPrice.width = this.m_txt_NotOldPrice.width + 20) : (this.m_txt_NotPrice.text = (this.m_data.notPrice || 0).toFixed(2) + " NOT",
            this.m_box_NotOldPrice.visible = !1,
            this.m_img_NotOff.visible = !1,
            this.m_box_NotPriceInfo.centerX = 0);
            let t = this.getPurchaseType()
              , s = {
                [b.mnt]: this.m_btn_Mantle,
                [b.ton]: this.m_btn_Ton,
                [b.not]: this.m_btn_Not,
                [b.star]: this.m_btn_Star
            }
              , a = 260;
            t.forEach((t,e)=>{
                let i = s[t];
                i.y = 260 + 90 * e,
                i.visible = !0,
                a += 90
            }
            ),
            this.m_box_Content.height = a + 40
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clear(this, this.delayUnlockChainOperate)
        }
        updateWallet() {
            if (!P.wallet.connected)
                return this.m_btn_Wallet.visible = !1,
                void (this.m_btn_Disconnect.visible = !1);
            P.wallet.convertAddress().then(t=>{
                var e;
                this.destroyed || (e = t.length,
                this.m_btn_Wallet.visible = !0,
                this.m_txt_Wallet.text = t.substring(0, 4) + "..." + t.substring(e - 4, e))
            }
            )
        }
        onRechargeSuccess() {
            this.closeDialog()
        }
        getPurchaseType() {
            if (Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE)
                return [b.mnt];
            if (Mmobay.MConfig.isTonKeeper)
                return [b.ton, b.not];
            if (this.m_data.type == Wt.notGift)
                return [b.not];
            var t = Mmobay.UAParser.getInstance().getBrowser().name.toLocaleLowerCase()
              , e = (Laya.Browser.onIOS || Laya.Browser.onMac) && "webkit" == t
              , t = Laya.Browser.onAndroid && "chrome webview" == t;
            return e || t ? [b.star] : [b.ton, b.not, b.star]
        }
        checkPayData(t) {
            return new Promise((e,i)=>{
                (this.m_data.type == Wt.clubBooster ? I.payClubBooster(this.m_data.clubId, this.m_data.price, t, this.m_currencyCode).then(t=>{
                    if (Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_LOCAL)
                        return i();
                    e(t.payData)
                }
                ) : I.requestPay(this.m_data.goodsId, t, this.m_currencyCode).then(t=>{
                    if (Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_LOCAL)
                        return i();
                    e(t.payData)
                }
                )).catch(()=>{
                    i()
                }
                )
            }
            )
        }
        connectWallet() {
            return this.m_data.type == Wt.first ? I.retainLink(p.ConnectWalletForFirstRecharge) : this.m_data.type == Wt.buyFish ? I.retainLink(p.ConnectWalletForBuyFishRecharge) : this.m_data.type == Wt.clubBooster && I.retainLink(p.ConnectWalletForClubRecharge),
            new Promise((e,i)=>{
                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile || P.wallet.connected ? e() : P.wallet.connect().then(t=>{
                    this.destroyed || Laya.timer.once(500, this, ()=>{
                        this.destroyed || e()
                    }
                    )
                }
                ).catch(t=>{
                    i()
                }
                )
            }
            )
        }
        sendTransaction() {
            1 == this.m_data.type && I.retainLink(p.CheckOrderForFirstRecharge);
            let e = {
                amount: +this.m_payData.amount,
                address: this.m_payData.walletAddress,
                payload: this.m_payData.payload,
                transactionType: Ht.recharge
            };
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile ? d(fe, {
                showEffect: !1,
                retainPopup: !0
            }).then(t=>{
                t.wait().then(t=>{
                    t.type == h.Yes && (this.lockChainOperate(),
                    e.walletType = t.data,
                    P.wallet.sendTransaction(e).then(()=>{
                        this.destroyed || this.closeDialog(h.Yes)
                    }
                    ).catch(()=>{
                        this.unlockChainOperate()
                    }
                    ))
                }
                )
            }
            ) : (this.lockChainOperate(),
            P.wallet.sendTransaction(e).then(()=>{
                this.destroyed || this.closeDialog(h.Yes)
            }
            ).catch(t=>{
                this.unlockChainOperate(),
                t && t.code == oe.insufficientFunds && u(k(176, this.m_currencyCode))
            }
            ))
        }
        playWait() {
            return (this.m_currencyCode = b.mnt) ? (this.m_box_Mantle.visible = !1,
            this.m_img_MantleWait.visible = !0,
            this.m_btn_Mantle.disabled = !0,
            void this.ani2.play(0, !0)) : (this.m_btn_Ton.disabled = !0,
            this.m_btn_Not.disabled = !0,
            this.m_btn_Star.disabled = !0,
            this.m_currencyCode == b.ton ? (this.m_box_Ton.visible = !1,
            this.m_img_TonWait.visible = !0,
            void this.ani3.play(0, !0)) : void (this.m_currencyCode == b.not && (this.m_box_Not.visible = !1,
            this.m_img_NotWait.visible = !0,
            this.ani4.play(0, !0))))
        }
        stopWait() {
            return (this.m_currencyCode = b.mnt) ? (this.m_box_Mantle.visible = !0,
            this.m_img_MantleWait.visible = !1,
            this.m_btn_Mantle.disabled = !1,
            void this.ani2.stop()) : (this.m_btn_Ton.disabled = !1,
            this.m_btn_Not.disabled = !1,
            this.m_btn_Star.disabled = !1,
            this.m_currencyCode == b.ton ? (this.m_box_Ton.visible = !0,
            this.m_img_TonWait.visible = !1,
            void this.ani3.stop()) : void (this.m_currencyCode == b.not && (this.m_box_Not.visible = !0,
            this.m_img_NotWait.visible = !1,
            this.ani4.stop())))
        }
        lockChainOperate() {
            Laya.timer.once(6e4, this, this.delayUnlockChainOperate),
            this.playWait()
        }
        unlockChainOperate() {
            Laya.timer.clear(this, this.delayUnlockChainOperate),
            this.stopWait()
        }
        delayUnlockChainOperate() {
            this.stopWait()
        }
        onClickWallet(t) {
            var e = this.m_btn_Disconnect.visible;
            this.m_btn_Disconnect.visible = !e
        }
        onClickDisconnect(t) {
            P.wallet.disconnect()
        }
        onClickMantle(t) {
            this.m_currencyCode = b.mnt,
            this.connectWallet().then(()=>{
                this.checkPayData(Vt.mantle).then(t=>{
                    this.m_payData = t,
                    this.sendTransaction()
                }
                )
            }
            )
        }
        onClickStar(t) {
            this.m_currencyCode = b.star,
            this.checkPayData(Vt.star).then(t=>{
                window.mbplatform.openInvoice(t.paylink).then(t=>{
                    t && this.closeDialog(h.No)
                }
                )
            }
            )
        }
        onClickTon(t) {
            this.m_currencyCode = b.ton,
            this.connectWallet().then(()=>{
                this.checkPayData(Vt.tonConnect).then(t=>{
                    this.m_payData = t,
                    this.sendTransaction()
                }
                )
            }
            )
        }
        onClickNot(t) {
            this.m_currencyCode = b.not,
            this.connectWallet().then(()=>{
                this.checkPayData(Vt.tonConnect).then(t=>{
                    this.m_payData = t,
                    P.wallet.getJettonWalletAddress().then(e=>{
                        P.wallet.getTokenPayload(t.amount, t.payload, t.walletAddress).then(t=>{
                            this.m_payData.amount = 1e8 + "",
                            this.m_payData.payload = t,
                            this.m_payData.walletAddress = e,
                            this.sendTransaction()
                        }
                        ).catch(t=>{
                            u(t.message)
                        }
                        )
                    }
                    ).catch(t=>{
                        t.code == oe.insufficientFunds ? u(k(176, this.m_currencyCode)) : u(t.message)
                    }
                    )
                }
                )
            }
            )
        }
    }
    L([A(y.WALLET_CONNECTED), A(y.WALLET_DISCONNECT)], we.prototype, "updateWallet", null),
    L([A(y.RECHARGE_SUCCESS)], we.prototype, "onRechargeSuccess", null);
    class xe extends t.cat.views.recharge.RechargeSuccessDlgUI {
        constructor(t=0, e=0, i=0, s=0) {
            super(),
            this.m_amount = 0,
            this.m_gold = 0,
            this.m_boxNum = 0,
            this.m_xenNum = 0,
            this.m_amount = t,
            this.m_gold = e,
            this.m_boxNum = i,
            this.m_xenNum = s
        }
        onAwake() {
            super.onAwake(),
            this.height = this.m_amount || this.m_gold ? 480 : 400,
            this.m_box_Fish.visible = 0 < this.m_amount,
            this.m_box_Gold.visible = 0 < this.m_gold,
            0 < this.m_amount ? this.m_txt_Amount.text = jt(this.m_amount) : this.m_box_Fish.destroy(),
            0 < this.m_gold ? this.m_txt_Gold.text = jt(this.m_gold) : this.m_box_Gold.destroy(),
            0 < this.m_boxNum ? this.m_txt_BoxNum.text = "x" + this.m_boxNum : this.m_box_Gift.destroy(),
            0 < this.m_xenNum ? this.m_txt_Xen.text = jt(this.m_xenNum) : this.m_box_Xen.destroy(),
            Laya.timer.callLater(this, ()=>{
                this.destroyed || (this.height = 530 - (155 - this.m_box_Con.height))
            }
            )
        }
    }
    class Te extends t.cat.views.recharge.RechargeDlgUI {
        onAwake() {
            super.onAwake(),
            this.m_view_FishCoin.removePlus(),
            this.showUI()
        }
        onDestroy() {
            super.onDestroy(),
            P.event(y.UPDATE_RECHARGE_RED)
        }
        showUI() {
            var t = I.getPurchaseGoods();
            this.m_lst_Goods.array = t
        }
        onSelectGoods(e) {
            if (-1 != e) {
                let r = this.m_lst_Goods.selectedItem;
                if (r) {
                    var e = I.getCountByType(r.id)
                      , i = r.goodsType == At.dayGoods;
                    if (this.m_lst_Goods.selectedIndex = -1,
                    !(0 < e && i))
                        if (2001 == r.id)
                            I.reqGetFreeBoxNumGet().then(t=>{
                                this.showUI(),
                                d(xe, {
                                    params: [r.amount, 0, r.dropBoxNum],
                                    retainPopup: !0
                                })
                            }
                            );
                        else if (2002 == r.id) {
                            e = S.get(S.s_signInRechargeGift) || 0;
                            let t = 0;
                            e && (i = e + 4e4,
                            e = (new Date).getTime(),
                            t = i - e),
                            0 < t || I.BCCheckIn(St.goods2002).then(t=>{
                                this.m_payData = t.payData,
                                Mmobay.MConfig.channelId != Mmobay.MConst.CHANNEL_LOCAL && (Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile || P.wallet.connected ? this.sendTransaction() : this.connectWallet())
                            }
                            )
                        } else
                            I.requestPrePay(r.id).then(t=>{
                                let e = 0
                                  , i = 0
                                  , s = 0
                                  , a = 0
                                  , n = 0
                                  , o = 0;
                                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE ? e = parseFloat(t.mntPrice) || 0 : (i = parseFloat(t.tonPrice) || 0,
                                s = parseFloat(t.notPrice) || 0,
                                a = parseInt(t.starPrice) || 0,
                                n = parseFloat(t.tonoffPrice) || 0,
                                o = parseFloat(t.notoffPrice) || 0);
                                t = {
                                    type: Wt.buyFish,
                                    name: r.name,
                                    icon: "cat/ui_recharge/pur_fish.png",
                                    price: r.price,
                                    mntPrice: e,
                                    tonPrice: i,
                                    notPrice: s,
                                    starPrice: a,
                                    tonOffPrice: n,
                                    notOffPrice: o,
                                    goodsId: r.id
                                };
                                d(we, {
                                    params: [t],
                                    showEffect: !1,
                                    retainPopup: !0
                                }).then(t=>{
                                    t.wait().then(t=>{
                                        t.type == h.Yes && (t.data && t.data.isTonWallet ? this.showPayProcessing(3e3) : this.showPayProcessing())
                                    }
                                    )
                                }
                                )
                            }
                            )
                }
            }
        }
        connectWallet() {
            P.wallet.connect().then(t=>{
                this.destroyed || Laya.timer.once(500, this, ()=>{
                    this.sendTransaction()
                }
                )
            }
            )
        }
        sendTransaction() {
            if (this.m_payData) {
                let e = {
                    amount: 8e6,
                    address: this.m_payData.walletAddress,
                    payload: this.m_payData.payload,
                    transactionType: Ht.gameSignin
                }
                  , i = ()=>{
                    P.wallet.sendTransaction(e).then(t=>{
                        I.updateBCCheckIn(St.goods2002, this.m_payData, t);
                        t = (new Date).getTime();
                        S.set(S.s_signInRechargeGift, t),
                        P.event(y.CHANGE_CHARGE_CHAIN_GIFT)
                    }
                    ).catch(t=>{
                        S.removeItem(S.s_signInRechargeGift),
                        P.event(y.CHANGE_CHARGE_CHAIN_GIFT),
                        t && t.code == oe.insufficientFunds && u("Insufficient gas")
                    }
                    )
                }
                ;
                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile ? d(fe, {
                    showEffect: !1,
                    retainPopup: !0
                }).then(t=>{
                    t.wait().then(t=>{
                        t.type == h.Yes && (e.walletType = t.data,
                        i())
                    }
                    )
                }
                ) : i()
            }
        }
        showPayProcessing(t=100) {
            Laya.timer.once(t, this, ()=>{
                this.destroyed || d(ke, {
                    retainPopup: !0
                })
            }
            )
        }
    }
    L([A(y.UPDATE_ITEM), A(y.RECHARGE_SUCCESS)], Te.prototype, "showUI", null);
    class Se extends t.cat.views.fish.FishItemViewUI {
        constructor(t) {
            super(),
            this.m_data = null,
            this.m_tl = null,
            this.m_data = t
        }
        onDestroy() {
            super.onDestroy(),
            this.m_tl && (this.m_tl.destroy(),
            this.m_tl = null)
        }
        onAwake() {
            super.onAwake();
            let t = this.m_data.fishId;
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && 123 == t && (t = 126),
            this.m_img_Fish.skin = `cat/ui_fish/${t}.png`,
            124 == t ? (this.m_img_Coin.skin = "",
            this.m_txt_Add.text = k(1048)) : 125 == t ? (this.m_img_Coin.skin = "",
            this.m_txt_Add.text = k(1047)) : 0 < +this.m_data.addFishCoin ? (this.m_txt_Add.text = "+" + f(this.m_data.addFishCoin),
            this.m_img_Coin.skin = "cat/ui_item/8.png") : (this.m_txt_Add.text = "+" + f(this.m_data.addgold),
            this.m_img_Coin.skin = "cat/ui_item/coin.png"),
            this.width = this.m_box_Con.width + 5
        }
        doAniShow() {
            this.visible = !0;
            let t = this.m_tl = new Laya.TimeLine;
            var e = this.y
              , i = 0 < (I.exdata.fishRobLvl || 0) ? 750 : 1500;
            t.to(this, {
                y: e - 120
            }, i).to(this, {
                y: e - 240,
                alpha: .3
            }, i),
            t.on(Laya.Event.COMPLETE, this, ()=>{
                this.destroy()
            }
            ),
            t.play()
        }
    }
    class Ie extends t.cat.views.fish.FishUpgradeDlgUI {
        onAwake() {
            super.onAwake(),
            this.showUI()
        }
        onDestroy() {
            super.onDestroy()
        }
        showUI() {
            var t = P.cat.getMyLv()
              , e = I.exdata.fishRobLvl || 0
              , i = Data.getFishRod(e)
              , e = Data.getFishRod(e + 1);
            if (!e)
                return this.m_txt_Tips.visible = !0,
                this.m_txt_Tips.text = "MAX",
                this.m_txt_Tips.bottom = 100,
                this.m_txt_Tips.fontSize = 32,
                this.m_txt_Cur.text = "x" + f(i.multiple),
                this.m_txt_NextTip.text = this.m_txt_CurTip.text,
                this.m_img_Cur.visible = !1,
                this.m_img_Arrow.visible = !1,
                this.m_btn_Upgrade.visible = !1,
                this.m_box_Need.visible = !1,
                void (this.height = 420);
            e && t >= e.catMaxLvl ? (this.m_btn_Upgrade.disabled = !1,
            this.m_txt_Tips.visible = !1,
            this.m_txt_Next.text = "x" + f(e.multiple),
            this.m_txt_Cur.text = "x" + f(i && i.multiple || 0),
            this.m_txt_Num.text = I.fishCoin + "",
            this.m_txt_Need.text = "/" + e.costFishCoin,
            this.m_box_Need.visible = !0) : e && (this.m_box_Need.visible = !1,
            this.m_txt_Tips.visible = !0,
            this.m_btn_Upgrade.disabled = !0,
            this.m_txt_Tips.text = k(1049, e.catMaxLvl),
            this.m_txt_Next.text = "x" + f(e.multiple),
            this.m_txt_Cur.text = "x" + f(i && i.multiple || 0))
        }
        onClickUpgrade() {
            P.fish.reqFishRodUp().then(()=>{
                u(k(1033)),
                this.showUI()
            }
            )
        }
    }
    class De extends t.cat.views.fish.FishSkipResultDlgUI {
        constructor(t) {
            super(),
            this.m_data = null,
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.showUI(),
            D.instance.playSound("getfish.mp3")
        }
        showUI() {
            var t = this.m_data;
            0 < +t.addFishCoin ? this.m_txt_FishCoin.text = "x" + t.addFishCoin : this.m_img_GetFish.destroy(),
            0 < +t.addgold ? this.m_txt_Gold.text = "x" + f(t.addgold) : this.m_img_GetGold.destroy(),
            0 < t.fomo ? this.m_txt_FomoNum.text = "x" + t.fomo : this.m_img_Fomo.destroy(),
            0 < +t.times ? this.m_txt_WatchNum.text = "x" + t.times : this.m_img_Watch.destroy();
            let e = t.fishId;
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && 123 == e && (e = 126),
            this.m_img_FishSmall.skin = `cat/ui_fish/${e}.png`,
            this.m_txt_Weight.text = P.fish.formatWeight(t.weight),
            t.newMax == t.myNewMax && t.newMax > t.oldMax ? (this.m_view_New.destroy(),
            this.m_img_Top.visible = !0) : t.myNewMax > t.myOldMax ? (this.m_img_Top.destroy(),
            this.m_view_New.visible = !0) : (this.m_img_Top.destroy(),
            this.m_view_New.destroy()),
            Laya.timer.callLater(this, ()=>{
                this.destroyed || (this.height = 920 - (534 - this.m_box_Con.height),
                this._widget.resetLayout())
            }
            )
        }
    }
    class Le extends t.cat.views.fish.FishDlgUI {
        constructor() {
            super(),
            this.m_tl = null,
            this.isAuto = !1,
            this.autoNumArr = [],
            this.m_ygSpine = null,
            this.m_fomoSpine = null,
            this.m_eventMaxNum = 10,
            this.m_Cfg = [[287, 287, 20, 4], [245, 245, 56, 3], [204, 204, 98, 2], [155, 155, 139, 1], [115, 115, 188, 2], [75, 75, 228, 3], [30, 30, 268, 4]]
        }
        onDestroy() {
            super.onDestroy(),
            this.clearTimeLine(),
            P.cat.goldMute = !1,
            D.instance.playMusic("BGM_Cafe.mp3"),
            P.sysNotice.reqUnWatch(Bt.fish)
        }
        onAwake() {
            super.onAwake(),
            this.addTitle(),
            P.cat.goldMute = !0,
            D.instance.playMusic("BGM_Excavate.mp3"),
            this.m_pan_Panel.elasticEnabled = !1,
            this.ani1.on(Laya.Event.COMPLETE, this, this.doEndFish),
            this.showUI(),
            this.m_txt_Need.text = "/" + Data.gameConf.fishCfg.costCoin,
            P.sysNotice.reqFishHistory().then(t=>{
                for (let e of t.list)
                    _(de, {}).then(t=>{
                        this.destroyed ? t.destroy() : (t.dataChanged(e),
                        this.m_box_Vbox.addChild(t))
                    }
                    );
                P.sysNotice.reqWatch(Bt.fish)
            }
            ),
            this.checkUpGradeShow(),
            this.checkFomoAni()
        }
        showUI() {
            var t = I.fishCoin;
            this.m_txt_Num.text = t + "",
            this.m_btn_Fish.visible = !1,
            this.m_btn_Start.visible = !0,
            this.m_btn_Auto.visible = !0,
            this.m_txt_Gold.text = f(I.gold) || "0",
            this.showFishBait(),
            this.showMyFishInfo()
        }
        showMyFishInfo() {
            P.fish.reqMyFishInfo().then(e=>{
                if (!this.destroyed && (this.m_txt_NoRecord.visible = +e.myRank < 0,
                this.m_box_Rank.visible = 0 < +e.myRank,
                +e.rewardGold && d(ve, {
                    params: [e.rewardGold, e.rewardRank]
                }),
                0 < +e.myRank)) {
                    this.m_txt_SelfRank.text = e.myRank + "",
                    this.m_txt_Weight.text = P.fish.formatWeight(+e.myScore);
                    let t = e.myRankKey;
                    Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && 123 == t && (t = 126),
                    this.m_img_FishRank.skin = `cat/ui_fish/${t}.png`
                }
            }
            )
        }
        showFishBait() {
            var t = I.fishCoin;
            this.m_txt_Num.text = t + "",
            this.m_txt_Num.color = t >= +Data.gameConf.fishCfg.costCoin ? se.Green : se.Red
        }
        showFishAni() {
            var t;
            this.m_ygSpine || (t = I.exdata.fishRobLvl || 0,
            this.m_ygSpine = R.create({
                url: "cat/spine/yugan.json",
                parent: this.m_box_Ani,
                px: this.m_img_Rod.x,
                py: this.m_img_Rod.y,
                autoPlay: !1,
                rate: 0 < t ? 1.5 : 1
            }));
            let e = this.m_ygSpine;
            this.m_btn_Start.visible = !1,
            this.m_img_Rod.visible = !1,
            this.m_box_Area.visible = !1,
            this.m_btn_Auto.visible = !1,
            this.m_btn_Upgrade.visible = !1,
            this.m_img_RodShine.visible = !1,
            D.instance.playSound("fish1.mp3"),
            e.play(0, !1, Laya.Handler.create(null, ()=>{
                this.m_img_Bar.visible = !0,
                this.m_btn_Fish.visible = !0,
                this.m_btn_Fish.disabled = !1,
                this.showBarAni()
            }
            ))
        }
        showBarAni() {
            let t = this.m_img_Icon;
            this.clearTimeLine(),
            this.m_tl = new Laya.TimeLine,
            t.x = 40,
            this.m_tl.to(t, {
                x: 310
            }, 1e3).to(t, {
                x: 40
            }, 1e3),
            this.m_tl.play(0, !0)
        }
        doEndFish() {
            var t = this.m_Cfg.find(t=>this.m_img_Icon.x > t[0]);
            if (t) {
                let e = 0 < I.fishData.eventCount;
                P.fish.reqFishing(t[3]).then(t=>{
                    this.destroyed || (this.showUI(),
                    d(ye, {
                        params: [t, !1, e],
                        closeOnSide: !0
                    }),
                    this.m_btn_Fish.visible = !1,
                    this.m_img_Bar.visible = !1,
                    this.m_btn_Start.visible = !0,
                    this.checkUpGradeShow())
                }
                )
            }
        }
        onClickStart() {
            if (I.fishCoin >= +Data.gameConf.fishCfg.costCoin)
                return this.showFishAni();
            d(Te, {
                closeOnSide: !0
            })
        }
        onClickFish() {
            var t;
            this.m_ygSpine || (t = I.exdata.fishRobLvl || 0,
            this.m_ygSpine = R.create({
                url: "cat/spine/yugan.json",
                parent: this.m_box_Ani,
                px: this.m_img_Rod.x,
                py: this.m_img_Rod.y,
                autoPlay: !1,
                rate: 0 < t ? 1.5 : 1
            }));
            let e = this.m_ygSpine;
            this.m_img_Rod.visible = !1,
            e.play(1, !1, Laya.Handler.create(null, ()=>{}
            )),
            this.clearTimeLine(),
            this.showArea(),
            this.ani1.play(0, !1),
            this.m_btn_Fish.disabled = !0
        }
        showArea() {
            var t = this.m_Cfg.find(t=>this.m_img_Icon.x > t[0]);
            t ? (this.m_box_Area.left = t[1],
            this.m_box_Area.right = t[2],
            this.m_box_Area.visible = !0) : this.m_box_Area.visible = !1
        }
        onClickInfo() {
            d(Ce)
        }
        clearTimeLine() {
            this.m_tl && (this.m_tl.destroy(),
            this.m_tl = null)
        }
        addSys(e) {
            if (50 <= this.m_box_Vbox.numChildren) {
                let t = this.m_box_Vbox.removeChildAt(this.m_box_Vbox.numChildren - 1);
                t.destroy()
            }
            _(de, {}).then(t=>{
                this.destroyed ? t.destroy() : (t.dataChanged(e),
                this.m_box_Vbox.addChildAt(t, 0))
            }
            )
        }
        onClickAuto() {
            d(me).then(t=>{
                t.wait().then(e=>{
                    if (e.type == h.Yes) {
                        if (e.data[1])
                            return i = e.data[0],
                            void P.fish.reqFishing(1, i).then(t=>{
                                this.destroyed || (this.showMyFishInfo(),
                                d(De, {
                                    params: [t]
                                }))
                            }
                            );
                        this.isAuto = !0,
                        this.m_btn_Start.visible = !1,
                        this.m_btn_Auto.visible = !1,
                        this.m_box_Auto.visible = !0,
                        this.autoNumArr = [1, e.data[0]],
                        this.m_txt_Item.text = "(" + this.autoNumArr[0] + "/" + this.autoNumArr[1] + ")",
                        this.m_img_Rod.visible = !1;
                        var i = I.exdata.fishRobLvl || 0;
                        this.m_ygSpine || (this.m_ygSpine = R.create({
                            url: "cat/spine/yugan.json",
                            parent: this.m_box_Ani,
                            px: this.m_img_Rod.x,
                            py: this.m_img_Rod.y,
                            autoPlay: !1,
                            rate: 0 < i ? 1.5 : 1
                        }));
                        let t = this.m_ygSpine;
                        D.instance.playSound("fish1.mp3"),
                        t.play(0, !1, Laya.Handler.create(null, ()=>{}
                        )),
                        this.m_btn_Upgrade.visible = !1,
                        this.m_img_RodShine.visible = !1,
                        this.doAutoFish(),
                        Laya.timer.loop(0 < i ? 400 : 800, this, ()=>{
                            this.doAutoFish()
                        }
                        )
                    }
                }
                )
            }
            )
        }
        doAutoFish() {
            var t;
            this.m_txt_Item.text = "(" + this.autoNumArr[0] + "/" + this.autoNumArr[1] + ")",
            this.m_img_Rod.visible = !1,
            this.m_ygSpine || (t = I.exdata.fishRobLvl || 0,
            this.m_ygSpine = R.create({
                url: "cat/spine/yugan.json",
                parent: this.m_box_Ani,
                px: this.m_img_Rod.x,
                py: this.m_img_Rod.y,
                autoPlay: !1,
                rate: 0 < t ? 1.5 : 1
            }));
            let e = this.m_ygSpine;
            e.play(1, !1, Laya.Handler.create(null, ()=>{
                D.instance.playSound("getfish.mp3"),
                e._index = -1,
                this.autoNumArr[0]++;
                I.fishData.eventCount;
                P.fish.reqFishing(1).then(t=>{
                    this.destroyed || (this.showMyFishInfo(),
                    this.showAutoFish(t),
                    this.autoNumArr[0] > this.autoNumArr[1] && this.onClickStop())
                }
                )
            }
            ))
        }
        showAutoFish(t) {
            _(Se, {
                params: [t]
            }).then(t=>{
                this.destroyed ? t.destroy() : (this.addChild(t),
                t.x = 0,
                t.y = 525,
                t.doAniShow())
            }
            )
        }
        onClickStop() {
            this.isAuto = !1,
            this.m_btn_Start.visible = !0,
            this.m_btn_Auto.visible = !0,
            this.m_box_Auto.visible = !1,
            Laya.timer.clearAll(this),
            this.checkUpGradeShow()
        }
        onClickRank() {
            d(ge)
        }
        updateGold() {
            this.m_txt_Gold.text = f(I.gold) || "0";
            var t = I.fishCoin;
            this.m_txt_Num.text = t + "",
            this.showFishBait()
        }
        onClickPlus(t) {
            d(Te, {
                closeOnSide: !0
            })
        }
        checkUpGradeShow() {
            var t = P.cat.getMyLv()
              , e = I.exdata.fishRobLvl || 0
              , e = Data.getFishRod(e + 1);
            e && t >= e.catMaxLvl ? (this.m_btn_Upgrade.scale(1, 1),
            this.m_btn_Upgrade.visible = !0,
            this.m_img_RodShine.visible = !0,
            this.ani4.play()) : (208 <= t && e ? (this.m_btn_Upgrade.gray = !0,
            this.m_btn_Upgrade.scale(.7, .7)) : this.m_btn_Upgrade.visible = !1,
            this.m_img_RodShine.visible = !1,
            this.ani4.stop())
        }
        checkFomoAni() {
            var t = I.fishData && I.fishData.eventCount || 0;
            if (!(0 < t))
                return this.m_fomoSpine && (this.m_fomoSpine.destroy(),
                this.m_fomoSpine = null),
                this.m_eventMaxNum = 10,
                void (this.m_pbr_Score.visible = !1);
            t > this.m_eventMaxNum && (this.m_eventMaxNum += 10 * Math.ceil((t - this.m_eventMaxNum) / 10)),
            this.m_pbr_Score.value = t / this.m_eventMaxNum,
            this.m_txt_FomoNum.text = t + "/" + this.m_eventMaxNum,
            this.m_pbr_Score.visible = !0,
            this.m_fomoSpine || (this.m_fomoSpine = R.create({
                url: "cat/spine/fomo.json",
                parent: this.m_box_Ani,
                px: 50,
                py: 450,
                autoPlay: !1,
                zOrder: -1
            })),
            this.m_fomoSpine.play(0, !0)
        }
        onClickUpgrade() {
            d(Ie).then(t=>{
                t.wait().then(()=>{
                    this.destroyed || this.checkUpGradeShow()
                }
                )
            }
            )
        }
    }
    L([A(y.FISHCOIN_CHANGE)], Le.prototype, "showFishBait", null),
    L([A(y.DO_CONTINUE_FISH)], Le.prototype, "onClickStart", null),
    L([A(y.UPDATE_FISH_SYS)], Le.prototype, "addSys", null),
    L([A(y.UPDATE_ITEM)], Le.prototype, "updateGold", null),
    L([A(y.FISHDATA_CHANGE)], Le.prototype, "checkFomoAni", null);
    class Ae extends t.cat.views.home.FirstRechargeDlgUI {
        constructor() {
            super(...arguments),
            this.m_goodId = 1001
        }
        onAwake() {
            super.onAwake(),
            this.showUI()
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clear(this, this.endConfirm),
            P.event(y.UPDATE_RECHARGE_RED)
        }
        showUI() {
            var t, e = Data.getGoods(this.m_goodId), e = (this.m_img_Ton.visible = !0,
            this.m_img_Mantle.visible = !1,
            this.m_txt_FishCoin.text = jt(e.fishCoin),
            this.m_txt_Gold.text = jt(+e.gold),
            this.m_btn_Buy.label = "$" + e.price,
            S.get(S.s_firstRechargeOrderTime) || 0);
            let i = 0;
            e && (e = e + 3e5,
            t = (new Date).getTime(),
            i = e - t),
            i <= 0 ? (this.m_btn_Buy.visible = !0,
            this.m_btn_Wait.visible = !1,
            this.ani3.stop(),
            S.removeItem(S.s_firstRechargeOrderTime)) : (this.m_btn_Buy.visible = !1,
            this.m_btn_Wait.visible = !0,
            this.ani3.play(0, !0),
            Laya.timer.clear(this, this.endConfirm),
            Laya.timer.once(i, this, this.endConfirm))
        }
        endConfirm() {
            S.removeItem(S.s_firstRechargeOrderTime),
            this.showUI()
        }
        doClose() {
            this.closeDialog()
        }
        onClickBuy(t) {
            let r = Data.getGoods(this.m_goodId);
            I.requestPrePay(this.m_goodId).then(t=>{
                let e = 0
                  , i = 0
                  , s = 0
                  , a = 0
                  , n = 0
                  , o = 0;
                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE ? e = parseFloat(t.mntPrice) || 0 : (i = parseFloat(t.tonPrice) || 0,
                s = parseFloat(t.notPrice) || 0,
                a = parseInt(t.starPrice) || 0,
                n = parseFloat(t.tonoffPrice) || 0,
                o = parseFloat(t.notoffPrice) || 0);
                t = {
                    type: Wt.first,
                    name: r.name,
                    icon: "cat/ui_recharge/pur_package.png",
                    price: r.price,
                    mntPrice: e,
                    tonPrice: i,
                    notPrice: s,
                    starPrice: a,
                    tonOffPrice: n,
                    notOffPrice: o,
                    goodsId: this.m_goodId
                };
                d(we, {
                    params: [t],
                    showEffect: !1,
                    retainPopup: !0
                }).then(t=>{
                    t.wait().then(t=>{
                        t.type == h.Yes && (t = (new Date).getTime(),
                        S.set(S.s_firstRechargeOrderTime, t),
                        this.showUI(),
                        this.showPayProcessing())
                    }
                    )
                }
                )
            }
            )
        }
        showPayProcessing(t=100) {
            Laya.timer.once(t, this, ()=>{
                this.destroyed || d(ke, {
                    retainPopup: !0
                })
            }
            )
        }
    }
    L([A(y.RECHARGE_SUCCESS)], Ae.prototype, "doClose", null);
    class Ee extends t.cat.views.home.ShopDlgUI {
        constructor(t=!1) {
            super(),
            this.m_goFish = t
        }
        onAwake() {
            super.onAwake(),
            this.updateShowView(!0, this.m_goFish),
            this.m_lst_Cat.elasticEnabled = !1
        }
        updateShowView(t=!1, e=!1) {
            this.m_lst_Cat.array = new Array(Data.maxCats).fill(null),
            this.updateGold();
            var i = P.cat.getMyLv()
              , s = Data.getShopCat(i)
              , e = (e && i <= 210 ? this.m_lst_Cat.scrollTo(s.fishCoinLvl - 2) : t && (P.cat.freeCat ? this.m_lst_Cat.scrollTo(Math.max(0, P.cat.freeCat - 5)) : this.m_lst_Cat.scrollTo(Math.max(0, Math.max(s.fishCoinLvl, s.goldLvl) - 5))),
            this.m_lst_Cat.array = Object.keys(Data.Cats),
            Data.gameConf.initCfg.openMenu.split(","))
              , i = P.cat.getMyLv();
            this.m_box_Add.visible = i >= +e[4],
            this.m_view_FishCoin.hideBg()
        }
        updateGold() {
            this.m_txt_Money.text = f(I.gold) + ""
        }
        onClickGoldPlus() {
            this.closeDialog(),
            m(Le)
        }
    }
    L([A(y.MaxCAT_CHANGE)], Ee.prototype, "updateShowView", null),
    L([A(y.BUY_CAT)], Ee.prototype, "updateGold", null);
    class Re extends t.cat.views.home.VkittyGainWayDlgUI {
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        onDestroy() {
            super.onDestroy(),
            this.m_rad_Sel.selected && (P.cat.showVkittyTip = !1)
        }
        updateView() {
            210 < P.cat.getMyLv() && (this.m_box_3.visible = !0)
        }
        onClickGo() {
            n.instance.removeAllPopup(),
            this.m_box_3.visible ? m(Le) : this.m_box_2.visible ? d(Ee, {
                params: [!0]
            }) : d(Ae),
            this.closeDialog(h.Yes)
        }
    }
    class Me {
        constructor() {
            this.cats = [null, null, null, null, null, null, null, null, null, null, null, null],
            this.goldAniImg = [],
            this.tempGold = 0,
            this.airDropTime = 0,
            this.airDropMap = {},
            this.goldMute = !1,
            this.freeCat = 0,
            this.buyAuto = !1,
            this.isAuto = null,
            this.clickAuto = !1,
            this.showVkittyTip = !0,
            this.allcats = [null, null, null, null, null, null, null, null, null, null, null, null]
        }
        initCat(t) {
            var e = t.cats;
            for (let t = 0; t < e.length; t++)
                this.allcats[t] = e[t] || null;
            this.buyAuto = !!t.exData.autoMerge,
            null === this.isAuto && (this.isAuto = this.buyAuto),
            this.goldTime = t.goldTime,
            this.freeCat = t.exData.freeCatLvl;
            t = 1e3 * +Data.gameConf.initCfg.gatherGoldTime;
            this.airDropTime = Date.newDate().getTime() / 1e3,
            Laya.timer.clearAll(this),
            Laya.timer.clear(this, this.startLoop),
            Laya.timer.once(1e3 * this.goldTime + t - Date.newDate().getTime(), this, this.startLoop),
            Laya.timer.loop(13e3, this, this.reqGetAirDropCat)
        }
        startLoop() {
            let t = 1e3 * +Data.gameConf.initCfg.gatherGoldTime;
            this.reqGather().then(()=>{
                Laya.timer.once(1e3 * this.goldTime + t - Date.newDate().getTime(), this, this.startLoop)
            }
            )
        }
        getCats() {
            return this.allcats
        }
        get nowGenerateCat() {
            var t = Data.getShopCat(this.getMyLv());
            return t ? t.generateLvl : 1
        }
        reqGather() {
            return x(new pb.GatherGoldReq, l.GatherGoldReq, pb.IGatherGoldAck, {
                noLoading: !0
            }).then(t=>{
                I.m_gold = +t.gold,
                this.goldTime = t.goldTime
            }
            )
        }
        reqOff(t) {
            let e = new pb.GetOffLineGoldReq;
            return e.Type = t,
            x(e, l.GetOffLineGoldReq, pb.IGetOffLineGoldAck, {
                noLoading: !0
            }).then(t=>{
                I.m_gold = +t.gold,
                this.goldTime = t.goldTime,
                I.fishCoin = +t.fishCoin,
                I.offLine = null,
                t.randomEventData && (I.randomEvent = t.randomEventData),
                P.event(y.HOME_GOLD_ANI)
            }
            )
        }
        reqSumCat(t) {
            let e = new pb.MergeCatReq;
            return e.indexs = t,
            x(e, l.MergeCatReq, pb.IMergeCatAck, {
                noLoading: !0
            }).then(t=>{
                for (var e of t.cats)
                    if (e > this.getMyLv()) {
                        I.exdata.maxCatLvl = e,
                        P.event("updateShopRed"),
                        P.event(y.UPDATE_CAT),
                        P.event(y.MaxCAT_CHANGE);
                        break
                    }
                return P.event(y.UPDATE_OUTPUT),
                t.cats
            }
            )
        }
        reqSwitch(t) {
            let e = new pb.SwitchPosCatReq;
            return e.indexs = t,
            x(e, l.SwitchPosCatReq, pb.ISwitchPosCatAck, {
                noLoading: !0
            }).then(e=>{
                for (let t = 0; t < e.cats.length; t++)
                    this.allcats[t] = e.cats[t] || null;
                return P.event(y.UPDATE_CAT, [!0]),
                e
            }
            )
        }
        reqDelCat(t) {
            let e = new pb.DelCatReq;
            return e.indexs = [t],
            x(e, l.DelCatReq, pb.IDelCatAck, {
                noLoading: !0
            }).then(e=>{
                for (let t = 0; t < e.cats.length; t++)
                    this.allcats[t] = e.cats[t] || null;
                return P.event(y.UPDATE_CAT, [!0]),
                P.event(y.UPDATE_OUTPUT),
                13 < Date.newDate().getTime() / 1e3 - this.airDropTime && (this.reqGetAirDropCat(),
                Laya.timer.loop(13e3, this, this.reqGetAirDropCat)),
                e
            }
            )
        }
        reqSpeed(t) {
            let e = new pb.BoostGoldReq;
            return e.Type = t,
            x(e, l.BoostGoldReq, pb.IBoostGoldAck).then(t=>(I.boostEndTime = t.boostEndTime,
            I.exdata.speedFreeTime = t.SpeedFreeTime,
            I.fishCoin = +t.fishCoin,
            P.event(y.UPDATE_SPEED),
            P.event(y.UPDATE_ITEM),
            D.instance.playSound("Speed.mp3"),
            t))
        }
        reqCreate(e=this.nowGenerateCat, t=!1, i=!1) {
            let s = new pb.GenerateCatReq;
            return s.lvl = e,
            s.Type = i ? 3 : t ? 2 : 1,
            x(s, l.GenerateCatReq, pb.IGenerateCatAck, {
                noLoading: !0
            }).then(t=>(I.m_gold = +t.gold,
            I.fishCoin = +t.fishCoin,
            this.allcats[t.index || 0] = t.catLvl,
            i && (this.freeCat = I.exdata.freeCatLvl = 0,
            P.event("updateShopRed")),
            I.exdata.catNumFish[e] = t.catNumFish,
            I.exdata.catNum[e] = t.catNum,
            P.event(y.UPDATE_CAT, [!0]),
            P.event(y.BUY_CAT, [t]),
            P.event(y.UPDATE_OUTPUT),
            P.event(y.UPDATE_ITEM),
            this.goldMute || D.instance.playSound("airdrop3.mp3"),
            t))
        }
        getNowPrice() {
            return this.getCatCost(this.nowGenerateCat)
        }
        getMyLv() {
            return I.exdata.maxCatLvl || 1
        }
        getOutPutSpeed() {
            return this.getBaseSpeed() * this.getSpeedAdd()
        }
        getSpeedAdd() {
            var t = Date.newDate().getTime()
              , e = Data.getFishEvent(1)
              , e = e && e.goldMultiple[I.rankLeague] || 0;
            return (1e3 * I.boostEndTime > t ? 2 : 1) * (I.randomEvent && 1e3 * +I.randomEvent.multipleTime > t ? 5 : 1) + (I.fishData && 1e3 * +I.fishData.eventTime > t ? e : 0)
        }
        getBaseSpeed() {
            let e = 0;
            for (let t = 0; t < this.allcats.length; t++) {
                var i = this.allcats[t];
                i && !P.lunch.checkCatLunch(t) && (i = Data.getCat(i),
                e += +i.outGold)
            }
            return e
        }
        getCatCost(t) {
            var e = Data.getCat(t);
            return t > this.getGoldCatLv() ? Math.ceil(+e.baseCostFishCoin * Math.pow(e.priceAddFishCoin, I.exdata.catNumFish[t] || 0)) : Math.ceil(+e.baseCost * Math.pow(e.priceAdd, I.exdata.catNum[t] || 0))
        }
        playCat(e, i, s="") {
            if (e)
                if (!e || e.skeleton && !e.destroyed) {
                    if (e) {
                        Laya.timer.clearAll(e);
                        let t = e.getAniIndexByName(i);
                        s.length ? e.play(t, !1, Laya.Handler.create(this, ()=>{
                            e && (t = e.getAniIndexByName(i),
                            e.play(e.getAniIndexByName(s), !0))
                        }
                        )) : e.play(t, !0)
                    }
                } else
                    e._templet.once(Laya.Event.COMPLETE, this, ()=>{
                        if (e) {
                            let t = e.getAniIndexByName(i);
                            s.length ? e.play(t, !1, Laya.Handler.create(this, ()=>{
                                t = e.getAniIndexByName(i),
                                e.play(e.getAniIndexByName(s), !0)
                            }
                            )) : e.play(t, !0)
                        }
                    }
                    )
        }
        prepareCat(s, t, e) {
            let a = Data.getCat(t)
              , n = a.oldShowId || a.showId
              , o = ""
              , r = (o = 200 <= +n ? "fat_" : 100 <= +n ? "chubby_" : "thin_",
            ["Mane", "Hat", "Body", "Ear_L", "Ear_R", "Eye_White", "Eyes", "Head", "Leg_LB", "Leg_LF", "Leg_RB", "Leg_RF", "Mouth", "Nose", "Tail", "Tongue"])
              , h = 0;
            Laya.loader.load("cat/catImage/cat_" + n + ".atlas", Laya.Handler.create(this, ()=>{
                for (let i of r) {
                    if (h++,
                    "Hat" == i) {
                        var t = a.hatId;
                        let e = t ? `cat/ui_cat/hat${t}.png` : "cat/ui_cat/hat.png";
                        Laya.loader.load(e, Laya.Handler.create(this, ()=>{
                            var t = Laya.loader.getRes(e);
                            s.setSlotSkin(o + i, t)
                        }
                        ))
                    } else {
                        t = Laya.loader.getRes("cat/catImage/cat_" + n + "/" + i + ".png");
                        if (!t)
                            continue;
                        s.setSlotSkin(o + i, t)
                    }
                    h == r.length && e && e.run()
                }
            }
            ))
        }
        getFishCoinLv() {
            var t = Data.getShopCat(this.getMyLv());
            return t ? t.fishCoinLvl : 1
        }
        getGoldCatLv() {
            var t = Data.getShopCat(this.getMyLv());
            return t ? t.goldLvl : 1
        }
        checkIsBoost() {
            return 1e3 * I.boostEndTime > Date.newDate().getTime()
        }
        reqGetAirDropCat() {
            if (this.allcats.filter(t=>!t).length && !(this.checkNew() || I.randomEvent && I.randomEvent.boxNum))
                return x(new pb.GetAirDropCatReq, l.GetAirDropCatReq, pb.IGetAirDropCatAck, {
                    noLoading: !0
                }).then(e=>{
                    if (-1 != e.airdropIndex) {
                        if (this.airDropTime = +e.airdropTime,
                        -(this.airDropMap[e.airdropIndex] = 1) != e.airdropIndex) {
                            for (let t = 0; t < e.cats.length; t++)
                                this.allcats[t] = e.cats[t] || null;
                            P.event(y.AIR_DROP, e.airdropIndex)
                        }
                        P.event(y.UPDATE_CAT)
                    }
                }
                )
        }
        getCv(t, e) {
            return `${t}_${"male" == e ? "Man" : "Female"}_${["A", "C", "E", "F", "G", "J", "R", "V"][Math.floor(4 * Math.random())]}.mp3`
        }
        checkNew() {
            return "0" == I.rankGold && !this.allcats.find(t=>!!t)
        }
        reqFreeCat() {
            return x(new pb.GetFreeCatReq, l.GetFreeCatReq, pb.IGetFreeCatAck, {
                noLoading: !0
            }).then(t=>{
                this.freeCat = t.catLvl
            }
            )
        }
        reqBuyAuto() {
            return x(new pb.MergeCatAutoReq, l.MergeCatAutoReq, pb.IMergeCatAutoAck, {
                noLoading: !0
            }).then(t=>{
                this.buyAuto = !!t.autoMerge,
                I.exdata.autoMerge = t.autoMerge,
                P.event("buyAuto")
            }
            )
        }
        doGoldRain(e) {
            for (let t = 0; t < 50; t++) {
                let t = new Laya.Image("cat/ui_item/coin.png");
                this.goldAniImg.push(t),
                t.y = -50,
                t.visible = !1,
                e.addChild(t),
                this.doGoldAni(t, e)
            }
        }
        doGoldAni(t, e) {
            t.x = Math.ceil(Math.random() * e.width - 20),
            t.alpha = Math.random() + .5,
            t.rotation = 360 * Math.random(),
            t.skewX = 5 * Math.random(),
            Laya.timer.once(2700 * Math.random(), t, ()=>{
                t.visible = !0,
                Laya.Tween.to(t, {
                    y: e.height + 50
                }, 1e3 * Math.random() + 1500, null, Laya.Handler.create(this, ()=>{
                    t.y = -50,
                    t.visible = !1,
                    this.doGoldAni(t, e)
                }
                ))
            }
            )
        }
        clearGoldRain() {
            for (var t of this.goldAniImg)
                Laya.Tween.clearAll(t),
                t.destroy();
            this.goldAniImg = []
        }
        findMaxCat() {
            let t = 0;
            for (var e of this.allcats)
                e > t && (t = e);
            return t
        }
        showVkittyGainWay() {
            P.cat.getMyLv() <= 210 || !P.cat.showVkittyTip ? u(k(168)) : d(Re)
        }
        checkHighAir(t) {
            var t = this.allcats[t]
              , e = Data.getCat(P.cat.getMyLv());
            return t >= (e.airdrop[1] && e.airdrop[1].k)
        }
    }
    class Ne {
        constructor() {
            this.m_fishPool = 0
        }
        reqFishRank() {
            return x(new pb.FishRankListReq, l.FishRankListReq, pb.IFishRankListAck).then(t=>t.rankList)
        }
        reqMyFishInfo() {
            return x(new pb.MyFishInfoReq, l.MyFishInfoReq, pb.IMyFishInfoAck, {
                noLoading: !0
            }).then(t=>t)
        }
        reqFishPool(t=!1) {
            return x(new pb.FishRewardPoolReq, l.FishRewardPoolReq, pb.IFishRewardPoolAck, {
                noLoading: t
            }).then(t=>{
                this.m_fishPool = +t.count * P.cat.getBaseSpeed()
            }
            )
        }
        getFishArr() {
            if (this.m_fishs)
                return this.m_fishs;
            for (var t in this.m_fishs = [],
            Data.fishs) {
                t = Data.getFish(+t);
                this.m_fishs.push(t)
            }
            return this.m_fishs
        }
        getRankDetail() {
            if (this.m_fishRewards)
                return this.m_fishRewards;
            for (var t in this.m_fishRewards = [],
            Data.fishSettles) {
                t = Data.getFishSettle(+t);
                this.m_fishRewards.push(t)
            }
            return this.m_fishRewards
        }
        reqFishing(t, e=1) {
            let i = pb.FishingReq.create();
            return i.color = t,
            i.num = e,
            x(i, l.FishingReq, pb.IFishingAck).then(t=>(P.bag.updateItem(t.items),
            I.gold = +t.gold,
            I.fishCoin = +t.fishCoin,
            I.fishData = t.fishData,
            P.event(y.FISHDATA_CHANGE),
            t))
        }
        reqFishRodUp() {
            return x(pb.FishRodUpReq.create(), l.FishRodUpReq, pb.IFishRodUpAck).then(t=>(I.exdata.fishRobLvl = t.FishRodLvl,
            I.fishCoin = +t.fishCoin,
            t))
        }
        formatWeight(t) {
            return 1e3 < t ? t / 1e3 + "T" : t + "KG"
        }
    }
    class Pe {
        reqFrensInfo() {
            return x(pb.FrensInfoReq.create(), l.FrensInfoReq, pb.IFrensInfoAck).then(t=>t)
        }
        reqFrensInviterDoubleInfo() {
            return x(pb.FrensInviterDoubleInfoReq.create(), l.FrensInviterDoubleInfoReq, pb.IFrensInviterDoubleInfoAck).then(t=>t)
        }
        reqInviteRankList() {
            return x(pb.InviteRankListReq.create(), l.InviteRankListReq, pb.IInviteRankListAck).then(t=>t)
        }
    }
    let Ue = new class {
        onErrorAck(t, e) {
            t.code == C.OtherLogined || t.code == C.BanAccount || t.code == C.BeKickoff ? P.login.handleErrorAck(t.code) : t.code == C.Maintain || t.code == C.AccessDenied ? P.login.handleMaintainErrorAck(t.code) : u(ee(t.code))
        }
        onHookRecvPacket(t, e) {
            P.login.onHookRecvPacket(t, e)
        }
        onHookSendPacket(t, e) {
            P.login.onHookSendPacket(t, e)
        }
        onEnterGameAck(t, e) {
            P.login.onEnterGameAck(t, !0)
        }
        onServerStateNtf(t, e) {
            P.login.onServerState(t.serverType, t.offline)
        }
        onUserInfoNtf(t, e) {
            I.init(t.userInfo)
        }
        onAccountInfoChangeNtf(t, e) {
            P.account.accountInfoChange(t)
        }
        onMessageEventNtf(t) {
            I.serverMessageEvent(t)
        }
        onSyncRechargeNtf(t) {
            I.updateRecharge(t.ids)
        }
        onTokensInfoChangeNtf(t) {
            I.tokensInfoChange(t),
            P.lunch.reqLunchList().then(()=>{
                P.event("updateLunch")
            }
            )
        }
        onCountsChangeNtf(t) {
            I.countsChangeNtf(t)
        }
        onClubInfoNtf(t) {
            P.club.clubInfo = t.club
        }
        onOtherHelpTurnNtf(t) {}
        onGoldChangeNtf(t) {
            P.account.updateGold(t)
        }
        onSysMsgNtf(t) {
            P.sysNotice.updateSys(t)
        }
        onBoostGoldNtf(t) {
            I.exdata.SpeedChainTime = t.SpeedChainTime,
            I.boostEndTime = t.boostEndTime,
            I.exdata.speedFreeTime = t.SpeedFreeTime,
            P.event(y.UPDATE_SPEED)
        }
        onRandomEventChangeNtf(t) {
            I.randomEvent = t.randomEventData,
            P.event(y.RANDOM_EVENT_TIME_CHANGE),
            P.event(y.UPDATE_SPEED),
            I.checkRandomBox()
        }
        onOffLineGoldNtf(t) {
            I.offLine = t,
            P.event(y.OFFLINE_CHANGE)
        }
        onLaunchPoolBonusNtf(t) {
            for (var e of P.lunch.m_lunchs)
                if (e.id == t.launchId) {
                    if (e.catPool.id == t.poolId) {
                        e.catPool.waitScore = t.waitScore;
                        break
                    }
                    if (e.fishPool.id == t.poolId) {
                        e.fishPool.waitScore = t.waitScore;
                        break
                    }
                }
            P.event(y.POOLBONUS, [t])
        }
    }
    ;
    var Fe = new class {
        constructor() {
            this._timeMap = {}
        }
        checkLimit(t, e, i=!1) {
            return this._timeMap[t] ? (i && u("operating too frequently"),
            !1) : (this._timeMap[t] = !0,
            Laya.timer.once(e, this, this.onTimeDelay, [t], !1),
            !0)
        }
        onTimeDelay(t) {
            delete this._timeMap[t]
        }
    }
    ;
    function Be(t, e=200, i=!1) {
        return Fe.checkLimit(t, e, i)
    }
    class Ge extends t.cat.views.home.SpeedDlgUI {
        constructor() {
            super(...arguments),
            this.m_speedEndTime = +I.boostEndTime,
            this.m_freeEndTime = +I.exdata.speedFreeTime,
            this.m_CEndTime = +I.exdata.SpeedChainTime,
            this.m_spineRock = null
        }
        onAwake() {
            super.onAwake(),
            this.m_spineRock || (this.m_spineRock = R.create({
                url: "cat/spine/icon_effects_rocket.json",
                parent: this,
                px: 280,
                py: 180,
                autoPlay: !1
            })),
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE ? this.m_img_Chain.skin = "cat/ui_comm/mantle.png" : this.m_img_Chain.skin = "cat/ui_comm/ton.png",
            this.updateView(),
            this.m_txt_Time1.text = Math.ceil(+Data.gameConf.upSpeedCfg.freeTime / 60) + "min",
            this.m_txt_Time2.text = Math.ceil(+Data.gameConf.upSpeedCfg.costTime / 60) + "min",
            this.m_txt_Time3.text = Math.ceil(+Data.gameConf.upSpeedCfg.chainTime / 60) + "min",
            this.m_txt_Cost.text = +Data.gameConf.upSpeedCfg.costFish + ""
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clear(this, this.endChainConfirm),
            Laya.timer.clear(this, this.delayUnlockChainOperate)
        }
        updateView() {
            this.m_speedEndTime = +I.boostEndTime,
            this.m_freeEndTime = +I.exdata.speedFreeTime,
            this.m_CEndTime = +I.exdata.SpeedChainTime,
            this.m_pbr_Time.value = 0,
            this.m_txt_Time.visible = !1;
            var t = 1e3 * this.m_speedEndTime - Date.newDate().getTime();
            0 < t ? (this.m_tick && this.m_tick.dispose(),
            this.m_pbr_Time.value = t / (1e3 * +Data.gameConf.upSpeedCfg.maxTime),
            this.m_tick = E.create(1e3 * this.m_speedEndTime, 1e3, this.m_txt_Time),
            this.m_tick.start(),
            this.m_tick.onTick = ()=>{
                var t = 1e3 * this.m_speedEndTime - Date.newDate().getTime();
                this.m_pbr_Time.value = t / (1e3 * +Data.gameConf.upSpeedCfg.maxTime)
            }
            ,
            this.m_tick.onEnd = ()=>{
                this.updateView(),
                P.event(y.UPDATE_SPEED)
            }
            ,
            this.m_txt_Time.visible = !0,
            this.m_spineRock.play(0, !0),
            this.m_spineRock.visible = !0,
            this.m_img_Rock.visible = !1) : (this.m_img_Rock.visible = !0,
            this.m_spineRock.visible = !1),
            this.m_tickFree && this.m_tickFree.dispose(),
            1e3 * this.m_freeEndTime > Date.newDate().getTime() ? (this.m_btn_FreeCd.visible = !0,
            this.m_btn_Free.visible = !1,
            this.m_tickFree = E.create(1e3 * +this.m_freeEndTime, 1e3, this.m_txt_FreeCd),
            this.m_tickFree.start(),
            this.m_tickFree.onEnd = ()=>{
                this.updateView()
            }
            ) : (this.m_btn_FreeCd.visible = !1,
            this.m_btn_Free.visible = !0),
            this.m_tickChain && this.m_tickChain.dispose(),
            1e3 * this.m_CEndTime > Date.newDate().getTime() ? (this.m_btn_ChainCd.visible = !0,
            this.m_btn_Chain.visible = !1,
            this.m_btn_Wait.visible = !1,
            this.ani1.stop(),
            this.m_tickChain = E.create(1e3 * +this.m_CEndTime, 1e3, this.m_txt_ChainCd),
            this.m_tickChain.start(),
            this.m_tickChain.onEnd = ()=>{
                this.updateView()
            }
            ,
            Laya.timer.clear(this, this.endChainConfirm),
            S.removeItem(S.s_signInSpeedOrderTime)) : (this.m_btn_ChainCd.visible = !1,
            this.checkChainConfirm())
        }
        playWait() {
            this.m_btn_Chain.visible = !1,
            this.m_btn_Wait.visible = !0,
            this.ani1.play(0, !0)
        }
        stopWait() {
            this.m_btn_Chain.visible = !0,
            this.m_btn_Wait.visible = !1,
            this.ani1.stop()
        }
        checkChainConfirm() {
            Laya.timer.clear(this, this.delayUnlockChainOperate),
            Laya.timer.clear(this, this.endChainConfirm);
            var t, e = S.get(S.s_signInSpeedOrderTime) || 0;
            let i = 0;
            if (e && (e = e + 4e4,
            t = (new Date).getTime(),
            i = e - t),
            0 < i)
                return this.playWait(),
                void Laya.timer.once(i, this, this.endChainConfirm);
            this.stopWait(),
            S.removeItem(S.s_signInSpeedOrderTime)
        }
        endChainConfirm() {
            S.removeItem(S.s_signInSpeedOrderTime),
            this.stopWait()
        }
        lockChainOperate() {
            this.playWait(),
            Laya.timer.once(6e4, this, this.delayUnlockChainOperate)
        }
        unlockChainOperate() {
            Laya.timer.clear(this, this.delayUnlockChainOperate),
            this.stopWait()
        }
        delayUnlockChainOperate() {
            this.stopWait()
        }
        onClickFree() {
            1e3 * this.m_freeEndTime > Date.newDate().getTime() || P.cat.reqSpeed(1).then(t=>{
                I.exdata.speedFreeTime = this.m_freeEndTime = +t.SpeedFreeTime,
                I.boostEndTime = this.m_speedEndTime = +t.boostEndTime,
                P.event(y.SPEED_FREE),
                this.updateView()
            }
            )
        }
        onClickChain() {
            I.BCCheckIn(St.booster).then(t=>{
                Mmobay.MConfig.channelId != Mmobay.MConst.CHANNEL_LOCAL && (this.m_payData = t.payData,
                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile || P.wallet.connected ? this.sendTransaction() : this.connectWallet())
            }
            )
        }
        onClickBuy() {
            return I.fishCoin < +Data.gameConf.upSpeedCfg.costFish ? d(Te, {
                closeOnSide: !0
            }) : this.m_speedEndTime - Date.newDate().getTime() / 1e3 + 3 > +Data.gameConf.upSpeedCfg.maxTime ? u(k(1029)) : void P.cat.reqSpeed(2).then(t=>{
                u(k(1033)),
                I.boostEndTime = this.m_speedEndTime = +t.boostEndTime,
                this.updateView()
            }
            )
        }
        connectWallet() {
            I.retainLink(p.ConnectWalletForSignInSpeed),
            P.wallet.connect().then(t=>{
                this.destroyed || Laya.timer.once(500, this, ()=>{
                    this.sendTransaction()
                }
                )
            }
            )
        }
        sendTransaction() {
            if (this.m_payData) {
                I.retainLink(p.CheckOrderForSignInSpeed);
                let e = {
                    amount: 8e6,
                    address: this.m_payData.walletAddress,
                    payload: this.m_payData.payload,
                    transactionType: Ht.gameSignin
                }
                  , i = ()=>{
                    P.wallet.sendTransaction(e).then(t=>{
                        I.updateBCCheckIn(St.booster, this.m_payData, t),
                        this.destroyed || (t = (new Date).getTime(),
                        S.set(S.s_signInSpeedOrderTime, t),
                        this.checkChainConfirm())
                    }
                    ).catch(t=>{
                        this.unlockChainOperate(),
                        t && t.code == oe.insufficientFunds && u("Insufficient gas")
                    }
                    )
                }
                ;
                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile ? d(fe, {
                    showEffect: !1,
                    retainPopup: !0
                }).then(t=>{
                    t.wait().then(t=>{
                        t.type == h.Yes && (this.lockChainOperate(),
                        e.walletType = t.data,
                        i())
                    }
                    )
                }
                ) : (this.lockChainOperate(),
                i())
            }
        }
    }
    L([A(y.UPDATE_SPEED)], Ge.prototype, "updateView", null);
    class Oe extends t.cat.views.home.UpGradeDlgUI {
        constructor(t) {
            super(),
            this.cat = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView(),
            D.instance.playSound("NewCat.mp3")
        }
        updateView() {
            var t = Data.getCat(this.cat);
            this.m_txt_OutPut.text = f(t.outGold) + "/s",
            this.m_view_Lv.setData(t.id);
            let e = R.create({
                url: "cat/spine/" + t.showId + ".json",
                parent: this,
                px: 257,
                py: 300,
                scale: 1,
                autoRemove: !1,
                alpha: 1
            });
            e.visible = !1,
            this.createPre(),
            this.ani1.addLabel("boom", 8),
            this.ani1.on(Laya.Event.LABEL, this, ()=>{
                R.create({
                    url: "cat/spine/boom.json",
                    parent: this,
                    px: 200,
                    py: 200,
                    autoRemove: !0,
                    alpha: 1,
                    autoPlay: !0,
                    scale: 1
                })
            }
            ),
            this.ani1.on(Laya.Event.COMPLETE, this, ()=>{
                this.m_view_Lv.visible = !0,
                P.cat.playCat(e, "happy", "pose"),
                e.visible = !0
            }
            ),
            this.ani1.play(0, !1)
        }
        createPre() {
            var t = R.create({
                url: "cat/spine/" + Data.getCat(this.cat - 1).showId + ".json",
                parent: this.m_box_L,
                px: 50,
                py: 100,
                scale: 1,
                autoRemove: !0,
                alpha: 1
            })
              , t = (P.cat.playCat(t, "squat idle"),
            R.create({
                url: "cat/spine/" + Data.getCat(this.cat - 1).showId + ".json",
                parent: this.m_box_R,
                px: 50,
                py: 100,
                scale: 1,
                autoRemove: !0,
                alpha: 1
            }));
            P.cat.playCat(t, "squat idle")
        }
        onClickShare() {
            I.doShareToTg(1, +Data.getCat(this.cat).showId)
        }
    }
    class qe extends t.cat.views.squad.SquadBoostDlgUI {
        constructor(t) {
            super(),
            this.m_lastIndex = -1,
            this.m_clubId = 0,
            this.m_clubId = t
        }
        onAwake() {
            super.onAwake(),
            this.addTitle(),
            P.club.reqGetRecruitListClub().then(t=>{
                this.showUI(t)
            }
            )
        }
        showUI(t) {
            t = this.checkPriceShow(t);
            this.m_lst_Price.array = t,
            this.m_lst_Price.visible = 0 < t.length,
            this.m_lst_Price.selectedIndex = 0
        }
        onDestroy() {
            super.onDestroy()
        }
        checkPriceShow(i) {
            var t = i.find(t=>t.id == this.m_clubId)
              , s = t && t.boostVal || 0
              , a = (i = i.filter(t=>t.boostVal >= +Data.gameConf.initCfg.clubMinBoost)).findIndex(t=>t.id == this.m_clubId);
            let n = [];
            for (let t = 0, e = i.length; t < e; t++) {
                var o = i[t];
                if (0 == t && o.id == this.m_clubId) {
                    n.push({
                        price: 100,
                        pIndex: 0
                    });
                    break
                }
                if (15 <= t || -1 != a && t >= a)
                    break;
                0 != t && 1 != t && 2 != t && 3 != t && 4 != t && 9 != t && 14 != t || n.push({
                    price: o.boostVal - s + 1,
                    pIndex: t
                })
            }
            return -1 == a && i.length < 15 && n.push({
                price: +Data.gameConf.initCfg.clubMinBoost - s,
                pIndex: i.length
            }),
            n
        }
        onSelectPrice() {
            if (-1 != this.m_lst_Price.selectedIndex && this.m_lst_Price.selectedItem) {
                if (-1 != this.m_lastIndex) {
                    let t = this.m_lst_Price.getItem(this.m_lastIndex);
                    t.isSelect = !1,
                    this.m_lst_Price.changeItem(this.m_lastIndex, t)
                }
                let t = this.m_lst_Price.getItem(this.m_lst_Price.selectedIndex);
                t.isSelect = !0,
                this.m_lst_Price.changeItem(this.m_lst_Price.selectedIndex, t),
                this.m_lastIndex = this.m_lst_Price.selectedIndex,
                this.m_lst_Price.selectedIndex = -1
            }
        }
        onClickBoost() {
            var t = this.m_lst_Price.getItem(this.m_lastIndex);
            if (t) {
                let l = t.price;
                I.reqTonExchangeRate().then(t=>{
                    let e = 0
                      , i = 0
                      , s = 0
                      , a = 0
                      , n = 0
                      , o = 0;
                    Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE ? e = +t.Usd2Mnt * l : (r = parseFloat(Data.gameConf.discountCfg.ton) || 1,
                    h = parseFloat(Data.gameConf.discountCfg.not) || 1,
                    i = +t.Usd2Ton * l,
                    s = +t.Usd2Not * l,
                    a = +t.Usd2Star * l,
                    n = i * (1 - r),
                    o = s * (1 - h));
                    var r, h, t = {
                        type: Wt.clubBooster,
                        name: "Club Boost",
                        icon: "cat/ui_recharge/pur_boost.png",
                        price: l,
                        mntPrice: e,
                        tonPrice: i,
                        notPrice: s,
                        starPrice: a,
                        tonOffPrice: n,
                        notOffPrice: o,
                        clubId: this.m_clubId
                    };
                    d(we, {
                        params: [t],
                        showEffect: !1,
                        retainPopup: !0
                    })
                }
                )
            }
        }
        onClickSquad() {
            m($e)
        }
    }
    class He extends t.cat.views.squad.TotalScoreDetailDlgUI {
        constructor(t) {
            super(),
            this.m_showData = null,
            this.m_showData = t
        }
        onAwake() {
            super.onAwake(),
            this.showUI()
        }
        showUI() {
            this.m_txt_Earned.text = f(this.m_showData.totalEarned),
            this.m_txt_Burned.text = "-" + f(this.m_showData.spentAndBurned),
            this.m_txt_TBalance.text = f(+this.m_showData.totalEarned - +this.m_showData.spentAndBurned)
        }
        onDestroy() {
            super.onDestroy()
        }
        onClickOk() {
            this.closeDialog()
        }
    }
    class Ve extends t.cat.views.squad.TotalScoreShowDlgUI {
        constructor() {
            super(...arguments),
            this.m_showData = null
        }
        onAwake() {
            super.onAwake(),
            this.addTitle(),
            P.club.reqGetStats().then(t=>{
                this.m_showData = t,
                this.showUI()
            }
            )
        }
        showUI() {
            this.m_txt_Total.text = f(+this.m_showData.totalEarned - +this.m_showData.spentAndBurned),
            this.m_txt_TPlayers.text = jt(this.m_showData.totalPlayers || 0),
            this.m_txt_DailyNum.text = jt(this.m_showData.dailyUsers || 0),
            this.m_txt_NumOl.text = jt(this.m_showData.online || 0),
            this.m_txt_NumPrem.text = jt(this.m_showData.premiumPlayers || 0);
            var i = P.club.getRandomIco(12);
            for (let e = 0; e < 12; e++) {
                let t = this["m_view_Head" + e];
                t && t.setHeadShow({
                    isCircle: !0,
                    icoUrl: i[e],
                    borderLvl: 5,
                    notShowChain: !0
                })
            }
        }
        onDestroy() {
            super.onDestroy()
        }
        onClickDetailTxt() {
            this.m_showData && d(He, {
                params: [this.m_showData],
                closeOnSide: !0
            })
        }
        onClickInvite() {
            I.doInviteAction()
        }
    }
    class We extends t.cat.views.squad.RankCellViewUI {
        dataChanged(t, e) {
            e ? this.dataSource = e : e = this.dataSource;
            var i, s = e.rankData;
            this.m_img_Rank.visible = +s.rank <= 3,
            +s.rank <= 3 && (this.m_img_Rank.skin = `cat/ui_rank/img_ranking_number_${+s.rank}.png`),
            this.m_txt_Rank.visible = 3 < +s.rank,
            this.m_txt_Rank.text = s.rank + "",
            this.m_txt_Name.text = s.name,
            this.m_img_Score.visible = !0,
            this.m_txt_Score.text = f(s.score) || "0",
            this.m_txt_Score.color = 2 == e.league ? "#ffffff" : "#cccccc",
            this.m_view_Head.setHeadShow({
                isCircle: !0,
                icoUrl: s.ico,
                uname: s.name,
                borderLvl: e.league,
                channelId: s.channelId,
                notShowChain: s.isClubList
            }),
            this.m_img_tri.visible = s.isClubList;
            let a = 0;
            a = s.isClubList ? (i = s.id == (P.club.clubInfo && P.club.clubInfo.id),
            this.m_txt_Desc.text = i ? "Your" : "",
            this.m_txt_Name.width = i ? 185 : 240) : (i = s.id == I.id,
            this.m_txt_Desc.text = i ? "You" : "",
            this.m_txt_Name.width = i ? 185 : 240),
            this.m_txt_Name._tf.lines.toString() != this.m_txt_Name.text ? (this.m_txt_Over.right = a - this.m_txt_Name._tf.textWidth - 30 + 3,
            this.m_txt_Over.visible = !0) : this.m_txt_Over.visible = !1,
            this.m_img_Line.skin = `cat/ui_rank/line${e.league}.png`,
            this.m_img_BarBg.visible = !!e.isSelf,
            this.m_img_BarBg.skin = `cat/ui_rank/border2${e.league}.png`
        }
    }
    We.CheckFlagNum = 0;
    class Ye extends t.cat.views.squad.SquadRankListDlgUI {
        constructor(t=0, e=!1) {
            super(),
            this.m_listType = 0,
            this.m_listTypeP = 0,
            this.m_league = 0,
            this.m_selfLeague = 0,
            this.m_selfRankGold = 0,
            this.m_selfIndex = -1,
            this.m_cellPool = [],
            this.m_cellDataList = [],
            this.m_cellCheck = {},
            this.m_headShowed = !1,
            this.m_txtColorCfg = {
                0: ["#D5a281", "#cd6f32"],
                1: ["#8a91b1", "#5f6eaf"],
                2: ["#f0be2e", "#e89300"],
                3: ["#8595cd", "#323e72"],
                4: ["#69b2ea", "#1082d9"],
                5: ["#c5a7ff", "#7a33c1"],
                6: ["#c5a7ff", "#8454d4"]
            },
            this.m_league = t,
            this.m_selfLeague = I.rankLeague,
            this.m_selfRankGold = +I.rankGold,
            this.m_listTypeP = e ? 1 : 0
        }
        onAwake() {
            super.onAwake(),
            this.addTitle(),
            this.m_txt_No.visible = !0,
            this.m_pan_Con.vScrollBar.on(Laya.Event.CHANGE, this, this.onScrollChange),
            this.changeLeagueShow(),
            this.changeStatusShow()
        }
        onDestroy() {
            super.onDestroy(),
            Laya.Tween.clearAll(this.m_img_BarBg2),
            this.removePool()
        }
        onClickStats() {
            m(Ve)
        }
        onClickLeft() {
            0 != this.m_league && (this.m_league--,
            this.changeLeagueShow())
        }
        onClickRight() {
            6 != this.m_league && (this.m_league++,
            this.changeLeagueShow())
        }
        changeLeagueShow() {
            this.m_img_AdaptBg.skin = `cat/ui_bg/${this.changeImgUrl()}.png`,
            this.m_img_Level.skin = `cat/ui_notpack/cup_${this.changeImgUrl()}.png`,
            this.m_img_BorderBg2.skin = this.m_img_BorderBg3.skin = `cat/ui_rank/border${this.changeImgUrl()}.png`,
            this.m_img_Line.skin = `cat/ui_rank/line${this.changeImgUrl()}.png`,
            this.m_img_BarBg.skin = "cat/ui_rank/border10.png",
            this.m_img_Left.disabled = 0 == this.m_league,
            this.m_img_Right.disabled = 6 == this.m_league,
            this.m_img_Left.alpha = 0 == this.m_league ? .7 : 1,
            this.m_img_Right.alpha = 6 == this.m_league ? .7 : 1;
            var t = Data.gameConf.initCfg.minerLeagues.split(",")
              , e = Data.gameConf.initCfg.clubLeagues.split(",")
              , i = (this.m_txt_Level.text = k(1006, k(Gt[this.m_league])),
            this.getRankList(),
            P.club.clubInfo && P.club.clubInfo.league || -1)
              , s = P.club.clubInfo && P.club.clubInfo.rankGold;
            let a = 0;
            0 == this.m_listTypeP ? (a = this.m_selfLeague,
            this.onClickPersonal()) : (a = i,
            this.onClickSquad()),
            this.m_league == a ? (this.m_txt_Tips.visible = !1,
            this.m_box_ScoreBar.visible = !0,
            this.m_pbr_Score.skin = `cat/ui_notpack/process${this.changeImgUrl()}.png`,
            0 == this.m_listTypeP ? (this.m_txt_Score.text = f(this.m_selfRankGold) + "/" + f(+t[this.m_league + 1] || 0),
            this.m_pbr_Score.value = this.m_selfRankGold / +t[this.m_league + 1] || 0) : (this.m_txt_Score.text = f(s) + "/" + f(+e[this.m_league + 1] || 0),
            this.m_pbr_Score.value = +s / +e[this.m_league + 1] || 0)) : (0 == this.m_listTypeP ? this.m_txt_Tips.text = k(1005, f(+t[this.m_league])) : this.m_txt_Tips.text = k(1005, f(+e[this.m_league])),
            this.m_txt_Tips.visible = !0,
            this.m_box_ScoreBar.visible = !1),
            0 == this.m_listType ? (this.m_txt_Day.color = this.m_txtColorCfg[this.m_league][1],
            this.m_txt_Week.color = this.m_txtColorCfg[this.m_league][0]) : (this.m_txt_Week.color = this.m_txtColorCfg[this.m_league][1],
            this.m_txt_Day.color = this.m_txtColorCfg[this.m_league][0]),
            0 == this.m_listTypeP ? (this.m_txt_Personal.color = this.m_txtColorCfg[this.m_league][1],
            this.m_txt_Squad.color = this.m_txtColorCfg[this.m_league][0]) : (this.m_txt_Squad.color = this.m_txtColorCfg[this.m_league][1],
            this.m_txt_Personal.color = this.m_txtColorCfg[this.m_league][0]),
            this.m_txt_Score.color = this.m_txt_Tips.color = 2 == this.m_league ? "#ffffff" : "#cccccc",
            this.resetShowHeadView()
        }
        changeStatusShow() {
            P.club.reqGetStats().then(t=>{
                this.m_headShowed = !0,
                this.m_txt_TotalPlayers.text = jt(t.totalPlayers) + " Catizens";
                var i = P.club.getRandomIco(3);
                for (let e = 0; e < 3; e++) {
                    let t = this["m_view_Head" + e];
                    t && t.setHeadShow({
                        isCircle: !0,
                        icoUrl: i[e],
                        borderLvl: this.changeImgUrl(),
                        notShowChain: !0
                    })
                }
            }
            )
        }
        resetShowHeadView() {
            if (this.m_headShowed)
                for (let i = 0; i < 3; i++) {
                    let t = this["m_view_Head" + i]
                      , e = t.m_data;
                    t && (e.borderLvl = this.m_league,
                    t.setHeadShow(e))
                }
        }
        onClickDay() {
            Laya.Tween.to(this.m_img_BarBg2, {
                x: 9
            }, 200),
            0 != this.m_listType && (this.m_listType = 0,
            this.changeLeagueShow())
        }
        onClickWeek() {
            Laya.Tween.to(this.m_img_BarBg2, {
                x: 247
            }, 200),
            1 != this.m_listType && (this.m_listType = 1,
            this.changeLeagueShow())
        }
        onClickPersonal() {
            Laya.Tween.to(this.m_img_BarBg, {
                x: 24
            }, 200),
            0 != this.m_listTypeP && (this.m_listTypeP = 0,
            this.changeLeagueShow())
        }
        onClickSquad() {
            Laya.Tween.to(this.m_img_BarBg, {
                x: 262
            }, 200),
            1 != this.m_listTypeP && (this.m_listTypeP = 1,
            this.changeLeagueShow())
        }
        onClickRankCell(t) {
            0 != this.m_listTypeP && t.target.dataSource && (t = t.target.dataSource,
            m(Xe, {
                params: [t.rankData.id]
            }))
        }
        getRankList() {
            0 == this.m_listTypeP ? P.club.reqGetGoldRankList(this.m_league, this.m_listType).then(t=>{
                let i = [];
                if (t.rankList.forEach(t=>{
                    i.push({
                        rankData: {
                            rank: +t.rank,
                            ico: t.icon + "",
                            isClubList: !1,
                            name: t.name,
                            id: t.userId,
                            score: +t.score,
                            channelId: t.channelID
                        },
                        league: this.changeImgUrl()
                    })
                }
                ),
                this.reSetListCon(),
                this.m_cellDataList = i,
                this.m_box_ListCon.visible = 0 < i.length,
                this.m_box_ListCon.height = 94 * i.length,
                this.onScrollChange(),
                this.m_txt_No.visible = 0 == i.length,
                this.m_box_Bottom.height = Math.max(this.m_box_ListCon.y + this.m_box_ListCon.height + 20, 400),
                t.myInfo && +t.myInfo.score) {
                    let e = {
                        rankData: {
                            id: t.myInfo.userId,
                            score: +t.myInfo.score,
                            rank: +t.myInfo.rank,
                            ico: t.myInfo.icon + "",
                            isClubList: !1,
                            name: t.myInfo.name,
                            channelId: t.myInfo.channelID
                        },
                        league: this.changeImgUrl(),
                        isSelf: !0
                    };
                    this.m_view_Self.dataChanged(null, e),
                    this.m_view_Self.visible = !0,
                    this.m_selfIndex = i.findIndex(t=>t.rankData.id == e.rankData.id),
                    3 < this.m_selfIndex || this.m_selfIndex < 0 ? (this.m_view_Self.visible = !0,
                    this.m_pan_Con.height = 1026,
                    this.m_img_BorderBg3.bottom = -94) : 0 <= this.m_selfIndex && (this.m_view_Self.visible = !1,
                    this.m_pan_Con.height = 1120,
                    this.m_img_BorderBg3.bottom = 0)
                } else
                    this.m_selfIndex = -1,
                    this.m_view_Self.visible = !1,
                    this.m_pan_Con.height = 1120,
                    this.m_img_BorderBg3.bottom = 0;
                this.m_pan_Con.refresh()
            }
            ) : 1 == this.m_listTypeP && (this.m_view_Self.visible = !1,
            P.club.reqGetClubGoldRankList(this.m_league, this.m_listType).then(t=>{
                if (!this.destroyed) {
                    let i = [];
                    if (t.rankList.forEach(t=>{
                        i.push({
                            rankData: {
                                rank: +t.rank,
                                ico: t.icon + "",
                                isClubList: !0,
                                name: t.name,
                                id: t.id,
                                score: +t.score
                            },
                            league: this.changeImgUrl()
                        })
                    }
                    ),
                    this.reSetListCon(),
                    this.m_cellDataList = i,
                    this.m_box_ListCon.visible = 0 < i.length,
                    this.m_box_ListCon.height = 94 * i.length,
                    this.onScrollChange(),
                    this.m_txt_No.visible = 0 == i.length,
                    this.m_box_Bottom.height = Math.max(this.m_box_ListCon.y + this.m_box_ListCon.height + 20, 400),
                    t.myRank) {
                        let e = {
                            rankData: {
                                id: t.myRank.id,
                                score: +t.myRank.score,
                                rank: +t.myRank.rank,
                                ico: t.myRank.icon + "",
                                isClubList: !0,
                                name: t.myRank.name
                            },
                            league: this.changeImgUrl(),
                            isSelf: !0
                        };
                        this.m_view_Self.dataChanged(null, e),
                        this.m_view_Self.visible = !0,
                        this.m_selfIndex = i.findIndex(t=>t.rankData.id == e.rankData.id),
                        3 < this.m_selfIndex || this.m_selfIndex < 0 ? (this.m_view_Self.visible = !0,
                        this.m_pan_Con.height = 1026,
                        this.m_img_BorderBg3.bottom = -94) : 0 <= this.m_selfIndex && (this.m_view_Self.visible = !1,
                        this.m_pan_Con.height = 1120,
                        this.m_img_BorderBg3.bottom = 0)
                    } else
                        this.m_selfIndex = -1,
                        this.m_view_Self.visible = !1,
                        this.m_pan_Con.height = 1120,
                        this.m_img_BorderBg3.bottom = 0;
                    this.m_pan_Con.refresh()
                }
            }
            ))
        }
        onScrollChange() {
            var t = this.m_pan_Con.vScrollBar.value;
            this.checkCellViewShow(t),
            this.m_selfIndex < 4 || (t > 112 + 94 * (this.m_selfIndex - 4) ? (this.m_view_Self.visible = !1,
            this.m_pan_Con.height = 1120,
            this.m_img_BorderBg3.bottom = 0) : (this.m_view_Self.visible = !0,
            this.m_pan_Con.height = 1026,
            this.m_img_BorderBg3.bottom = -94))
        }
        checkCellViewShow(t) {
            var e = Math.floor(t / 94);
            for (let t = e - 10; t < e + 10; t++)
                this.createCell(t)
        }
        createCell(t) {
            var e = this.m_cellDataList;
            e[t] && !this.m_cellCheck[t] && (this.m_cellCheck[t] = 1,
            this.getCellView(e[t], t))
        }
        getCellView(e, i) {
            let t = this.m_cellPool.shift();
            t ? (t.dataChanged(i, e),
            t.y = 94 * i,
            this.m_box_ListCon.addChild(t)) : _(We, {}).then(t=>{
                this.destroyed ? t.destroy() : (t.dataChanged(i, e),
                t.y = 94 * i,
                this.m_box_ListCon.addChild(t))
            }
            )
        }
        removePool() {
            this.m_cellPool.forEach(t=>{
                t.destroy()
            }
            ),
            this.m_cellPool.length = 0
        }
        reSetListCon() {
            for (let t = this.m_box_ListCon.numChildren - 1; 0 <= t; t--) {
                var e = this.m_box_ListCon.removeChildAt(t);
                this.m_cellPool.push(e)
            }
            for (var t in this.m_cellCheck)
                delete this.m_cellCheck[t];
            this.m_cellCheck = {}
        }
        changeImgUrl() {
            return 5 == this.m_league || 6 == this.m_league ? this.m_league + 1 : this.m_league
        }
    }
    class Xe extends t.cat.views.squad.SquadInfoDlgUI {
        constructor(t=0) {
            super(),
            this.m_clubId = 0,
            this.m_listType = 0,
            this.m_clubData = null,
            this.m_cellPool = [],
            this.m_cellDataList = [],
            this.m_cellCheck = {},
            this.m_txtColorCfg = {
                0: ["#D5a281", "#cd6f32"],
                1: ["#8a91b1", "#5f6eaf"],
                2: ["#f0be2e", "#e89300"],
                3: ["#8595cd", "#323e72"],
                4: ["#69b2ea", "#1082d9"],
                5: ["#c5a7ff", "#7a33c1"],
                6: ["#c5a7ff", "#8454d4"]
            },
            this.m_clubId = t
        }
        onAwake() {
            super.onAwake(),
            this.addTitle(),
            this.m_txt_No.visible = !0,
            this.m_pan_Con.vScrollBar.on(Laya.Event.CHANGE, this, this.onScrollChange),
            this.getClubInfoShow()
        }
        getClubInfoShow() {
            P.club.reqClubInfo(this.m_clubId).then(t=>{
                this.m_clubData = t.club,
                this.showUI(t.club)
            }
            )
        }
        showUI(t) {
            this.m_img_AdaptBg.skin = `cat/ui_bg/${this.changeImgUrl(t.league)}.png`,
            this.m_img_BoxBg.skin = this.m_img_Border1.skin = `cat/ui_rank/border${this.changeImgUrl(t.league)}.png`,
            this.m_img_Line.skin = `cat/ui_rank/line${this.changeImgUrl(t.league)}.png`,
            this.m_img_SLine.skin = `cat/ui_rank/line${this.changeImgUrl(t.league)}.png`,
            P.club.clubInfo && P.club.clubInfo.id == this.m_clubId ? (this.m_btn_Invite.visible = this.m_btn_Leave.visible = this.m_btn_Boost.visible = !0,
            this.m_btn_Join.visible = !1,
            this.m_txt_Desc.text = this.showSquadTxtByNum(t.population),
            this.m_txt_Desc.visible = !0,
            this.m_box_Con.y = 523,
            this.m_box_Con.height = 404,
            this.m_btn_Boost2.visible = !1,
            this.m_btn_Boost.visible = !0) : (this.m_btn_Invite.visible = this.m_btn_Leave.visible = !1,
            this.m_btn_Join.visible = this.m_btn_Boost.visible = !0,
            this.m_txt_Desc.visible = !1,
            this.m_box_Con.y = 390,
            this.m_box_Con.height = 306,
            this.m_btn_Boost.visible = !1,
            this.m_btn_Boost2.visible = !0),
            this.m_box_ListCon.y = this.m_box_Con.y + this.m_box_Con.height + 24,
            this.m_img_Cup.skin = `cat/ui_notpack/cup${this.changeImgUrl(t.league)}.png`,
            this.m_txt_Level.text = k(Gt[t.league]),
            this.m_view_Head.setHeadShow({
                isCircle: !1,
                uname: t.name,
                icoUrl: t.icon + "",
                borderLvl: this.changeImgUrl(t.league),
                notShowChain: !0
            }),
            this.m_txt_MemberNum.text = t.population + "";
            let e = t.name;
            var i, s;
            this.m_txt_Name.text = e,
            300 < this.m_txt_Name.width && (i = e.length,
            s = Math.ceil((this.m_txt_Name.width - 300) / 20),
            this.m_txt_Name.text = e.slice(0, (i - s) / 2) + "..." + e.slice(i - (i - s) / 2)),
            this.m_txt_Score.text = f(t.rankGold),
            this.getRankList()
        }
        onClickInvite() {
            I.doInviteAction()
        }
        onClickLeave() {
            ut({
                button: s.YesNo,
                msg: k(1030, this.m_clubData.name),
                title: k(1034),
                okTxt: k(1035)
            }).then(t=>{
                t.type == h.Yes && P.club.reqQuitClub().then(()=>{
                    this.getClubInfoShow()
                }
                )
            }
            )
        }
        onClickBoost() {
            m(qe, {
                params: [this.m_clubId]
            })
        }
        onClickLeague() {
            this.m_clubData && m(Ye, {
                params: [this.m_clubData.league, !0]
            })
        }
        onClickJoin() {
            this.m_btn_Join.disabled = !0,
            P.club.reqJoinClub(this.m_clubId).then(t=>{
                this.showUI(t.club),
                this.m_btn_Join.disabled = !1
            }
            )
        }
        changeTxtColor() {
            var t;
            this.m_clubData && (t = this.m_clubData.league || 0,
            0 == this.m_listType ? (this.m_txt_Day.color = this.m_txtColorCfg[t][1],
            this.m_txt_Week.color = this.m_txtColorCfg[t][0]) : (this.m_txt_Week.color = this.m_txtColorCfg[t][1],
            this.m_txt_Day.color = this.m_txtColorCfg[t][0]))
        }
        onClickDay() {
            this.m_clubData && 0 != this.m_listType && (this.m_listType = 0,
            Laya.Tween.to(this.m_img_BarBg, {
                x: 8
            }, 200),
            this.getRankList())
        }
        onClickWeek() {
            this.m_clubData && 1 != this.m_listType && (this.m_listType = 1,
            Laya.Tween.to(this.m_img_BarBg, {
                x: 244
            }, 200),
            this.getRankList())
        }
        getRankList() {
            this.changeTxtColor(),
            P.club.reqClubMemberRank(this.m_clubId, this.m_listType).then(t=>{
                let e = [];
                t.rankList.forEach(t=>{
                    e.push({
                        rankData: {
                            rank: +t.rank,
                            ico: t.icon + "",
                            isClubList: !1,
                            name: t.name,
                            score: +t.score,
                            id: t.userId,
                            channelId: t.channelID
                        },
                        league: this.m_clubData.league
                    })
                }
                ),
                this.m_cellDataList = e,
                this.reSetListCon();
                t = e.length;
                this.m_txt_No.visible = 0 == t,
                this.m_box_SquadCon.height = 94 * t,
                this.m_box_ListCon.height = Math.max(this.m_box_SquadCon.y + 94 * t + 20, 380),
                this.onScrollChange()
            }
            )
        }
        onClickShare() {
            var t, e;
            this.m_clubData && (t = this.m_clubData.groupId,
            e = this.m_clubData.id,
            I.toSquadChat(t, e))
        }
        onDestroy() {
            super.onDestroy(),
            this.removePool()
        }
        showSquadTxtByNum(e) {
            var t = [[1e4, 0, 1007], [3e3, 1e4, 1008], [700, 3e3, 1009], [300, 700, 1010], [100, 300, 1011], [30, 100, 1012], [15, 30, 1013], [11, 15, 1014], [0, 11, 1015]];
            return k(t.find(t=>{
                if (+t[0] <= e && (!t[1] || e < +t[1]))
                    return !0
            }
            )[2]) || k(t[8][2])
        }
        onScrollChange() {
            var t = this.m_pan_Con.vScrollBar.value;
            this.checkCellViewShow(t)
        }
        checkCellViewShow(t) {
            var e = Math.floor(t / 94);
            for (let t = e - 10; t < e + 10; t++)
                this.createCell(t)
        }
        createCell(t) {
            var e = this.m_cellDataList;
            e[t] && !this.m_cellCheck[t] && (this.m_cellCheck[t] = 1,
            this.getCellView(e[t], t))
        }
        getCellView(e, i) {
            let t = this.m_cellPool.shift();
            t ? (t.dataChanged(i, e),
            t.y = 94 * i,
            this.m_box_SquadCon.addChild(t)) : _(We, {}).then(t=>{
                this.destroyed ? t.destroy() : (t.dataChanged(i, e),
                t.y = 94 * i,
                this.m_box_SquadCon.addChild(t))
            }
            )
        }
        removePool() {
            this.m_cellPool.forEach(t=>{
                t.destroy()
            }
            ),
            this.m_cellPool.length = 0
        }
        reSetListCon() {
            for (let t = this.m_box_SquadCon.numChildren - 1; 0 <= t; t--) {
                var e = this.m_box_SquadCon.removeChildAt(t);
                this.m_cellPool.push(e)
            }
            for (var t in this.m_cellCheck)
                delete this.m_cellCheck[t];
            this.m_cellCheck = {}
        }
        changeImgUrl(t) {
            return 5 == t || 6 == t ? t + 1 : t
        }
    }
    class $e extends t.cat.views.squad.JoinSquadListDlgUI {
        onAwake() {
            super.onAwake(),
            this.addTitle(),
            this.m_lst_Squad.visible = !1,
            P.club.reqGetRecruitListClub().then(t=>{
                this.m_lst_Squad.array = t,
                this.m_lst_Squad.visible = !0
            }
            )
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clearAll(this)
        }
        onSelectSquad() {
            var t;
            -1 != this.m_lst_Squad.selectedIndex && (t = this.m_lst_Squad.getItem(this.m_lst_Squad.selectedIndex)) && (this.m_lst_Squad.selectedIndex = -1,
            m(Xe, {
                params: [t.id]
            }))
        }
        onClickOtherSquad() {
            I.doCreateClubAction()
        }
    }
    class Ke extends t.cat.views.squad.InviteDetailShowDlgUI {
        constructor(t, e) {
            super(),
            this.m_showDouble = !1,
            this.m_endTime = 0,
            this.m_showDouble = t,
            this.m_endTime = e
        }
        onAwake() {
            super.onAwake(),
            this.addTitle(),
            this.showUI()
        }
        onDestroy() {
            super.onDestroy(),
            this.clearTicker()
        }
        clearTicker() {
            this.m_ticker && (this.m_ticker.dispose(),
            this.m_ticker = null)
        }
        showUI() {
            var s = Data.gameConf.initCfg.inviterNormalGolds.split(",")
              , a = Data.gameConf.initCfg.inviterPremiumGolds.split(",");
            for (let i = 0; i < s.length; i++) {
                let t = this["m_txt_inviteB" + i]
                  , e = this["m_txt_inviteP" + i];
                t && (t.text = "+" + s[i]),
                e && (e.text = "+" + a[i])
            }
            this.m_box_Double.visible = this.m_box_Double2.visible = this.m_showDouble,
            this.m_showDouble ? (this.m_box_Time.visible = !0,
            this.m_box_Con.y = 300,
            this.m_ticker = E.create(+this.m_endTime, 1e3, this.m_txt_timeEnd),
            this.m_ticker.start()) : (this.m_box_Con.y = 0,
            this.m_box_Time.visible = !1)
        }
        onClickInvite() {
            I.doInviteAction()
        }
        onClickDetails() {
            I.toPremiumTg()
        }
        onClickCopy() {
            let t = `https://t.me/${Zt()}/gameapp?startapp=`;
            P.club.clubInfo && P.club.clubInfo.id ? t += `r_${P.club.clubInfo.id}_` + I.id : t += "rp_" + I.id,
            window.mbplatform.clipboard(t),
            u("link copied!")
        }
    }
    class ze extends t.cat.views.squad.InvitePartyKingsDlgUI {
        onAwake() {
            super.onAwake(),
            this.addTitle(),
            P.invite.reqInviteRankList().then(t=>{
                this.showUI(t)
            }
            )
        }
        onDestroy() {
            super.onDestroy()
        }
        showUI(t) {
            this.m_lst_User.array = t.rankList
        }
        onClickInvite() {
            I.doInviteAction()
        }
        onClickCopy() {
            P.table.getInviteCopyLink()
        }
    }
    class je extends t.cat.views.squad.FriendCellViewUI {
        dataChanged(t, e) {
            e ? this.dataSource = e : e = this.dataSource,
            this.m_txt_AddScore.text = "+" + f(e.income),
            this.m_txt_Name.text = e.name,
            this.m_txt_Level.text = k(Gt[e.league]),
            this.m_img_Cup.skin = `cat/ui_notpack/cup${this.changeImgUrl(e.league)}.png`;
            var i = this.m_txt_Name.width;
            this.m_txt_Name._tf.lines.toString() != this.m_txt_Name.text ? (this.m_txt_Over.right = i - this.m_txt_Name._tf.textWidth - 25 + 3,
            this.m_txt_Over.visible = !0) : this.m_txt_Over.visible = !1,
            this.m_view_Head.setHeadShow({
                isCircle: !0,
                icoUrl: e.icon + "",
                uname: e.name,
                borderLvl: 5,
                channelId: e.channelID
            })
        }
        changeImgUrl(t) {
            return 5 == t || 6 == t ? t + 1 : t
        }
    }
    class Ze extends t.cat.views.squad.FrenZenDlgUI {
        onAwake() {
            super.onAwake(),
            this.addTitle();
            var i = Data.gameConf.initCfg.inviterNormalXZens.split(",");
            for (let e = 0; e < i.length; e++) {
                let t = this["m_txt_inviteB" + e];
                t && (t.text = "+" + i[e])
            }
        }
        onClickCopy() {
            let t = `https://t.me/${Zt()}/gameapp?startapp=`;
            P.club.clubInfo && P.club.clubInfo.id ? t += `r_${P.club.clubInfo.id}_` + I.id : t += "rp_" + I.id,
            window.mbplatform.clipboard(t),
            u("link copied!")
        }
        onClickInvite() {
            I.doInviteAction()
        }
    }
    class Je extends t.cat.views.lunchPool.AssetsDlgUI {
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        updateView() {
            this.m_lst_Assets.array = [{
                name: "$vKITTY",
                num: I.gold,
                icon: "cat/ui_item/coin.png"
            }, {
                name: "FishCoins",
                num: I.fishCoin,
                icon: "cat/ui_item/8.png"
            }, {
                name: "$wCATI",
                num: I.wCati,
                icon: "cat/ui_item/wcati.png"
            }, {
                name: "$xZEN",
                num: I.xZen,
                icon: "cat/ui_item/xzen.png"
            }]
        }
    }
    class Qe extends t.cat.views.squad.FrenZoneDlgUI {
        constructor() {
            super(...arguments),
            this.m_cellPool = [],
            this.m_cellDataList = [],
            this.m_cellCheck = {},
            this.m_showDouble = !1,
            this.m_endTime = 0
        }
        onAwake() {
            super.onAwake(),
            this.addTitle(),
            this.m_pan_Con.vScrollBar.on(Laya.Event.CHANGE, this, this.onScrollChange),
            this.m_txt_TopLeaders.on(Laya.Event.CLICK, this, ()=>{
                m(ze)
            }
            ),
            P.invite.reqFrensInfo().then(t=>{
                this.showUI(t)
            }
            ),
            this.m_box_Reward1.on(Laya.Event.CLICK, this, ()=>{
                this.onClickReward1()
            }
            ),
            this.m_box_Reward2.on(Laya.Event.CLICK, this, ()=>{
                this.onClickReward2()
            }
            ),
            P.invite.reqFrensInviterDoubleInfo().then(t=>{
                this.checkDoubleShow(t)
            }
            )
        }
        onDestroy() {
            super.onDestroy(),
            this.removePool()
        }
        checkDoubleShow(t) {
            var e = Date.newDate().getTime()
              , i = 1e3 * +t.startTime
              , t = 1e3 * +t.endTime;
            this.m_showDouble = i < e && e < t,
            this.m_box_Double.visible = this.m_showDouble,
            this.m_endTime = t
        }
        showUI(t) {
            this.m_cellDataList = t.friendList,
            this.m_txt_No.visible = 0 == t.friendList.length;
            var e = this.m_cellDataList.length;
            this.onScrollChange(),
            this.m_box_ListCon.height = 150 * e,
            0 == e ? this.m_box_Friend.height = 190 : (this.m_box_Friend.height = 1 < e ? 150 * e : 140,
            this.m_pan_Con.refresh()),
            t.inviteCount && (this.m_txt_Frens.text = t.inviteCount + " Frens",
            this.m_txt_Fish.text = Intl.NumberFormat().format(+t.fishCoin),
            this.m_txt_Zen.text = Intl.NumberFormat().format(+t.xZen)),
            this.m_box_Invite.visible = !!t.inviteCount,
            this.m_box_NoInvite.visible = !t.inviteCount
        }
        onClickReward1() {
            m(Ke, {
                params: [this.m_showDouble, this.m_endTime]
            })
        }
        onClickReward2() {
            m(Ze)
        }
        onClickInvite() {
            I.doInviteAction()
        }
        onScrollChange() {
            var t = this.m_pan_Con.vScrollBar.value;
            this.checkCellViewShow(t)
        }
        checkCellViewShow(t) {
            var e = Math.floor(t / 150);
            for (let t = e - 10; t < e + 10; t++)
                this.createCell(t)
        }
        createCell(t) {
            var e = this.m_cellDataList;
            e[t] && !this.m_cellCheck[t] && (this.m_cellCheck[t] = 1,
            this.getCellView(e[t], t))
        }
        getCellView(e, i) {
            this.m_cellPool.shift() || _(je, {}).then(t=>{
                this.destroyed ? t.destroy() : (t.dataChanged(i, e),
                t.y = 150 * i,
                this.m_box_ListCon.addChild(t))
            }
            )
        }
        removePool() {
            this.m_cellPool.forEach(t=>{
                t.destroy()
            }
            ),
            this.m_cellPool.length = 0
        }
        onClickCopy() {
            let t = `https://t.me/${Zt()}/gameapp?startapp=`;
            P.club.clubInfo && P.club.clubInfo.id ? t += `r_${P.club.clubInfo.id}_` + I.id : t += "rp_" + I.id,
            window.mbplatform.clipboard(t),
            u("link copied!")
        }
        onClickAssets() {
            d(Je)
        }
    }
    class ti extends t.cat.views.home.OffLineDlgUI {
        constructor(t) {
            super(),
            this.m_off = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        updateView() {
            this.m_off.fishCoin ? (this.m_txt_FishCoin.text = "" + this.m_off.fishCoin,
            this.m_txt_Air.text = "x" + this.m_off.offAirDrop,
            this.m_txt_Price2.text = "x" + f(+this.m_off.offGold * +Data.gameConf.offLineCfg.payCoinTimes),
            this.ani2.play(0, !1)) : this.ani1.play(0, !1),
            this.m_txt_Price.text = "x" + f(this.m_off.offGold)
        }
        onClickFree() {
            P.cat.reqOff(0).then(()=>{
                this.closeDialog()
            }
            )
        }
        onClickGet() {
            if (I.fishCoin < +Data.gameConf.offLineCfg.costFish)
                return d(Te, {
                    closeOnSide: !0
                });
            P.cat.reqOff(1).then(()=>{
                this.closeDialog(),
                I.checkRandomBox()
            }
            )
        }
    }
    class ei extends t.cat.views.common.FingerViewUI {
    }
    class ii extends t.cat.views.home.RandomEventsDlgUI {
        constructor(t, e=!1) {
            super(),
            this.m_spine = null,
            this.m_spineStr = "",
            this.m_isAuto = !1,
            this.m_spineStr = t,
            this.m_isAuto = e
        }
        onAwake() {
            super.onAwake();
            let s = I.randomEvent;
            var t;
            s && (D.instance.playSound("random.mp3"),
            this.m_spine || (this.m_spine = R.create({
                url: "cat/spine/" + this.m_spineStr + ".json",
                parent: this.m_box_Spine,
                px: 50,
                py: 150,
                autoPlay: !1
            }),
            s.type == Ut.multiple ? (this.m_spine.play(2, !0),
            this.m_txt_Middle.text = k(1041),
            this.m_txt_Right.text = k(1040)) : (this.m_spine.play(3, !0),
            this.m_txt_Middle.text = k(1043),
            this.m_txt_Right.text = k(1042))),
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE ? this.m_img_Chain.skin = "cat/ui_comm/mantle.png" : this.m_img_Chain.skin = "cat/ui_comm/ton.png",
            s.type == Ut.multiple ? (t = Data.gameConf.randomEventCfg.multipleTimes.split(","),
            this.m_txt_Time1.text = Math.ceil(+t[0] / 60) + "min",
            this.m_txt_Time2.text = Math.ceil(+t[2] / 60) + "min",
            this.m_txt_Time3.text = Math.ceil(+t[1] / 60) + "min") : (t = Data.gameConf.randomEventCfg.boxNums.split(","),
            this.m_txt_Time1.text = "+" + t[0],
            this.m_txt_Time2.text = "+" + t[2],
            this.m_txt_Time3.text = "+" + t[1]),
            this.m_txt_Cost.text = +Data.gameConf.randomEventCfg.costFish + "",
            this.m_isAuto && I.exdata.autoMerge && Laya.timer.once(1e4, this, ()=>{
                var t = S.get(S.s_autoPlusGift)
                  , e = S.get(S.s_autoPlusGold);
                let i = !1;
                I.fishCoin >= +Data.gameConf.randomEventCfg.costFish && (s.type == Ut.multiple ? e && (i = !0) : t && (i = !0)),
                i ? this.onClickBuy() : this.onClickFree()
            }
            ))
        }
        onClickFree() {
            I.reqGetRandomEventAward(Pt.free).then(t=>{
                this.closeDialog(h.Yes)
            }
            )
        }
        onClickChain() {
            I.BCCheckIn(St.randomEvent).then(t=>{
                this.m_btn_Chain.disabled = this.m_btn_Buy.disabled = this.m_btn_Free.disabled = !0,
                this.m_txt_Time3.visible = !1,
                this.m_img_Wait.visible = !0,
                this.ani1.play(),
                this.m_payData = t.payData,
                ii.ChainFlag = !0,
                Mmobay.MConfig.channelId != Mmobay.MConst.CHANNEL_LOCAL && (Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile || P.wallet.connected ? this.sendTransaction() : this.connectWallet())
            }
            )
        }
        onClickBuy() {
            I.fishCoin < +Data.gameConf.randomEventCfg.costFish ? d(Te, {
                closeOnSide: !0
            }) : I.reqGetRandomEventAward(Pt.fishCoin).then(t=>{
                this.closeDialog(h.Yes)
            }
            )
        }
        connectWallet() {
            P.wallet.connect().then(t=>{
                this.destroyed || Laya.timer.once(500, this, ()=>{
                    this.sendTransaction()
                }
                )
            }
            )
        }
        sendTransaction() {
            if (this.m_payData) {
                let e = {
                    amount: 8e6,
                    address: this.m_payData.walletAddress,
                    payload: this.m_payData.payload,
                    transactionType: Ht.gameSignin
                }
                  , i = ()=>{
                    P.wallet.sendTransaction(e).then(t=>{
                        I.updateBCCheckIn(St.randomEvent, this.m_payData, t)
                    }
                    ).catch(t=>{
                        t && t.code == oe.insufficientFunds && u("Insufficient gas")
                    }
                    )
                }
                ;
                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile ? d(fe, {
                    showEffect: !1,
                    retainPopup: !0
                }).then(t=>{
                    t.wait().then(t=>{
                        t.type == h.Yes && (e.walletType = t.data,
                        i())
                    }
                    )
                }
                ) : i()
            }
        }
        doClose() {
            this.closeDialog(h.Yes)
        }
    }
    ii.ChainFlag = !1,
    L([A(y.RANDOM_EVENT_TIME_CHANGE)], ii.prototype, "doClose", null);
    class si extends t.cat.views.home.AutoDlgUI {
        onAwake() {
            super.onAwake(),
            this.m_txt_Now.text = Data.gameConf.initCfg.autoCost
        }
        onClickBuy() {
            if (I.fishCoin < +Data.gameConf.initCfg.autoCost)
                return d(Te, {
                    closeOnSide: !0
                });
            P.cat.reqBuyAuto().then(()=>{
                u(k(1033)),
                this.closeDialog()
            }
            )
        }
    }
    class ai extends t.cat.views.lunchPool.BoostMiningDlgUI {
        onAwake() {
            super.onAwake(),
            this.showUI()
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clearAll(this)
        }
        showUI() {
            var t = P.lunch
              , e = Data.gameConf.initCfg.inviterLaunchMax
              , i = Data.gameConf.initCfg.inviterLaunchRatio
              , s = Data.gameConf.initCfg.inviterLaunchTime
              , a = 1e3 * +t.boostEndTime
              , n = Date.newDate().getTime();
            this.m_txt_Per.text = "+" + i + "%",
            this.m_txt_inviteNum.text = t.inviterNum + "/" + e,
            +t.inviterNum < +e ? (this.m_txt_inviteNum.visible = !0,
            this.m_pbr_Invite.value = t.inviterNum / +e,
            this.m_btn_Invite.visible = !0,
            this.m_txt_Tips.visible = !1) : n < a && (this.m_btn_Invite.visible = !1,
            this.m_txt_Tips.visible = !0,
            this.m_pbr_Invite.value = (a - n) / 864e5,
            this.m_txt_inviteNum.visible = !1,
            this.m_tick && this.m_tick.dispose(),
            this.m_tick = E.create(a, 1e3, this.m_txt_Time),
            this.m_tick.start(),
            this.m_txt_Time.visible = !0,
            Laya.Tween.to(this.m_pbr_Invite, {
                value: 0
            }, a - n)),
            Object.assign(this.m_div_Info.style, {
                fontSize: 22,
                bold: !0,
                color: "#764428",
                leading: 3
            }),
            this.m_div_Info._element.width = 420,
            this.m_div_Info.innerHTML = k(2027, "&nbsp;" + e + "&nbsp;", "&nbsp;" + +s / 3600),
            this.m_div_Info.visible = !0
        }
        onClickInvite() {
            I.doInviteAction()
        }
    }
    L([A("updateLunchList")], ai.prototype, "showUI", null);
    class ni extends Laya.EventDispatcher {
        constructor(t=!1) {
            super(),
            this._percent = 0,
            this._totalTime = 1e3,
            this.sa = -90,
            this.ea = 270,
            this._isReverse = !1,
            this._showTime = 0,
            this._isReverse = t
        }
        set showTime(t) {
            this._showTime = t
        }
        get showTime() {
            return this._showTime
        }
        get totalTime() {
            return this._totalTime
        }
        set totalTime(t) {
            this._totalTime != t && (this._totalTime = t)
        }
        get isReverse() {
            return this._isReverse
        }
        set isReverse(t) {
            this._isReverse != t && (this._isReverse = t)
        }
        bindTarget(t, e, i, s, a, n) {
            this.target && this.target.off(Laya.Event.UNDISPLAY, this, this.dispose),
            t && t.off(Laya.Event.UNDISPLAY, this, this.dispose),
            (this.target = t).once(Laya.Event.UNDISPLAY, this, this.dispose),
            this.mx = e,
            this.my = i,
            this.rad = s || t.width >> 1,
            a && (this.perLabel = a),
            n && (this.timeLabel = n),
            this.updateValue()
        }
        set percent(t) {
            this._percent != t && (this._percent = t,
            this.updateValue())
        }
        get percent() {
            return this._percent
        }
        get currentAngle() {
            var t = this._percent * this.totalAngle;
            return this._isReverse ? this.ea - t : this.sa + t
        }
        updateValue() {
            this.mask || (this.mask = new Laya.Sprite);
            let t = this.mask.graphics;
            t.clear();
            var e = Math.max(this._percent, .01) * this.totalAngle;
            this._percent < 1 ? this._isReverse ? t.drawPie(this.mx, this.my, this.rad, this.ea - e, this.ea, "#ff0000") : t.drawPie(this.mx, this.my, this.rad, this.sa, this.sa + e, "#ff0000") : t.drawCircle(this.mx, this.my, this.rad, "#ff0000"),
            this.target && (this.target.mask = this.mask),
            this._showTime && this.timeLabel && (this.timeLabel.text = _e((this._showTime - Date.newDate().getTime()) / 1e3, "MM:ss")),
            this.perLabel && (this.perLabel.text = 100 - Math.floor(100 * this._percent) + "%"),
            this.update && this.update.run(),
            this.event(Laya.Event.CHANGED)
        }
        tweenValue(t, e, i) {
            this.clearTween(),
            e = e || (t - this._percent) * this._totalTime,
            this.tween = Laya.Tween.to(this, {
                percent: t
            }, e, Laya.Ease.linearIn, Laya.Handler.create(this, ()=>{
                i && i.run(),
                this.tween = null
            }
            ))
        }
        clearTween() {
            this.tween && (this.tween.clear(),
            this.tween = null)
        }
        set startAngle(t) {
            this.sa = t
        }
        set endAngle(t) {
            this.ea = t
        }
        get totalAngle() {
            return this.ea - this.sa
        }
        dispose() {
            this.clearTween(),
            this.target && this.target.off(Laya.Event.UNDISPLAY, this, this.dispose),
            this.target && (this.target.mask = null),
            this.target = null,
            this.mask && this.mask.destroy(!0),
            this.mask = null,
            this.perLabel = null,
            this.timeLabel = null,
            this.update = void 0
        }
    }
    class oi extends t.cat.views.lunchPool.LunchDetailViewUI {
        constructor(t) {
            super(),
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        updateView() {
            this.updateCatPool(this.m_data.catPool),
            this.updateFishPool(this.m_data.fishPool)
        }
        updateCatPool(t) {
            this.m_txt_Sum1.text = Intl.NumberFormat().format(+this.m_data.totalScore * t.scoreRate / 100) + "",
            this.m_txt_Daily1.text = Intl.NumberFormat().format(Math.min(+this.m_data.totalScore * t.scoreRate / 100, Math.floor(+this.m_data.totalScore * t.scoreRate / 100 / ((+this.m_data.endTime - +this.m_data.startTime) / 24 / 3600)))),
            this.m_txt_Hour1.text = Intl.NumberFormat().format(+t.hourScoreLimit),
            this.m_txt_Stake1.text = Intl.NumberFormat().format(+t.totalStake || 0) + " $",
            this.m_txt_Day1.text = +_e(+this.m_data.endTime - +this.m_data.startTime, "D") + " day/s",
            this.m_txt_Join1.text = (t.totalPlayer || 0) + ""
        }
        updateFishPool(t) {
            this.m_txt_Sum2.text = Intl.NumberFormat().format(+this.m_data.totalScore * t.scoreRate / 100) + "",
            this.m_txt_Daily2.text = Intl.NumberFormat().format(Math.min(+this.m_data.totalScore * t.scoreRate / 100, Math.floor(+this.m_data.totalScore * t.scoreRate / 100 / ((+this.m_data.endTime - +this.m_data.startTime) / 24 / 3600)))),
            this.m_txt_Hour2.text = Intl.NumberFormat().format(+t.hourScoreLimit),
            this.m_txt_Stake2.text = Intl.NumberFormat().format(+t.totalStake || 0) + " Fish",
            this.m_txt_Day2.text = +_e(+this.m_data.endTime - +this.m_data.startTime, "D") + " day/s",
            this.m_txt_Join2.text = (t.totalPlayer || 0) + ""
        }
    }
    class ri extends t.cat.views.lunchPool.StakeCatDlgUI {
        constructor(t) {
            super(),
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        updateView() {
            var t = P.cat.findMaxCat();
            if (!t)
                return this.m_txt_Value.text = "0 $",
                this.m_view_Lv.visible = !1,
                void (this.m_img_Mask.visible = !0);
            var e = Data.getCat(t).stakeVal
              , e = (this.m_txt_Value.text = e + " $",
            Data.getCat(t).showId);
            let i = 200 <= +e ? .4 : .5;
            210 < t && (s = +Data.getCat(t).oldShowId,
            i = 200 <= s ? .5 : 100 <= s ? .45 : .38);
            var s = R.create({
                url: "cat/spine/" + e + ".json",
                px: this.width / 2,
                py: this.height / 2 - 100,
                scale: 2.2 * i,
                autoRemove: !1,
                alpha: 1
            });
            this.addChildAt(s, 1),
            P.cat.playCat(s, "pose"),
            this.m_view_Lv.setData(t),
            t < this.m_data.catPool.stakeLimit && (this.m_txt_Limit.visible = !0,
            this.m_btn_Ok.visible = !1,
            this.m_txt_Desc.visible = !1,
            this.m_txt_Limit.text = "The minimum level for staking cats is" + this.m_data.catPool.stakeLimit)
        }
        onClickOk() {
            +P.cat.findMaxCat() < this.m_data.catPool.stakeLimit || (P.lunch.reqStack(this.m_data.catPool.id, 0, this.m_data.id),
            this.closeDialog())
        }
    }
    class hi extends t.cat.views.lunchPool.StakeFishDlgUI {
        constructor(t) {
            super(),
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.m_view_Fish.setData(1, Math.max(I.fishCoin, this.m_data.fishPool.stakeLimit), this.m_data.fishPool.stakeLimit, ""),
            this.updateView()
        }
        updateView() {
            this.m_txt_Stake.text = this.m_view_Fish.count + "/",
            this.m_txt_Num.text = I.fishCoin + "",
            this.m_txt_Num.color = I.fishCoin >= this.m_data.fishPool.stakeLimit ? "#764428" : se.Red
        }
        onClickOk() {
            if (I.fishCoin < this.m_data.fishPool.stakeLimit)
                return d(Te, {});
            P.lunch.reqStack(this.m_data.fishPool.id, this.m_view_Fish.count, this.m_data.id),
            this.closeDialog()
        }
    }
    L([A(y.FISHCOIN_CHANGE), A(y.COUNT_CHANGE)], hi.prototype, "updateView", null);
    class li extends t.cat.views.lunchPool.StakeCatBackDlgUI {
        constructor(t) {
            super(),
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        updateView() {
            let e;
            for (var t in P.lunch.stakeCats)
                if (P.lunch.stakeCats[t].launchId == this.m_data.id) {
                    e = P.cat.allcats[+t];
                    break
                }
            if (e) {
                var i = Data.getCat(e).showId;
                let t = 200 <= +i ? .4 : .5;
                210 < e && (s = +Data.getCat(e).oldShowId,
                t = 200 <= s ? .5 : 100 <= s ? .45 : .38);
                var s = R.create({
                    url: "cat/spine/" + i + ".json",
                    px: this.width / 2,
                    py: this.height / 2 - 60,
                    scale: 2.2 * t,
                    autoRemove: !1,
                    alpha: 1
                });
                this.addChildAt(s, 1),
                P.cat.playCat(s, "pose"),
                this.m_view_Lv.setData(e)
            }
        }
        onClickOk() {
            P.lunch.reqStack(this.m_data.catPool.id, 0, this.m_data.id, 1),
            this.closeDialog()
        }
    }
    class ci extends t.cat.views.lunchPool.StakeFishBackDlgUI {
        constructor(t) {
            super(),
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        updateView() {}
        onClickOk() {
            P.lunch.reqStack(this.m_data.fishPool.id, this.m_data.fishPool.myStake, this.m_data.id, 1),
            this.closeDialog()
        }
    }
    class mi extends t.cat.views.lunchPool.LunchInfoViewUI {
        constructor(t) {
            super(),
            this.m_mask1 = new ni,
            this.m_mask2 = new ni,
            this.m_data = t
        }
        onEnable() {
            super.onEnable(),
            this.updateView()
        }
        onDestroy() {
            super.onDestroy(),
            this.m_mask1 && this.m_mask1.dispose(),
            this.m_mask2 && this.m_mask2.dispose()
        }
        updateView() {
            if (this.m_data = P.lunch.getLunchById(this.m_data.id),
            this.m_data && !this.destroyed) {
                var t;
                if (Date.newDate().getTime() / 1e3 > +this.m_data.endTime)
                    return this.m_pan_Panel.visible = !1,
                    this.m_box_End.visible = !0,
                    t = k(Data.getLaunch(this.m_data.id).name),
                    this.m_txt_End1.text = Qt(this.m_data.catPool.gotScore) + " " + t,
                    void (this.m_txt_End2.text = Qt(this.m_data.fishPool.gotScore) + " " + t);
                this.updateCatPool(this.m_data.catPool),
                this.updateFishPool(this.m_data.fishPool),
                this.m_img_Icon1.skin = this.m_img_Icon2.skin = "cat/" + Data.getLaunch(this.m_data.id).icon
            }
        }
        updateCatPool(t) {
            var e = Date.newDate().getTime() / 1e3
              , i = k(Data.getLaunch(this.m_data.id).name);
            this.m_btn_In1.visible = +this.m_data.endTime > e,
            this.m_btn_In1.disabled = !!t.myStake,
            this.m_btn_Out1.visible = !!t.myStake && this.m_btn_In1.visible,
            this.m_txt_Peo1.text = (t.totalPlayer || 0) + "",
            this.m_txt_Sum1.text = Intl.NumberFormat().format(+this.m_data.catPool.totalStake || 0) + " $",
            this.m_txt_Got1.text = Qt(t.gotScore) + " " + i,
            this.m_txt_Wait1.text = Qt(t.waitScore) + " " + i,
            this.m_txt_MyScore1.text = Intl.NumberFormat().format(+t.myStake || 0) + " $",
            this.m_btn_Get1.visible = this.m_btn_In1.visible && 0 < +t.waitScore,
            this.m_mask1 && this.m_mask1.dispose(),
            this.m_box_Cd1.visible = !!t.myStake && e > +this.m_data.startTime,
            this.m_box_Cd1.visible && (i = Jt(),
            this.m_mask1.bindTarget(this.m_img_Cd1, this.m_img_Cd1.width / 2, this.m_img_Cd1.height / 2, null, null, this.m_txt_Time1),
            this.m_mask1.clearTween(),
            this.m_mask1.showTime = i,
            this.m_mask1.percent = 1 - (i - Date.newDate().getTime()) / 36e5,
            this.m_mask1.tweenValue(1, i - Date.newDate().getTime(), Laya.Handler.create(this, ()=>{
                this.updateView()
            }
            )))
        }
        updateFishPool(t) {
            var e = Date.newDate().getTime() / 1e3
              , i = (this.m_btn_In2.visible = +this.m_data.endTime > e,
            this.m_txt_Peo2.text = (t.totalPlayer || 0) + "",
            k(Data.getLaunch(this.m_data.id).name));
            this.m_btn_Out2.visible = this.m_btn_In2.visible && !!t.myStake,
            this.m_txt_Sum2.text = Intl.NumberFormat().format(+this.m_data.fishPool.totalStake || 0) + " Fish",
            this.m_txt_Got2.text = Qt(t.gotScore) + " " + i,
            this.m_txt_Wait2.text = Qt(t.waitScore) + " " + i,
            this.m_txt_MyScore2.text = Intl.NumberFormat().format(+t.myStake || 0) + " Fish",
            this.m_btn_Get2.visible = this.m_btn_In1.visible && 0 < +t.waitScore,
            this.m_mask2 && this.m_mask2.dispose(),
            this.m_box_Cd2.visible = !!t.myStake && e > +this.m_data.startTime,
            this.m_box_Cd2.visible && (i = Jt(),
            this.m_mask2.bindTarget(this.m_img_Cd2, this.m_img_Cd2.width / 2, this.m_img_Cd2.height / 2, null, null, this.m_txt_Time2),
            this.m_mask2.clearTween(),
            this.m_mask2.showTime = i,
            this.m_mask2.percent = 1 - (i - Date.newDate().getTime()) / 36e5,
            this.m_mask2.tweenValue(1, i - Date.newDate().getTime(), Laya.Handler.create(this, ()=>{
                this.updateView()
            }
            )))
        }
        onClickGet1() {
            P.lunch.reqReward(this.m_data.catPool.id, this.m_data.id)
        }
        onClickGet2() {
            P.lunch.reqReward(this.m_data.fishPool.id, this.m_data.id)
        }
        onClickIn1() {
            d(ri, {
                params: [this.m_data]
            })
        }
        onClickIn2() {
            d(hi, {
                params: [this.m_data]
            })
        }
        onClickOut1() {
            d(li, {
                params: [this.m_data]
            })
        }
        onClickOut2() {
            d(ci, {
                params: [this.m_data]
            })
        }
        onClickBuy2() {
            d(Te, {
                closeOnSide: !0
            })
        }
        updateBonus(t) {
            var e = k(Data.getCat(t.launchId).name);
            t.launchId == this.m_data.id && (t.poolId == this.m_data.catPool.id ? (this.ani1.play(0, !1),
            this.m_txt_Add1.text = +t.addWaitScore + e) : t.poolId == this.m_data.fishPool.id && (this.ani2.play(0, !1),
            this.m_txt_Add2.text = +t.addWaitScore + e)),
            this.updateView()
        }
    }
    L([A(y.UPDATE_LUNCH)], mi.prototype, "updateView", null),
    L([A(y.POOLBONUS)], mi.prototype, "updateBonus", null);
    class di extends t.cat.views.lunchPool.LunchDlgUI {
        constructor(t) {
            super(),
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.addTitle(),
            this.title && (this.title.top = -10),
            this.m_box_Stack.setupCls([{
                cls: mi,
                params: [this.m_data]
            }, {
                cls: oi,
                params: [this.m_data]
            }]),
            this.updateView(),
            this.m_tab_Tab.selectedIndex = 0
        }
        onDestroy() {
            super.onDestroy(),
            this.m_tick && this.m_tick.dispose(),
            this.m_tickBoost && this.m_tickBoost.dispose()
        }
        onSelectTab(t) {
            this.m_box_Stack.changeIndex(t)
        }
        updateView() {
            this.m_img_Icon.skin = "cat/" + Data.getLaunch(this.m_data.id).icon,
            this.m_txt_Name.text = k(this.m_data.name),
            this.m_txt_Sum.text = Intl.NumberFormat().format(+this.m_data.totalScore),
            this.m_img_State.skin = "cat/ui_lunch/preparation.png",
            this.m_txt_Last.text = +_e(+this.m_data.endTime - +this.m_data.startTime, "D") + " day/s";
            var t = Date.newDate().getTime() / 1e3;
            t < +this.m_data.startTime ? (this.m_txt_TimeDesc.text = k(11001),
            this.m_tick = E.create(1e3 * +this.m_data.startTime, 1e3, this.m_txt_Time, "D:HH:MM:ss"),
            this.m_tick.onEnd = ()=>{
                this.updateView()
            }
            ,
            this.m_tick.start()) : t < +this.m_data.endTime ? (this.m_txt_TimeDesc.text = k(11003),
            this.m_img_State.skin = "cat/ui_lunch/mining.png",
            this.m_tick = E.create(1e3 * +this.m_data.endTime, 1e3, this.m_txt_Time, "D:HH:MM:ss"),
            this.m_tick.onEnd = ()=>{
                this.updateView()
            }
            ,
            this.m_tick.start()) : (this.m_txt_TimeDesc.text = k(11002),
            this.m_img_State.skin = "cat/ui_lunch/completed.png",
            this.m_txt_Time.text = xt(Date.newDate(1e3 * +this.m_data.endTime), "yyyy-mm-dd")),
            this.checkBoostShow()
        }
        onClickBoost() {
            d(ai)
        }
        onClickAsset() {
            d(Je)
        }
        checkBoostShow() {
            var t = Data.gameConf.initCfg.inviterLaunchMax
              , e = (this.m_txt_Per.text = "+" + Data.gameConf.initCfg.inviterLaunchRatio + "%",
            1e3 * +P.lunch.boostEndTime)
              , i = Date.newDate().getTime();
            !(+P.lunch.inviterNum < +t) && i < e ? (this.m_tickBoost && this.m_tickBoost.dispose(),
            this.m_tickBoost = E.create(e, 1e3, this.m_txt_BoostEnd),
            this.m_tickBoost.start(),
            this.m_btn_Boost.label = "",
            this.m_box_Speed.visible = !0,
            Laya.timer.once(e - i, this, ()=>{
                this.checkBoostShow()
            }
            )) : (this.m_box_Speed.visible = !1,
            this.m_btn_Boost.label = k(2028))
        }
    }
    L([A("updateLunch")], di.prototype, "updateView", null);
    class _i extends t.cat.views.lunchPool.LunchCellViewUI {
        constructor(t) {
            super(),
            this.m_mask1 = new ni,
            this.m_mask2 = new ni,
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        onDestroy(t) {
            super.onDestroy(),
            this.m_tick && this.m_tick.dispose(),
            this.m_mask1 && this.m_mask1.dispose(),
            this.m_mask2 && this.m_mask2.dispose()
        }
        updateView() {
            let e = this.m_data;
            this.on(Laya.Event.CLICK, this, ()=>{
                m(di, {
                    params: [e]
                })
            }
            ),
            this.m_data = e,
            this.m_img_Icon.skin = this.m_img_Icon1.skin = this.m_img_Icon2.skin = "cat/" + Data.getLaunch(e.id).icon,
            this.m_btn_Stake1.visible = this.m_btn_Stake2.visible = !0,
            this.m_img_Cd1.visible = this.m_img_Cd2.visible = !1,
            this.m_txt_Name.text = k(e.name) + "",
            this.m_txt_Sum.text = Intl.NumberFormat().format(+e.totalScore),
            this.m_txt_Last.text = +_e(+e.endTime - +e.startTime, "D") + " day/s";
            var i = Date.newDate().getTime() / 1e3;
            if (this.m_tick && this.m_tick.dispose(),
            this.m_txt_CatDesc1.text = k(e.catPool.scoreRate) + "%",
            this.m_txt_FishDesc1.text = k(e.fishPool.scoreRate) + "%",
            this.m_txt_CatDesc1.visible = this.m_txt_FishDesc1.visible = i < +e.startTime,
            this.m_txt_FishDesc2.visible = this.m_txt_FishDesc3.visible = this.m_txt_FishDesc4.visible = this.m_txt_Stake1.visible = this.m_txt_Stake2.visible = this.m_txt_Sum1.visible = this.m_txt_Sum2.visible = this.m_txt_People1.visible = this.m_txt_People2.visible = this.m_txt_CatDesc2.visible = this.m_txt_CatDesc3.visible = this.m_txt_CatDesc4.visible = !this.m_txt_CatDesc1.visible,
            i < +e.startTime ? (this.m_img_State.skin = "cat/ui_lunch/preparation.png",
            this.m_txt_TimeDesc.text = k(11001),
            this.m_tick = E.create(1e3 * +e.startTime, 1e3, this.m_txt_Time, "D:HH:MM:ss"),
            this.m_tick.onEnd = ()=>{
                this.updateView()
            }
            ,
            this.m_tick.start(),
            this.m_txt_CatDesc1.text = k(11004, e.catPool.scoreRate + "%"),
            this.m_txt_FishDesc1.text = k(11004, e.fishPool.scoreRate + "%")) : (i < +e.endTime ? (this.m_txt_TimeDesc.text = k(11003),
            this.m_img_State.skin = "cat/ui_lunch/mining.png",
            this.m_tick = E.create(1e3 * +e.endTime, 1e3, this.m_txt_Time, "D:HH:MM:ss"),
            this.m_tick.onEnd = ()=>{
                this.updateView()
            }
            ,
            this.m_tick.start(),
            s = Jt(),
            this.m_box_Cd1.visible = !!e.catPool.myStake,
            e.catPool.myStake && (this.m_mask1.bindTarget(this.m_img_Cd1, this.m_img_Cd1.width / 2, this.m_img_Cd1.height / 2, null, null, this.m_txt_Time1),
            this.m_mask1.clearTween(),
            this.m_mask1.showTime = s,
            this.m_mask1.percent = 1 - (s - Date.newDate().getTime()) / 36e5,
            this.m_mask1.tweenValue(1, s - Date.newDate().getTime(), Laya.Handler.create(this, ()=>{
                this.updateView(),
                P.event("updateLunch")
            }
            ))),
            this.m_box_Cd2.visible = !!e.fishPool.myStake,
            e.fishPool.myStake && (this.m_mask2.bindTarget(this.m_img_Cd2, this.m_img_Cd2.width / 2, this.m_img_Cd2.height / 2, null, null, this.m_txt_Time2),
            this.m_mask2.clearTween(),
            this.m_mask2.showTime = s,
            this.m_mask2.percent = 1 - (s - Date.newDate().getTime()) / 36e5,
            this.m_mask2.tweenValue(1, s - Date.newDate().getTime(), Laya.Handler.create(this, ()=>{
                this.updateView(),
                P.event("updateLunch")
            }
            )))) : (this.m_txt_FishDesc2.visible = this.m_txt_Stake2.visible = this.m_txt_CatDesc2.visible = this.m_txt_Stake1.visible = !1,
            this.m_img_State.skin = "cat/ui_lunch/completed.png",
            this.m_txt_TimeDesc.text = k(11002),
            this.m_btn_Stake1.visible = this.m_btn_Stake2.visible = !1,
            this.m_txt_Time.text = xt(Date.newDate(1e3 * +e.endTime), "yyyy-mm-dd")),
            e.catPool.myStake && (this.m_btn_Stake1.visible = !1,
            this.m_img_Cd1.visible = !0),
            this.m_txt_Stake1.text = Intl.NumberFormat().format(+e.catPool.myStake || 0) + " $",
            this.m_txt_People1.text = Intl.NumberFormat().format(+e.catPool.totalPlayer || 0) + "",
            this.m_txt_Sum1.text = Intl.NumberFormat().format(+e.catPool.totalStake) + " $",
            e.fishPool.myStake && (this.m_btn_Stake2.visible = !1,
            this.m_img_Cd2.visible = !0),
            this.m_txt_Stake2.text = Intl.NumberFormat().format(+e.fishPool.myStake || 0) + " Fish",
            this.m_txt_People2.text = Intl.NumberFormat().format(+e.fishPool.totalPlayer || 0) + "",
            this.m_txt_Sum2.text = Intl.NumberFormat().format(+e.fishPool.totalStake) + " Fish"),
            i < +e.endTime) {
                this.height = 800;
                let t = 0;
                var s = 1e3 * +P.lunch.boostEndTime;
                t = i < s ? 2 : 1,
                this.m_spine || (this.m_spine = R.create({
                    url: "cat/spine/miningboost.json",
                    parent: this,
                    px: this.width / 2,
                    py: 250
                })),
                this.m_spine.play(0, !0),
                i > +e.startTime && (e.catPool.myStake || e.fishPool.myStake) && this.m_spine.play(t, !0),
                this.m_spine.visible = !0,
                this.m_box_Vbox.y = 330
            } else
                this.height = 690,
                this.m_box_Vbox.y = 230,
                this.m_spine && (this.m_spine.visible = !1)
        }
        updateLunch() {
            this.m_data && (this.m_data = P.lunch.getLunchById(this.m_data.id),
            this.updateView())
        }
    }
    L([A(y.UPDATE_LUNCH), A(y.UPDATE_LUNCH)], _i.prototype, "updateLunch", null);
    class ui extends t.cat.views.lunchPool.LunchListDlgUI {
        constructor() {
            super(...arguments),
            this.m_tickBoost = null
        }
        onAwake() {
            super.onAwake(),
            P.lunch.isLunchDlg = !0,
            this.addTitle(),
            this.title && (this.title.top = -10),
            this.getLunchInfo()
        }
        onDestroy() {
            super.onDestroy(),
            P.lunch.isLunchDlg = !1,
            this.m_tickBoost && this.m_tickBoost.dispose()
        }
        updateView() {
            this.m_box_Vbox.destroyChildren();
            for (var t of P.lunch.m_lunchs)
                _(_i, {
                    params: [t]
                }).then(t=>{
                    this.m_box_Vbox.addChild(t)
                }
                )
        }
        onClickBoost() {
            d(ai)
        }
        onClickAsset() {
            d(Je)
        }
        getLunchInfo() {
            P.lunch.reqLunchList().then(t=>{
                this.updateView(),
                this.checkBoostShow(t)
            }
            )
        }
        checkBoostShow(t) {
            var e = Data.gameConf.initCfg.inviterLaunchMax
              , i = (this.m_txt_Per.text = "+" + Data.gameConf.initCfg.inviterLaunchRatio + "%",
            1e3 * +t.BoostEndTime)
              , s = Date.newDate().getTime();
            !(+t.inviterNum < +e) && s < i ? (this.m_tickBoost && this.m_tickBoost.dispose(),
            this.m_tickBoost = E.create(i, 1e3, this.m_txt_BoostEnd),
            this.m_tickBoost.start(),
            this.m_btn_Boost.label = "",
            this.m_box_Speed.visible = !0,
            Laya.timer.once(i - s, this, ()=>{
                this.getLunchInfo()
            }
            )) : (this.m_box_Speed.visible = !1,
            this.m_btn_Boost.label = k(2028))
        }
    }
    L([A("updateLunch")], ui.prototype, "updateView", null);
    class pi extends t.cat.views.home.NotCoinGiftDlgUI {
        constructor() {
            super(...arguments),
            this.m_goodId = 1002
        }
        onAwake() {
            super.onAwake(),
            this.showUI()
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clear(this, this.endConfirm)
        }
        showUI() {
            var t = Data.getGoods(this.m_goodId)
              , e = Data.gameConf.goodsCfg.goods1002CatNum
              , e = (this.m_txt_Fish.text = jt(t.fishCoin),
            this.m_txt_GiftNum.text = "x" + e,
            this.m_txt_Fish.text = jt(t.fishCoin),
            this.m_btn_Buy.label = "$" + t.price,
            S.get(S.s_notCoinGiftOrderTime) || 0);
            let i = 0;
            e && (t = e + 3e5,
            e = (new Date).getTime(),
            i = t - e),
            i <= 0 ? (this.m_btn_Buy.visible = !0,
            this.m_btn_Wait.visible = !1,
            this.ani3.stop(),
            S.removeItem(S.s_notCoinGiftOrderTime)) : (this.m_btn_Buy.visible = !1,
            this.m_btn_Wait.visible = !0,
            this.ani3.play(0, !0),
            Laya.timer.clear(this, this.endConfirm),
            Laya.timer.once(i, this, this.endConfirm))
        }
        endConfirm() {
            S.removeItem(S.s_notCoinGiftOrderTime),
            this.showUI()
        }
        doClose() {
            this.closeDialog()
        }
        onClickBuy(t) {
            let e = Data.getGoods(this.m_goodId);
            I.requestPrePay(this.m_goodId).then(t=>{
                t = parseFloat(t.notPrice) || 0,
                t = {
                    type: Wt.notGift,
                    name: e.name,
                    icon: "cat/ui_recharge/pur_package.png",
                    price: e.price,
                    notPrice: t,
                    goodsId: this.m_goodId
                };
                d(we, {
                    params: [t],
                    showEffect: !1,
                    retainPopup: !0
                }).then(t=>{
                    t.wait().then(t=>{
                        t.type == h.Yes && (t = (new Date).getTime(),
                        S.set(S.s_notCoinGiftOrderTime, t),
                        this.showUI(),
                        this.showPayProcessing())
                    }
                    )
                }
                )
            }
            )
        }
        showPayProcessing(t=100) {
            Laya.timer.once(t, this, ()=>{
                this.destroyed || d(ke, {
                    retainPopup: !0
                })
            }
            )
        }
    }
    L([A(y.RECHARGE_SUCCESS)], pi.prototype, "doClose", null);
    class gi extends t.cat.views.table.TableAfterDlgUI {
        constructor(t) {
            super(),
            this.m_data = [],
            this.m_step = 1,
            this.m_temp = 0,
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView(),
            this.m_view_Head.setHeadShow({
                isCircle: !0,
                icoUrl: I.icon,
                uname: I.name,
                borderLvl: 5,
                notShowChain: !0
            });
            var t = P.table.tableInfo.count;
            this.m_txt_Times2.text = t + " times",
            this.m_txt_Times1.text = t + "";
            this.m_txt_Desc4.text = " SPIN to win 0.5 $,"
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clearAll(this),
            this.ani3.offAll(),
            m(Ni).then(t=>{
                t.onClickSpin()
            }
            )
        }
        updateView() {
            this.m_spine = R.create({
                url: "cat/spine/blindbox1.json",
                px: this.width / 2,
                py: this.height / 2
            }),
            this.addChildAt(this.m_spine, 4),
            this.m_spine.visible = !1;
            var t = P.table.tableInfo.quota;
            this.ani3.addLabel("number", 20),
            this.ani3.on(Laya.Event.LABEL, this, ()=>{
                this.ani5.play(0, !1),
                2 == this.m_step ? this.updateSum(this.m_temp, +(this.m_temp + +this.m_data[0]).toFixed(3)) : 3 == this.m_step ? this.updateSum(this.m_temp, +(this.m_temp + +this.m_data[1]).toFixed(3)) : 4 == this.m_step ? this.updateSum(this.m_temp, +(this.m_temp + +this.m_data[2]).toFixed(3)) : this.updateSum(this.m_temp, +(this.m_temp + +this.m_data[3]).toFixed(3))
            }
            ),
            this.m_txt_Desc2.text = `claim ${Intl.NumberFormat().format(+t)} $ for free!!`,
            this.m_txt_Desc1.text = `*You can claim it when you reach ${Intl.NumberFormat().format(+t)} $ in total`,
            this.play(),
            this.m_img_Gold.skin = "cat/ui_tableEx/dollar.png",
            this.m_img_Icon2.skin = this.m_img_Icon.skin = "cat/ui_item/dollar.png"
        }
        play() {
            this.m_txt_Desc.alpha = this.m_img_Gold.alpha = this.m_btn_Click.alpha = 0,
            this.m_btn_Click.label = "continue (4s)",
            this.m_spine.visible = !0,
            this["play" + this.m_step] && this["play" + this.m_step](),
            this.m_step++,
            Laya.timer.once(10, this, ()=>{
                this.ani1.play(0, !1)
            }
            ),
            D.instance.playSound("blindbox.mp3"),
            this.m_spine.play(0, !1, Laya.Handler.create(this, ()=>{
                this.m_spine.play(5, !1, Laya.Handler.create(this, ()=>{
                    this.m_spine.visible = !1
                }
                ))
            }
            ))
        }
        onClickClick() {
            this.m_tick && this.m_tick.dispose(),
            this.ani1.stop(),
            this.ani2.stop(),
            this.ani3.stop(),
            this.ani4.stop(),
            this.m_btn_Click.alpha = 0,
            this.m_btn_Click.mouseEnabled = !1,
            this.ani3.once(Laya.Event.COMPLETE, this, ()=>{
                5 == this.m_step ? (this.ani4.play(0, !1),
                this.on(Laya.Event.CLICK, this, ()=>{
                    this.closeDialog()
                }
                )) : this.play()
            }
            ),
            this.ani3.play(0, !1),
            D.instance.playSound("CatGem.mp3"),
            2 == this.m_step && this.ani2.play(0, !1)
        }
        play1() {
            P.table.tableInfo.quota;
            this.m_txt_Desc.text = `Catizen sends you ${this.m_data[0]} $`,
            this.m_txt_Add.text = "+" + this.m_data[0],
            this.m_btn_Click.label = "continue (4s)",
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                this.m_tick && this.m_tick.dispose(),
                this.m_btn_Click.mouseEnabled = !0,
                this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                this.m_tick.onEnd = ()=>{
                    this.m_btn_Click.alpha = 0,
                    this.m_btn_Click.mouseEnabled = !1,
                    this.ani3.once(Laya.Event.COMPLETE, this, ()=>{
                        this.play()
                    }
                    ),
                    this.ani3.play(0, !1),
                    D.instance.playSound("CatGem.mp3"),
                    this.ani2.play(0, !1)
                }
                ;
                let t = 4;
                this.m_tick.onTick = ()=>{
                    this.m_btn_Click.label = `continue (${t--}s)`
                }
                ,
                this.m_tick.start()
            }
            )
        }
        play2() {
            P.table.tableInfo.quota;
            this.m_txt_Desc.text = `Catizen sends you ${this.m_data[1]} $`,
            this.m_txt_Add.text = "+" + this.m_data[1],
            this.m_tick && this.m_tick.dispose(),
            this.m_btn_Click.label = "continue (4s)",
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                this.m_btn_Click.mouseEnabled = !0,
                this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                this.m_tick.onEnd = ()=>{
                    this.m_btn_Click.alpha = 0,
                    this.ani3.once(Laya.Event.COMPLETE, this, ()=>{
                        this.play()
                    }
                    ),
                    this.ani3.play(0, !1),
                    D.instance.playSound("CatGem.mp3"),
                    this.m_btn_Click.mouseEnabled = !1
                }
                ;
                let t = 4;
                this.m_tick.onTick = ()=>{
                    this.m_btn_Click.label = `continue (${t--}s)`
                }
                ,
                this.m_tick.start()
            }
            )
        }
        play3() {
            this.m_txt_Desc.text = `Catizen sends you ${this.m_data[2]} $`,
            this.m_txt_Add.text = "+" + this.m_data[2],
            this.m_tick && this.m_tick.dispose(),
            this.m_btn_Click.label = "continue (4s)",
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                this.m_btn_Click.mouseEnabled = !0,
                this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                this.m_tick.onEnd = ()=>{
                    this.m_btn_Click.alpha = 0,
                    this.ani3.once(Laya.Event.COMPLETE, this, ()=>{
                        this.play()
                    }
                    ),
                    this.ani3.play(0, !1),
                    D.instance.playSound("CatGem.mp3"),
                    this.m_btn_Click.mouseEnabled = !1
                }
                ;
                let t = 4;
                this.m_tick.onTick = ()=>{
                    this.m_btn_Click.label = `continue (${t--}s)`
                }
                ,
                this.m_tick.start()
            }
            )
        }
        play4() {
            this.m_txt_Desc.text = `Catizen sends you ${this.m_data[3]} $`,
            this.m_txt_Add.text = "+" + this.m_data[3],
            this.m_tick && this.m_tick.dispose(),
            this.m_btn_Click.label = "continue (4s)",
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                this.m_btn_Click.mouseEnabled = !0,
                this.m_tick.onEnd = ()=>{
                    this.m_btn_Click.alpha = 0,
                    this.ani3.once(Laya.Event.COMPLETE, this, ()=>{
                        this.ani4.play(0, !1),
                        this.on(Laya.Event.CLICK, this, ()=>{
                            this.closeDialog()
                        }
                        )
                    }
                    ),
                    this.m_btn_Click.mouseEnabled = !1,
                    this.ani3.play(0, !1),
                    D.instance.playSound("CatGem.mp3")
                }
                ;
                let t = 4;
                this.m_tick.onTick = ()=>{
                    this.m_btn_Click.label = `continue (${t--}s)`
                }
                ,
                this.m_tick.start()
            }
            )
        }
        updateSum(t, e) {
            let i = 0;
            Laya.timer.loop(20, this, ()=>{
                if (50 == ++i)
                    return Laya.timer.clearAll(this),
                    this.m_temp = +e,
                    void (this.m_txt_Sum.text = Intl.NumberFormat().format(e));
                this.m_txt_Sum.text = Intl.NumberFormat().format((t + (e - t) / 50 * i).toFixed(1))
            }
            ),
            this.m_temp = +t,
            this.m_txt_Sum.text = Intl.NumberFormat().format(t)
        }
    }
    class Ci extends t.cat.views.table.TablePreDlgUI {
        constructor(t) {
            super(),
            this.m_preHelp = t
        }
        onAwake() {
            super.onAwake(),
            D.instance.playMusic("BGM_Excavate.mp3"),
            P.cat.goldMute = !0,
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                this.m_btn_Start.mouseEnabled = !0
            }
            ),
            this.ani1.play(0, !1),
            D.instance.playSound("message.mp3");
            let t = 0;
            Laya.timer.loop(550, this, ()=>{
                3 < t ? Laya.timer.clearAll(this) : (D.instance.playSound("message.mp3"),
                t++)
            }
            )
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clearAll(this)
        }
        onClickStart() {
            this.m_preHelp && this.m_preHelp.helpId && P.table.reqHelpOtherTurn(this.m_preHelp.helpId),
            this.doTableStart()
        }
        doTableStart() {
            P.table.reqStart().then(t=>{
                this.closeDialog(),
                d(gi, {
                    params: [t],
                    closeOnSide: !1
                })
            }
            )
        }
    }
    class yi extends t.cat.views.table.PlayMoneyDlgUI {
        constructor(t) {
            super(),
            this.m_time = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        onDestroy() {
            super.onDestroy(),
            this.m_tick && this.m_tick.dispose()
        }
        updateView() {
            D.instance.playSound("richcat.mp3"),
            this.m_txt_Desc.text = this.m_time,
            this.m_btn_Click.label = "continue (4s)";
            let t = 4;
            this.m_tick && this.m_tick.dispose(),
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                this.m_tick.onTick = ()=>{
                    this.m_btn_Click.label = `continue (${t--}s)`
                }
                ,
                this.m_tick.onEnd = ()=>{
                    this.closeDialog()
                }
                ,
                this.m_tick.start()
            }
            ),
            this.ani1.play(0, !1)
        }
        onClickClick() {
            this.closeDialog()
        }
    }
    class bi extends t.cat.views.table.PlayDlgUI {
        constructor(t) {
            super(),
            this.m_img = "",
            this.m_data = t
        }
        onDestroy() {
            super.onDestroy(),
            P.event(y.UPDATE_TABLE),
            Laya.timer.clearAll(this),
            this.m_tick && this.m_tick.dispose(),
            this.m_img && (D.instance.playSound("CatGem.mp3"),
            this.m_data.addQuota ? zt(this.m_img, 20, {
                x: 280,
                y: 560
            }, {
                x: 280,
                y: 260
            }) : zt(this.m_img, 20, {
                x: 280,
                y: 560
            }, {
                x: 465,
                y: 165
            }))
        }
        onAwake() {
            super.onAwake();
            let t = "$vKitty";
            this.m_data.addFishCoin ? t = "FishCoins" : this.m_data.addQuota && (P.table.getDiamondByPrice(this.m_data.addQuota) ? (t = "diamond",
            this.m_img_Icon.skin = "cat/ui_tableEx/diamond1.png",
            this.m_img_Light.skin = "cat/ui_tableEx/light3.png") : (t = "$",
            this.m_img_Icon.skin = "cat/ui_tableEx/dollar.png",
            this.m_img_Light.skin = "cat/ui_tableEx/light4.png")),
            this.m_txt_Desc1.text = t,
            this.updateView()
        }
        updateView() {
            var t = this.m_data.info.preId;
            let e;
            var i = Data.getTurnTable(t);
            e = 16 != t && i && 2 != i.arrowIndex ? R.create({
                url: "cat/spine/blindbox2.json",
                px: this.width / 2,
                py: this.height / 2
            }) : R.create({
                url: "cat/spine/blindbox1.json",
                px: this.width / 2,
                py: this.height / 2
            }),
            this.addChildAt(e, 2),
            this.m_data.addFishCoin ? (this.m_txt_Desc.text = this.m_data.addFishCoin,
            this.playRandom(),
            this.m_txt_Add.text = "x" + this.m_data.addFishCoin,
            D.instance.playSound("blindbox.mp3"),
            this.m_img = "cat/ui_item/8.png",
            e.play(0, !1, Laya.Handler.create(this, ()=>{
                e.play(2, !1, Laya.Handler.create(this, ()=>{
                    e.visible = !1
                }
                ))
            }
            ))) : this.m_data.addGold ? (this.m_txt_Desc.text = f(this.m_data.addGold),
            this.playRandom(),
            this.m_txt_Add.text = "x" + f(this.m_data.addGold),
            this.m_img = "cat/ui_item/coin.png",
            D.instance.playSound("blindbox.mp3"),
            e.play(0, !1, Laya.Handler.create(this, ()=>{
                e.play(1, !1, Laya.Handler.create(this, ()=>{
                    e.visible = !1
                }
                ))
            }
            )),
            this.m_box_Desc.visible = !1,
            this.m_txt_Times.text = " x" + this.m_data.addGoldTime,
            this.m_txt_Speed.text = f(P.cat.getBaseSpeed()) + "/s",
            this.m_img_SpeedBg.width = this.m_txt_Speed.width + 40 + 10,
            this.m_box_Gold.visible = !0) : this.m_data.addQuota && (P.table.getDiamondByPrice(this.m_data.addQuota) ? (this.m_txt_Desc.text = P.table.getDiamondByPrice(this.m_data.addQuota) + "",
            this.m_txt_Add.text = "x" + P.table.getDiamondByPrice(this.m_data.addQuota),
            D.instance.playSound("blindbox.mp3"),
            e.play(0, !1, Laya.Handler.create(this, ()=>{
                e.play(4, !1, Laya.Handler.create(this, ()=>{
                    e.visible = !1
                }
                ))
            }
            )),
            this.m_img = "cat/ui_tableEx/diamond.png",
            Laya.timer.once(10, this, ()=>{
                this.m_btn_Click.label = "continue (4s)",
                this.long.once(Laya.Event.COMPLETE, this, ()=>{
                    let t = 4;
                    this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                    this.m_tick.onEnd = ()=>{
                        this.checkClose()
                    }
                    ,
                    this.m_tick.onTick = ()=>{
                        this.m_btn_Click.label = `continue (${t--}s)`
                    }
                    ,
                    this.m_tick.start()
                }
                ),
                this.long.play(0, !1)
            }
            )) : (this.m_txt_Desc.text = this.m_data.addQuota,
            this.m_txt_Add.text = "x" + this.m_data.addQuota,
            this.m_img = "cat/ui_item/dollar.png",
            i.id < 6 && 1 == i.showType ? Laya.timer.once(10, this, ()=>{
                this.m_btn_Click.label = "continue (4s)",
                this.nolong.once(Laya.Event.COMPLETE, this, ()=>{
                    let t = 4;
                    this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                    this.m_tick.onEnd = ()=>{
                        this.checkClose()
                    }
                    ,
                    this.m_tick.onTick = ()=>{
                        this.m_btn_Click.label = `continue (${t--}s)`
                    }
                    ,
                    this.m_tick.start()
                }
                ),
                this.nolong.play(0, !1)
            }
            ) : (D.instance.playSound("blindbox.mp3"),
            e.play(0, !1, Laya.Handler.create(this, ()=>{
                e.play(5, !1, Laya.Handler.create(this, ()=>{
                    e.visible = !1
                }
                ))
            }
            )),
            Laya.timer.once(10, this, ()=>{
                this.m_btn_Click.label = "continue (4s)",
                this.long.once(Laya.Event.COMPLETE, this, ()=>{
                    this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                    this.m_tick.onEnd = ()=>{
                        this.checkClose()
                    }
                    ;
                    let t = 4;
                    this.m_tick.onTick = ()=>{
                        this.m_btn_Click.label = `continue (${t--}s)`
                    }
                    ,
                    this.m_tick.start()
                }
                ),
                this.long.play(0, !1)
            }
            ))))
        }
        playRandom() {
            let e = Math.ceil(4 * Math.random());
            this.m_img_Random.skin = `cat/ui_tableEx/nothing${e}.png`,
            this.m_btn_Click.label = "continue (5s)",
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                2 == e && this.ani3.play(0, !0),
                this.m_tick = E.create(Date.newDate().getTime() + 5e3, 1e3),
                this.m_tick.onEnd = ()=>{
                    this.checkClose()
                }
                ;
                let t = 5;
                this.m_tick.onTick = ()=>{
                    this.m_btn_Click.label = `continue (${t--}s)`
                }
                ,
                this.m_tick.start()
            }
            ),
            this.ani1.play(0, !1)
        }
        checkClose() {
            var t = P.table.m_lastInfo;
            t && t.freeCount && m(yi, {
                params: [t.freeCount]
            }).then(t=>{}
            ),
            this.closeDialog()
        }
        onClickClick(t) {
            this.checkClose()
        }
    }
    class vi extends t.cat.views.table.PlayNewDlgUI {
        onAwake() {
            super.onAwake();
            let t = I.name;
            var e, i;
            this.m_txt_Name.text = I.name,
            172 < this.m_txt_Name.width && (e = t.length,
            i = Math.ceil((this.m_txt_Name.width - 172) / 26),
            this.m_txt_Name.text = t.slice(0, (e - i) / 2) + "..." + t.slice(e - (e - i) / 2)),
            this.m_view_Head.setHeadShow({
                isCircle: !0,
                icoUrl: I.icon + "",
                uname: I.name,
                borderLvl: 5,
                notShowChain: !0
            }),
            this.m_btn_Click.label = "continue (4s)";
            let s = 4;
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                this.m_tick.onTick = ()=>{
                    this.m_btn_Click.label = `continue (${s--}s)`
                }
                ,
                this.m_tick.onEnd = ()=>{
                    this.closeDialog()
                }
                ,
                this.m_tick.start()
            }
            ),
            this.ani1.play(0, !1)
        }
        onDestroy() {
            super.onDestroy(),
            this.m_tick && this.m_tick.dispose()
        }
    }
    class ki extends t.cat.views.table.PlayDiamondDlgUI {
        constructor(t) {
            super(),
            this.m_img = "",
            this.m_data = t
        }
        onDestroy() {
            super.onDestroy(),
            P.event(y.UPDATE_TABLE),
            Laya.timer.clearAll(this),
            zt(this.m_img, 20, {
                x: 280,
                y: 560
            }, {
                x: 280,
                y: 260
            }),
            D.instance.playSound("CatGem.mp3")
        }
        onAwake() {
            super.onAwake(),
            this.updateView(),
            this.m_img_Icon1.skin = this.m_img_Icon.skin = "cat/ui_item/dollar.png"
        }
        updateView() {
            let s = P.table.getDiamondByPrice(this.m_data.addQuota) + "";
            var t = Data.getTurnTable(P.table.tableInfo.preId);
            let a = 16 == this.m_data.info.useCount || 2 == t.arrowIndex ? "cat/spine/blindbox1.json" : "cat/spine/blindbox2.json";
            if (2 == t.showType) {
                let t = R.create({
                    url: a,
                    parent: this,
                    px: this.width / 2,
                    py: this.height / 2
                });
                t.play(0, !1, Laya.Handler.create(this, ()=>{
                    t.play(4, !1, Laya.Handler.create(this, ()=>{
                        t.visible = !1
                    }
                    ))
                }
                )),
                D.instance.playSound("blindbox.mp3"),
                this.m_img = "cat/ui_item/dollar.png",
                Laya.timer.once(10, this, ()=>{
                    this.m_btn_Click.label = "continue (4s)",
                    this.ani1.addLabel("maigc", 98),
                    this.ani1.once(Laya.Event.LABEL, this, ()=>{
                        D.instance.playSound("magic.mp3")
                    }
                    ),
                    this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                        let t = 4;
                        this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                        this.m_tick.onTick = ()=>{
                            this.m_btn_Click.label = `continue (${t--}s)`
                        }
                        ,
                        this.m_tick.onEnd = ()=>{
                            this.checkClose()
                        }
                        ,
                        this.m_tick.start()
                    }
                    ),
                    this.ani1.play(0, !1)
                }
                )
            } else if (3 == t.showType) {
                let t = R.create({
                    url: a,
                    parent: this,
                    px: this.width / 2,
                    py: this.height / 2
                });
                t.play(0, !1, Laya.Handler.create(this, ()=>{
                    t.play(4, !1, Laya.Handler.create(this, ()=>{
                        t.visible = !1
                    }
                    ))
                }
                )),
                D.instance.playSound("blindbox.mp3"),
                this.m_img = "cat/ui_tableEx/diamond.png",
                Laya.timer.once(10, this, ()=>{
                    this.m_btn_Click.label = "continue (4s)",
                    this.ani2.once(Laya.Event.COMPLETE, this, ()=>{
                        let t = 4;
                        this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                        this.m_tick.onTick = ()=>{
                            this.m_btn_Click.label = `continue (${t--}s)`
                        }
                        ,
                        this.m_tick.onEnd = ()=>{
                            this.checkClose()
                        }
                        ,
                        this.m_tick.start()
                    }
                    ),
                    this.ani2.play(0, !1),
                    this.ani2.addLabel("maigc", 154),
                    this.ani2.once(Laya.Event.LABEL, this, ()=>{
                        D.instance.playSound("magic.mp3")
                    }
                    )
                }
                )
            } else
                4 == t.showType && (16 != P.table.tableInfo.useCount ? (a = "cat/spine/blindbox2.json",
                this.m_img_1.skin = this.m_img_2.skin = this.m_img_3.skin = "cat/ui_tableEx/box4.png") : (a = "cat/spine/blindbox1.json",
                this.m_img_1.skin = this.m_img_2.skin = this.m_img_3.skin = "cat/ui_tableEx/box3.png"),
                this.ani3.addLabel("blindbox", 13),
                this.ani3.once(Laya.Event.LABEL, this, ()=>{
                    D.instance.playSound("blindbox.mp3")
                }
                ),
                this.ani3.once(Laya.Event.COMPLETE, this, ()=>{
                    this.m_txt_Desc3.text = "x" + s,
                    this.m_txt_Desc2.text = `Congrats! You get ${s} Diamonds!`;
                    let t = R.create({
                        url: a,
                        parent: this,
                        px: 97,
                        scale: .55,
                        py: 580
                    })
                      , e = R.create({
                        url: a,
                        parent: this,
                        px: this.width / 2 - 8,
                        py: 580,
                        scale: .55
                    })
                      , i = R.create({
                        url: a,
                        parent: this,
                        px: 450,
                        py: 580,
                        scale: .55
                    });
                    t.play(4, !1, Laya.Handler.create(this, ()=>{}
                    )),
                    e.play(4, !1),
                    i.play(4, !1),
                    this.m_box_Ani.visible = !1,
                    this.ani4.once(Laya.Event.COMPLETE, this, ()=>{
                        let t = 4;
                        this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                        this.m_tick.onTick = ()=>{
                            this.m_btn_Click.label = `continue (${t--}s)`
                        }
                        ,
                        this.m_tick.onEnd = ()=>{
                            this.checkClose()
                        }
                        ,
                        this.m_tick.start()
                    }
                    ),
                    this.ani4.play(0, !1)
                }
                ),
                this.m_img = "cat/ui_tableEx/diamond.png",
                this.m_btn_Click.label = "continue (4s)",
                this.ani3.play(0, !1))
        }
        onClickClick() {
            this.checkClose()
        }
        checkClose() {
            this.m_tick && this.m_tick.dispose(),
            this.ani1.offAll(),
            this.ani2.offAll(),
            this.ani3.offAll(),
            this.ani4.offAll();
            var t = P.table.tableInfo;
            3 == Data.getTurnTable(t.preId).showType ? (this.visible = !1,
            m(vi).then(t=>{
                t.wait().then(()=>{
                    this.closeDialog()
                }
                )
            }
            )) : (P.table.m_lastInfo && P.table.m_lastInfo.freeCount && m(yi, {
                params: [P.table.m_lastInfo.freeCount]
            }).then(t=>{}
            ),
            this.closeDialog())
        }
    }
    class fi extends t.cat.views.table.ExitDlgUI {
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        updateView() {
            let t = P.table.tableInfo.curQuota;
            var e = P.table.getDiamondByPrice(t)
              , i = +P.table.tableInfo.quota;
            e ? (e = P.table.getDiamondByPrice(+(i - +t).toFixed(6)),
            this.m_txt_Left.text = e + "",
            this.m_txt_Att.text = "diamonds!",
            this.m_txt_Desc.text = "" + e,
            this.m_img_Left.skin = "cat/ui_tableEx/diamond.png") : (e = +((100 * i - 100 * +t) / 100).toFixed(3),
            this.m_txt_Left.text = e + "",
            this.m_txt_Att.text = " $!",
            this.m_txt_Desc.text = "" + e,
            this.m_img_Left.skin = "cat/ui_item/dollar.png");
            let s = t.split(".");
            this.m_img_Icon.skin = "cat/ui_item/dollar.png",
            this.m_txt_Cur.text = Intl.NumberFormat().format(+(s[0] + (s[1] ? "." + s[1].slice(0, 2) : ""))) + "",
            this.m_pbr_bar.value = +P.table.tableInfo.curQuota / +P.table.tableInfo.quota,
            this.m_txt_Qouta.text = P.table.tableInfo.quota + " $"
        }
        onClickExit() {
            this.closeDialog(h.Yes)
        }
        onClickGet() {
            this.closeDialog()
        }
    }
    class wi extends t.cat.views.table.PlayDoubleDiamondDlgUI {
        constructor(t) {
            super(),
            this.m_data = t
        }
        onDestroy() {
            super.onDestroy(),
            P.event(y.UPDATE_TABLE),
            this.m_tick && this.m_tick.dispose(),
            D.instance.playSound("CatGem.mp3"),
            zt("cat/ui_tableEx/diamond.png", 20, {
                x: 280,
                y: 560
            }, {
                x: 280,
                y: 260
            })
        }
        onAwake() {
            super.onAwake(),
            this.updateView(),
            D.instance.playSound("magic.mp3")
        }
        updateView() {
            var t = P.table.getDiamondByPrice(this.m_data.addQuota)
              , e = +(t / 2).toFixed(3);
            this.m_btn_Click.label = "continue (4s)",
            this.m_txt_Desc.text = "x" + e,
            this.m_txt_Now.text = "x" + t;
            let i = R.create({
                url: "cat/spine/magic.json",
                parent: this,
                px: this.width / 2,
                py: this.height / 2
            });
            i.play(0, !1),
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3);
                let t = 4;
                this.m_tick.onTick = ()=>{
                    this.m_btn_Click.label = `continue (${t--}s)`
                }
                ,
                this.m_tick.start(),
                this.m_tick.onEnd = ()=>{
                    this.closeDialog()
                }
            }
            ),
            this.ani1.play(0, !1)
        }
    }
    class xi extends t.cat.views.table.TurnTableRecordDlgUI {
        onAwake() {
            super.onAwake(),
            this.updateView(),
            this.m_lst_Spin.array = [],
            this.m_lst_Help.elasticEnabled = !1,
            this.m_lst_Spin.elasticEnabled = !1,
            this.m_box_Help.on(Laya.Event.CLICK, this, ()=>{
                this.m_lst_Spin.visible = !1,
                this.m_lst_Help.visible = !0,
                this.m_img_BarBg.x = 17,
                Laya.Tween.to(this.m_img_BarBg, {
                    x: 225
                }, 200),
                this.m_txt_Help.color = "#ffb628",
                this.m_txt_Draw.color = "#a8774d"
            }
            ),
            this.m_box_Spin.on(Laya.Event.CLICK, this, ()=>{
                this.m_lst_Help.visible = !1,
                this.m_lst_Spin.visible = !0,
                this.m_img_BarBg.x = 225,
                Laya.Tween.to(this.m_img_BarBg, {
                    x: 17
                }, 200),
                this.m_txt_Draw.color = "#ffb628",
                this.m_txt_Help.color = "#a8774d"
            }
            )
        }
        onDestroy() {
            super.onDestroy(),
            Laya.Tween.clearAll(this.m_img_BarBg)
        }
        updateView() {
            P.table.reqHelpRecord().then(t=>{
                this.m_lst_Help.array = t
            }
            ),
            P.table.reqSpinRecord().then(t=>{
                this.m_lst_Spin.array = t
            }
            )
        }
    }
    class Ti extends t.cat.views.table.TurnTableRuleDlgUI {
        onAwake() {
            super.onAwake(),
            this.updateView(),
            this.m_lst_Record.elasticEnabled = !1,
            this.m_box_Claim.on(Laya.Event.CLICK, this, ()=>{
                this.m_pan_Desc.visible = !1,
                this.m_lst_Record.visible = !0,
                Laya.Tween.to(this.m_img_BarBg, {
                    x: 225
                }, 200),
                this.m_txt_Help.color = "#ffb628",
                this.m_txt_Draw.color = "#a8774d"
            }
            ),
            this.m_box_Rules.on(Laya.Event.CLICK, this, ()=>{
                this.m_pan_Desc.visible = !0,
                this.m_lst_Record.visible = !1,
                Laya.Tween.to(this.m_img_BarBg, {
                    x: 17
                }, 200),
                this.m_txt_Draw.color = "#ffb628",
                this.m_txt_Help.color = "#a8774d"
            }
            ),
            this.m_pan_Desc.vScrollBar.visible = !1
        }
        onDestroy() {
            super.onDestroy(),
            Laya.Tween.clearAll(this.m_img_BarBg)
        }
        updateView() {
            P.table.reqWithdRecord().then(t=>{
                this.m_lst_Record.array = t
            }
            )
        }
    }
    class Si extends t.cat.views.table.TipViewUI {
        constructor(t, e, i) {
            super(),
            this.m_head = e,
            this.m_desc = t,
            this.m_name = i
        }
        onAwake() {
            super.onAwake(),
            this.m_txt_Desc.text = this.m_desc,
            this.m_view_Head.setHeadShow({
                isCircle: !0,
                uname: this.m_name,
                icoUrl: this.m_head,
                borderLvl: 5,
                notShowChain: !0
            }),
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                this.destroy()
            }
            ),
            this.ani1.play(0, !1)
        }
    }
    class Ii extends t.cat.views.table.HelpOtherDlgUI {
        constructor(t) {
            super(),
            this.m_helpInfo = t
        }
        onAwake() {
            super.onAwake(),
            this.m_view_Head.setHeadShow({
                isCircle: !0,
                icoUrl: this.m_helpInfo.icon + "",
                uname: this.m_helpInfo.name,
                borderLvl: 5,
                notShowChain: !0
            }),
            this.m_txt_HelpName.text = this.m_helpInfo.name
        }
        onClickOpen() {
            P.table.reqHelpOtherTurn(this.m_helpInfo.helpId).then(t=>{
                _(Si, {
                    params: [k(2032), this.m_helpInfo.icon, this.m_helpInfo.name]
                }).then(t=>{
                    n.add2Container(t, c.Toast)
                }
                ),
                this.closeDialog()
            }
            , t=>{
                this.closeDialog()
            }
            )
        }
    }
    class Di extends t.cat.views.squad.HeadViewUI {
        constructor() {
            super(...arguments),
            this.m_awaked = !1,
            this.m_data = null
        }
        onAwake() {
            super.onAwake(),
            this.m_awaked = !0,
            this.m_data && this.setHeadShow(this.m_data)
        }
        setHeadShow(t) {
            this.m_awaked ? ((this.m_data = t).isCircle ? (this.m_img_Mask.skin = "cat/ui_item/8.png",
            this.m_img_Board.left = this.m_img_Board.right = this.m_img_Board.top = this.m_img_Board.bottom = -1,
            this.m_img_Board.skin = `cat/ui_rank/head1${t.borderLvl}.png`) : (this.m_img_Mask.skin = "cat/ui_rank/headMask.png",
            this.m_img_Board.left = this.m_img_Board.right = this.m_img_Board.top = this.m_img_Board.bottom = -4,
            this.m_img_Board.skin = `cat/ui_rank/head${t.borderLvl}.png`),
            this.m_img_Mask.size(this.width, this.height),
            "" != t.icoUrl && +t.icoUrl ? (this.m_img_Head.skin = "https://game.catizen.ai/tgcatimgs/" + t.icoUrl + ".jpg",
            this.m_img_Head.visible = !0,
            this.m_box_Default.visible = !1) : (this.m_box_Default.visible = !0,
            this.m_img_Head.visible = !1,
            this.m_txt_Show.text = t.uname && t.uname.slice(0, 2) || "Na"),
            t.notShowChain ? this.m_img_Chain.visible = !1 : (this.m_img_Chain.visible = !0,
            t.channelId && 1 != t.channelId ? this.m_img_Chain.skin = `cat/ui_rank/m_chain_${t.channelId}.png` : this.m_img_Chain.skin = "cat/ui_rank/m_chain_1.png"),
            this.visible = !0) : this.m_data = t
        }
    }
    class Li extends t.cat.views.table.PlayAddTimeDlgUI {
        constructor(t) {
            super(),
            this.m_times = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        updateView() {
            this.m_txt_Desc.text = this.m_times;
            let t = 4;
            D.instance.playSound("richcat.mp3"),
            this.m_btn_Click.label = "continue (4s)",
            this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                this.m_tick = E.create(Date.newDate().getTime() + 3e3, 1e3),
                this.m_tick.onTick = ()=>{
                    this.m_btn_Click.label = `continue (${t--}s)`
                }
                ,
                this.m_tick.onEnd = ()=>{
                    this.closeDialog()
                }
                ,
                this.m_tick.start()
            }
            ),
            this.ani1.play(0, !1)
        }
    }
    class Ai extends t.cat.views.table.HelpDlgUI {
        constructor(t, e=0) {
            super(),
            this.m_helpNum = 0,
            this.m_helpInfoArr = t || [],
            this.m_helpNum = e
        }
        onAwake() {
            super.onAwake(),
            this.m_box_HeadView.destroyChildren();
            for (let e = 0; e < this.m_helpInfoArr.length && !(2 < e); e++) {
                var i = this.m_helpInfoArr[e];
                let t = new Di;
                t.setHeadShow({
                    isCircle: !0,
                    icoUrl: i.icon + "",
                    uname: i.name,
                    borderLvl: 5,
                    notShowChain: !0
                }),
                this.m_box_HeadView.addChild(t)
            }
            1 == this.m_helpNum ? (this.m_txt_Desc0.text = this.m_helpInfoArr[0].name.slice(0, 5),
            this.m_txt_Desc1.text = this.m_txt_Desc2.text = this.m_txt_Desc3.text = "") : 2 == this.m_helpNum ? (this.m_txt_Desc0.text = this.m_helpInfoArr[0].name.slice(0, 5),
            this.m_txt_Desc2.text = this.m_helpInfoArr[1].name.slice(0, 5),
            this.m_txt_Desc3.text = "") : (this.m_txt_Desc0.text = this.m_helpInfoArr[0].name.slice(0, 5),
            this.m_txt_Desc2.text = this.m_helpNum - 1 + ""),
            P.event(y.UPDATE_TABLE)
        }
        onClickOpen() {
            d(Li, {
                params: [this.m_helpNum]
            }),
            this.closeDialog()
        }
    }
    class Ei extends t.cat.views.table.FinalClaimViewUI {
        onDestroy() {
            super.onDestroy(),
            Laya.Tween.clearAll(this),
            Laya.timer.clearAll(this)
        }
        updateView(t) {
            let e = {
                isCircle: !0,
                icoUrl: "",
                uname: "",
                borderLvl: 5,
                notShowChain: !0
            };
            t.param.forEach(t=>{
                t.valType ? t.valType == Mt.fishcoin ? (this.m_txt_Num0.text = Intl.NumberFormat().format(+t.val),
                this.m_img_Token0.skin = "cat/ui_item/8.png") : t.valType == Mt.xZen ? (this.m_txt_Num1.text = Intl.NumberFormat().format(+t.val),
                this.m_img_Token1.skin = "cat/ui_item/xzen.png") : t.valType == Mt.icon && (e.icoUrl = t.val) : (this.m_txt_Name.text = t.val,
                e.uname = t.val)
            }
            ),
            this.m_view_Head.setHeadShow(e),
            Laya.timer.callLater(this, ()=>{
                this.destroyed || (this.width = 90 + this.m_box_Con.width + 30)
            }
            )
        }
        doAniShow(t, e) {
            var i = Mmobay.Utils.getScreenInfo();
            t.addChild(this),
            this.x = i.stageWidth,
            this.y = 80,
            Laya.Tween.to(this, {
                x: -this.width - 50 - (i.stageWidth - 560) / 2
            }, 1e4 + 560 * (i.stageWidth - 560) / 6e3, null, Laya.Handler.create(this, ()=>{
                this.removeSelf(),
                e && e()
            }
            ))
        }
    }
    class Ri extends t.cat.views.table.SuccessDlgUI {
        constructor(t) {
            super(),
            this.m_data = t
        }
        onAwake() {
            super.onAwake(),
            this.updateView()
        }
        onDestroy() {
            super.onDestroy(),
            P.table.tableInfo = null,
            P.table.m_lastInfo = null,
            I.getCountByType(Dt.turnStartDay) >= +Data.gameConf.turnTableCfg.dayMaxCount || d(Ci, {
                closeOnSide: !1
            })
        }
        updateView() {
            this.m_box_Fish.visible = !0,
            this.m_txt_Fish.text = Intl.NumberFormat().format(+this.m_data.addFishCoin) + "",
            this.m_txt_Dollar.text = `(value ≈ ${P.table.tableInfo.quota}$)`,
            this.m_txt_Cur.text = Intl.NumberFormat().format(+this.m_data.addXZen) + ""
        }
    }
    class Mi extends t.cat.views.table.NoTimeDlgUI {
        onAwake() {
            super.onAwake();
            var t = P.table.tableInfo.curQuota
              , e = P.table.getDiamondByPrice(t)
              , i = +P.table.tableInfo.quota;
            e ? (this.m_txt_Desc.text = "" + P.table.getDiamondByPrice(+(i - +t).toFixed(6)),
            this.m_img_Left.skin = "cat/ui_tableEx/diamond.png") : (this.m_txt_Desc.text = +((100 * i - 100 * +t) / 100).toFixed(3) + " ",
            this.m_img_Left.skin = "cat/ui_item/dollar.png"),
            this.m_img_Icon.skin = "cat/ui_item/dollar.png",
            this.m_txt_Cur.text = Intl.NumberFormat().format(+P.table.tableInfo.quota) + "",
            this.m_view_Head.setHeadShow({
                isCircle: !0,
                icoUrl: I.icon,
                uname: I.name,
                borderLvl: 5,
                notShowChain: !0
            }),
            this.m_txt_HelpName.text = I.name
        }
        onClickInvite() {
            I.doInviteAction("Bro, I'm about to buy a Lamborghini soon! Please help me out!! 🚗🙏")
        }
        onClickCopy() {
            P.table.getInviteCopyLink()
        }
    }
    class Ni extends t.cat.views.table.TableDlgUI {
        constructor(t) {
            super(),
            this.m_msgArr = [],
            this.m_msgShowedArr = [],
            this.m_poolHistory = [],
            this.m_loop = 0,
            this.m_aniflag = !1,
            this.m_preHelp = t
        }
        onAwake() {
            var t, e;
            super.onAwake(),
            P.cat.goldMute = !0,
            D.instance.playMusic("BGM_Excavate.mp3"),
            this.updateView(!0),
            this.ani17.play(0, !0),
            this.m_img_Icon.skin = this.m_img_Icon2.skin = "cat/ui_item/dollar.png",
            this.m_txt_Date.text = xt(Date.newDate(), "yyyy/mm/dd"),
            this.m_tick && this.m_tick.dispose(),
            this.m_tick = E.create(1e3 * +P.table.tableInfo.endTime, 1e3, this.m_txt_EndTime, "HH:MM:ss"),
            this.m_tick.start(),
            this.m_tick.onEnd = ()=>{
                P.table.tableInfo = null,
                n.instance.removeAllPopup(),
                this.closeDialog(),
                d(Ci, {
                    closeOnSide: !1
                })
            }
            ,
            this.addTitle(""),
            this.title && (this.title.top = -10),
            this.m_txt_Name.text = (t = I.name,
            e = 10,
            t.length > e ? t.slice(0, e) + "..." : t),
            this.m_view_Head.setHeadShow({
                isCircle: !0,
                icoUrl: I.icon,
                uname: I.name,
                borderLvl: 5,
                notShowChain: !0
            }),
            this.checkHelp(),
            this.checkClaimedShow(),
            P.table.checkHelpShowArr(),
            P.sysNotice.reqWatch(Bt.helpTurn)
        }
        onDestroy() {
            super.onDestroy(),
            P.sysNotice.reqUnWatch(Bt.helpTurn),
            this.m_poolHistory.forEach(t=>{
                t.destroy()
            }
            ),
            P.cat.goldMute = !1,
            P.event(y.OFFLINE_CHANGE),
            Laya.timer.clearAll(this),
            this.m_poolHistory.length = 0,
            D.instance.playMusic("BGM_Cafe.mp3")
        }
        onClickBack(t) {
            this.m_btn_Asset.visible ? this.closeDialog() : d(fi).then(t=>{
                t.wait().then(t=>{
                    t.type == h.Yes && this.closeDialog()
                }
                )
            }
            )
        }
        updateAdd(t) {
            var e = P.table.getDiamondByPrice(t);
            e ? this.m_txt_Add2.text = "+" + e : this.m_txt_Add.text = "+" + t
        }
        updateView(t=!1) {
            let e = P.table.tableInfo
              , i = (this.m_img_Finger.visible = !!e.count,
            +e.quota);
            var s = +e.curQuota >= i;
            this.m_txt_Left.visible = !s,
            this.m_btn_Asset.visible = s,
            this.m_btn_Invite.visible = !s,
            this.m_btn_Copy.visible = !s;
            let a = e.curQuota.split("."), n = (this.m_img_Add.visible = !1,
            P.table.getDiamondByPrice(+e.curQuota)), o;
            if (this.m_txt_Info.visible = !0,
            s)
                return this.m_img_Times.alpha = 0,
                this.m_txt_Times2.visible = !1,
                this.ani16.play(0, !1),
                this.m_box_Dia1.visible = this.m_box_Dia2.visible = !1,
                this.m_box_Desc2.visible = !0,
                void (this.m_txt_Now.text = e.quota);
            this.updateTimes(),
            n ? (o = "diamond",
            this.m_txt_Dia1Text.text = Intl.NumberFormat().format(+e.quota) + "$",
            t ? (this.m_box_Dia1.visible = this.m_box_Dia2.visible = !!n,
            this.m_box_Desc.visible = this.m_box_Desc2.visible = !n,
            this.m_txt_Dia2Text.text = "" + P.table.getDiamondByPrice(+(i - +e.curQuota).toFixed(6))) : Laya.timer.once(1200, this, ()=>{
                this.m_box_Dia1.visible = this.m_box_Dia2.visible = !!n,
                this.m_box_Desc.visible = this.m_box_Desc2.visible = !n,
                this.m_txt_Dia2Text.text = "" + P.table.getDiamondByPrice(+(i - +e.curQuota).toFixed(6))
            }
            ),
            +this.m_txt_Add2.text && this.ani15.play(0, !1)) : (o = "$",
            this.m_txt_Left.text = "" + +((100 * i - 100 * +e.curQuota) / 100).toFixed(3),
            t ? this.m_txt_Now.text = Intl.NumberFormat().format(+(a[0] + (a[1] ? "." + a[1].slice(0, 2) : ""))) : this.updateSum(+this.m_temp, +e.curQuota),
            +this.m_txt_Add.text && this.aniadd.play(0, !1),
            this.m_txt_Attach.text = o);
            s = Data.getTurnTable(e.preId);
            s && s.nextTurnPic && this["aniBg" + s.nextTurnPic].play(0, !1),
            !s && e.useCount && this.aniBg4.play(0, !1);
            let r = Data.getTurnTableAddCount(e.addCountId);
            e.canAddCount ? (this.m_img_Add.visible = !0,
            this.ani14.play(0, !0),
            this.m_txt_Times3.visible = !1) : e.addCountId && r && r.addCountNeed.length && (this.m_img_Add.visible = !0,
            this.ani14.gotoAndStop(0),
            this.m_txt_Times3.visible = !0,
            this.m_txt_Times3.text = r.addCountNeed.split(",")[0]),
            this.m_img_Add1.visible = this.m_txt_add1.visible = !!e.canAddCount,
            this.m_box_Desc.refresh()
        }
        updateTimes() {
            var t = P.table.tableInfo.count;
            this.m_txt_Times1.text = t + "",
            this.m_txt_Times2.text = t + " times",
            this.m_img_Times.visible = 0 < t
        }
        doRotate(t, e) {
            this["ani" + t].once(Laya.Event.COMPLETE, this, ()=>{
                this.play(e),
                D.instance.playSound("spinstop.mp3")
            }
            ),
            this["ani" + t].play(0, !1)
        }
        onClickSpin() {
            let i = P.table.tableInfo.quota == P.table.tableInfo.curQuota;
            i ? this.onClickAsset() : Be("spin", 500) && (P.table.tableInfo.count ? (this.mouseEnabled = !1,
            Laya.timer.once(1e4, this, this.enableClick),
            this.m_temp = +P.table.tableInfo.curQuota,
            P.table.reqSpin().then(t=>{
                Laya.timer.clear(this, this.enableClick),
                this.m_img_Finger.visible = !1,
                D.instance.playSound("spin.mp3"),
                t.addQuota ? (this.m_txt_Add.scale(1, 1),
                this.m_txt_Add2.scale(1, 1)) : (this.m_txt_Add.scale(0, 0),
                this.m_txt_Add2.scale(0, 0));
                var e = Data.getTurnTable(t.info.preId);
                this.ani17.stop(),
                this.doRotate(e && !i ? e.arrowIndex : 2, t)
            }
            )) : d(Mi))
        }
        enableClick() {
            this.mouseEnabled = !0
        }
        onClickAddTime() {
            if (P.table.tableInfo.canAddCount)
                P.table.reqClaimCount();
            else {
                var e = Data.getTurnTableAddCount(P.table.tableInfo.addCountId);
                if (e) {
                    let t = e.addCountNeed;
                    u(k(2031, t.split(",")[1]))
                }
            }
        }
        play(t) {
            this.m_aniflag = !0;
            var e = Data.getTurnTable(t.info.preId);
            e ? 1 == e.showType || 6 == e.showType ? m(bi, {
                params: [t]
            }).then(t=>{
                this.mouseEnabled = !0,
                t.wait().then(()=>{
                    this.ani17.play(0, !0),
                    this.m_aniflag = !1,
                    P.table.checkHelpShowArr()
                }
                )
            }
            ) : 2 == e.showType || 3 == e.showType || 4 == e.showType ? m(ki, {
                params: [t]
            }).then(t=>{
                this.mouseEnabled = !0,
                t.wait().then(()=>{
                    this.ani17.play(0, !0),
                    this.m_aniflag = !1,
                    P.table.checkHelpShowArr()
                }
                )
            }
            ) : m(wi, {
                params: [t],
                closeOnSide: !1
            }).then(t=>{
                this.mouseEnabled = !0,
                t.wait().then(()=>{
                    this.ani17.play(0, !0),
                    this.m_aniflag = !1,
                    P.table.checkHelpShowArr()
                }
                )
            }
            ) : m(bi, {
                params: [t]
            }).then(t=>{
                this.mouseEnabled = !0,
                t.wait().then(()=>{
                    this.ani17.play(0, !0),
                    this.m_aniflag = !1,
                    P.table.checkHelpShowArr()
                }
                )
            }
            )
        }
        checkHelp() {
            this.m_preHelp && this.m_preHelp.helpId ? d(Ii, {
                params: [this.m_preHelp]
            }).then(t=>{
                t.wait().then(()=>{
                    this.checkHelpArrShow()
                }
                )
            }
            ) : this.checkHelpArrShow()
        }
        checkHelpArrShow() {
            P.table.reqGetOffHelpTurnRecord().then(t=>{
                t.records.length && (this.m_aniflag = !0,
                d(Ai, {
                    params: [t.records, t.count]
                }).then(t=>{
                    t.wait().then(()=>{
                        this.m_aniflag = !1,
                        P.event(y.UPDATE_TABLE_TIME)
                    }
                    )
                }
                ))
            }
            )
        }
        checkClaimedShow() {
            P.table.reqTurnWithdrawHistory().then(t=>{
                this.m_msgArr = t.list,
                this.showClaimHorse()
            }
            )
        }
        showClaimHorse() {
            if (this.m_msgArr.length || this.m_msgShowedArr.length) {
                this.m_msgArr.length || (this.m_msgArr = this.m_msgShowedArr);
                let e = this.m_msgArr.shift();
                if (e) {
                    let t = this.m_poolHistory.pop();
                    t ? (t.updateView(e),
                    t.doAniShow(this, ()=>{
                        this.m_msgShowedArr.push(e),
                        this.m_poolHistory.push(t)
                    }
                    )) : _(Ei, null).then(t=>{
                        t.updateView(e),
                        t.doAniShow(this, ()=>{
                            this.m_msgShowedArr.push(e),
                            this.m_poolHistory.push(t)
                        }
                        )
                    }
                    )
                }
                Laya.timer.once(3e4, this, this.showClaimHorse)
            }
        }
        onClickDetail() {
            d(xi)
        }
        onClickInvite() {
            I.doInviteAction("Bro, I'm about to buy a Lamborghini soon! Please help me out!! 🚗🙏")
        }
        onClickRules() {
            d(Ti)
        }
        onClickAsset() {
            P.table.reqTurnWithdraw().then(t=>{
                d(Ri, {
                    params: [t]
                }),
                this.closeDialog()
            }
            )
        }
        updateSum(t, e) {
            this.m_loop = 0,
            this.m_txt_Now.text = Intl.NumberFormat().format(t),
            Laya.timer.once(1e3, this, ()=>{
                Laya.timer.loop(20, this, this.tweenNow, [t, e])
            }
            )
        }
        tweenNow(t, e) {
            if (this.m_loop++,
            50 == this.m_loop)
                return Laya.timer.clear(this, this.tweenNow),
                void (this.m_txt_Now.text = Intl.NumberFormat().format(e) + "");
            this.m_txt_Now.text = Intl.NumberFormat().format((t + (e - t) / 50 * this.m_loop).toFixed(2)) + ""
        }
        updatePopHelp() {
            this.m_aniflag || (this.m_aniflag = !0,
            P.table.checkHelpShowArr(()=>{
                this.m_aniflag = !1
            }
            ))
        }
        updateInfo() {
            P.table.reqTableInfo().then(()=>{
                this.updateTimes()
            }
            )
        }
        onClickAssets() {
            d(Je)
        }
        onClickCopy() {
            P.table.getInviteCopyLink()
        }
    }
    L([A("startSpin")], Ni.prototype, "updateAdd", null),
    L([A(y.UPDATE_TABLE)], Ni.prototype, "updateView", null),
    L([A(y.HELP_TURN_ADD_CHECK)], Ni.prototype, "updatePopHelp", null),
    L([A(y.UPDATE_TABLE_TIME)], Ni.prototype, "updateInfo", null);
    class Pi extends t.cat.views.task.TaskTypeCellViewUI {
        constructor(t, e) {
            super(),
            this.m_tasks = [],
            this.m_type = t,
            this.m_tasks = e
        }
        onAwake() {
            super.onAwake();
            let t = "";
            switch (this.m_type) {
            case Yt.Basic:
                t = "Basic Tasks";
                break;
            case Yt.Daily:
                t = "Daily";
                break;
            case Yt.Premium:
                t = "Telegram premium";
                break;
            case Yt.Twitter:
                t = "X Tasks"
            }
            this.m_txt_Title.text = t;
            var e = this.m_tasks.length
              , e = 120 * e + (e - 1) * this.m_lst_Item.spaceY;
            this.height = this.m_lst_Item.y + e,
            this.m_lst_Item.height = e,
            this.m_lst_Item.array = this.m_tasks
        }
    }
    class Ui extends t.cat.views.task.AchievementTypeCellViewUI {
        constructor(t, e) {
            super(),
            this.m_achievements = [],
            this.m_type = t,
            this.m_achievements = e
        }
        onAwake() {
            super.onAwake();
            let t = ""
              , e = ""
              , i = "0"
              , s = "";
            switch (this.m_type) {
            case Xt.Signin:
                t = "Check in bonus",
                e = "Total check in",
                i = P.task.signInDays + "",
                s = "cat/ui_task/achievement_02.png";
                break;
            case Xt.Recharge:
                t = "Purchase bonus",
                e = "Total purchase",
                i = "$" + P.task.rechargeValues,
                s = "cat/ui_task/achievement_03.png"
            }
            this.m_txt_Title.text = t,
            this.m_txt_Describe.text = e,
            this.m_txt_Count.text = i,
            this.m_img_Icon.skin = s,
            this.m_lst_Item.array = this.m_achievements,
            Laya.timer.once(100, this, ()=>{
                this.updateItemPos()
            }
            )
        }
        updateMouseMove(t) {
            this.m_lst_Item.scrollBar.disableDrag = 0 != t && 1 != t
        }
        updateCount() {
            let t = "0";
            switch (this.m_type) {
            case Xt.Signin:
                t = P.task.signInDays + "";
                break;
            case Xt.Recharge:
                t = "$" + P.task.rechargeValues
            }
            this.m_txt_Count.text = t
        }
        updateItemPos() {
            var e = this.m_achievements.length;
            let i = 0;
            for (let t = 0; t < e; t++)
                if (1 != this.m_achievements[t].receiveReward) {
                    i = t;
                    break
                }
            this.m_lst_Item.scrollTo(i)
        }
    }
    L([A(y.UPDATE_MOUSE_MOVE)], Ui.prototype, "updateMouseMove", null),
    L([A(y.TASK_UPDATE_COUNT)], Ui.prototype, "updateCount", null);
    class Fi extends t.cat.views.task.AchievementInviteCellViewUI {
        constructor(t, e) {
            super(),
            this.m_normalAchievement = t || [],
            this.m_premiumAchievement = e || []
        }
        onAwake() {
            super.onAwake(),
            this.m_txt_NormalCount.text = P.task.normalInvites + "",
            this.m_txt_PremiumCount.text = P.task.premiumInvites + "",
            this.m_lst_NormalItem.array = this.m_normalAchievement,
            this.m_lst_PremiumItem.array = this.m_premiumAchievement,
            this.m_normalAchievement.length && this.m_premiumAchievement.length || (this.height = 340,
            this.m_normalAchievement.length || (this.m_box_Normal.visible = !1,
            this.m_box_Premium.y = this.m_box_Normal.y),
            this.m_premiumAchievement.length || (this.m_box_Premium.visible = !1)),
            Laya.timer.once(100, this, ()=>{
                this.updateNormalItemPos(),
                this.updatePremiumItemPos()
            }
            )
        }
        updateMouseMove(t) {
            0 == t || 1 == t ? (this.m_lst_NormalItem.scrollBar.disableDrag = !1,
            this.m_lst_PremiumItem.scrollBar.disableDrag = !1) : (this.m_lst_NormalItem.scrollBar.disableDrag = !0,
            this.m_lst_PremiumItem.scrollBar.disableDrag = !0)
        }
        updateCount() {
            this.m_txt_NormalCount.text = P.task.normalInvites + "",
            this.m_txt_PremiumCount.text = P.task.premiumInvites + ""
        }
        updateNormalItemPos() {
            var e = this.m_normalAchievement.length;
            let i = 0;
            for (let t = 0; t < e; t++)
                if (1 != this.m_normalAchievement[t].receiveReward) {
                    i = t;
                    break
                }
            this.m_lst_NormalItem.scrollTo(i)
        }
        updatePremiumItemPos() {
            var e = this.m_premiumAchievement.length;
            let i = 0;
            for (let t = 0; t < e; t++)
                if (1 != this.m_premiumAchievement[t].receiveReward) {
                    i = t;
                    break
                }
            this.m_lst_PremiumItem.scrollTo(i)
        }
    }
    L([A(y.UPDATE_MOUSE_MOVE)], Fi.prototype, "updateMouseMove", null),
    L([A(y.TASK_UPDATE_COUNT)], Fi.prototype, "updateCount", null);
    class Bi extends t.cat.views.task.TaskMainDlgUI {
        constructor(t) {
            super(),
            this.m_linkType = p.None,
            this.m_kind = 1,
            this.m_totalFish = 0,
            this.m_showFish = 0,
            this.m_avgFish = 0,
            this.m_moveType = 0,
            this.m_loopCheckTwitterCount = 0,
            this.m_loopCheckTwitterFlag = !1,
            this.m_showClaimMnt = !1,
            this.m_checkClaimMntNum = 0,
            this.m_linkType = t
        }
        static init(e=p.None) {
            P.task.initialized ? m(Bi, {
                params: [e]
            }) : P.task.reqGetTaskInfo().then(t=>{
                m(Bi, {
                    params: [e]
                })
            }
            ).catch(t=>{
                u(t.message)
            }
            )
        }
        onAwake() {
            if (super.onAwake(),
            this.addTitle(),
            this.title) {
                let t = this.title.getChildByName("Back");
                t && (t.left = 27,
                t.centerY = 12)
            }
            this.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown),
            this.on(Laya.Event.MOUSE_UP, this, this.mouseUp),
            this.on(Laya.Event.MOUSE_OUT, this, this.mouseOut),
            this.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove),
            this.m_txt_Name.text = P.task.userName,
            this.m_img_Head.skin = P.task.userIcon,
            this.m_img_MenuHead.skin = P.task.userIcon,
            this.updateTask(),
            this.updateAchievementRed(),
            Laya.timer.once(100, this, ()=>{
                this.updateWalletConnect()
            }
            ),
            this.updateTwitterConnect(),
            Laya.timer.once(300, this, ()=>{
                this.checkLink()
            }
            );
            var t = Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE
              , e = !(t && Laya.Browser.onMobile)
              , i = !Mmobay.MConfig.isTonKeeper;
            this.m_showClaimMnt = t,
            this.m_btn_Wallet.visible = e,
            this.m_btn_Twitter.visible = i,
            e && i ? this.m_box_AccountContent.height = 160 : e || i ? this.m_box_AccountContent.height = 96 : this.m_box_AccountContent.visible = !1,
            this.m_box_Claim.visible = t,
            this.m_box_Tab.y = t ? 330 : 250,
            this.m_pan_Task.top = t ? 410 : 330,
            this.m_pan_Achievement.top = t ? 410 : 330,
            this.updateClaimMntStatus()
        }
        onDestroy() {
            super.onDestroy(),
            Laya.Tween.clearAll(this.m_img_Tab),
            this.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown),
            this.off(Laya.Event.MOUSE_UP, this, this.mouseUp),
            this.off(Laya.Event.MOUSE_OUT, this, this.mouseOut),
            this.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove)
        }
        mouseDown() {
            this.m_lastPos = {
                x: Laya.stage.mouseX,
                y: Laya.stage.mouseY
            }
        }
        mouseUp() {
            this.m_lastPos = null,
            0 != this.m_moveType && (this.m_pan_Achievement.vScrollBar.disableDrag = !1,
            this.m_moveType = 0,
            P.event(y.UPDATE_MOUSE_MOVE, 0))
        }
        mouseOut() {
            this.m_lastPos = null,
            0 != this.m_moveType && (this.m_pan_Achievement.vScrollBar.disableDrag = !1,
            this.m_moveType = 0,
            P.event(y.UPDATE_MOUSE_MOVE, 0))
        }
        mouseMove() {
            if (this.m_lastPos) {
                let t = Laya.stage.mouseX
                  , e = Laya.stage.mouseY;
                var i = this.m_lastPos.x - t
                  , s = this.m_lastPos.y - e;
                Math.abs(i) > Math.abs(s) ? 1 != this.m_moveType && (this.m_pan_Achievement.vScrollBar.disableDrag = !0,
                this.m_moveType = 1,
                P.event(y.UPDATE_MOUSE_MOVE, 1)) : 2 != this.m_moveType && (this.m_pan_Achievement.vScrollBar.disableDrag = !1,
                this.m_moveType = 2,
                P.event(y.UPDATE_MOUSE_MOVE, 2))
            }
        }
        checkLink() {
            var t;
            this.m_linkType == p.TaskAchievement ? this.switchTabMenu(2) : (t = S.get(S.s_taskId)) && (this.m_linkType == p.ConnectWalletForTaskSignIn ? P.wallet.connected && P.event(y.TASK_AUTO_CHECK, [t, !0]) : this.m_linkType == p.CheckOrderForTaskSignIn && P.event(y.TASK_AUTO_CHECK, [t, !1]))
        }
        updateWalletConnect() {
            if (!P.wallet.connected)
                return this.m_txt_Wallet.text = "Connect",
                this.m_img_WalletDisconnect.visible = !1,
                void this.m_box_Wallet.refresh();
            P.wallet.convertAddress().then(t=>{
                this.m_txt_Wallet.text = t.substring(0, 4) + "..." + t.substring(t.length - 4, t.length),
                this.m_img_WalletDisconnect.visible = !0,
                this.m_box_Wallet.refresh()
            }
            )
        }
        updateTwitterConnect() {
            if (!P.task.twitterName)
                return this.m_txt_Twitter.text = "Connect",
                this.m_img_TwitterDisconnect.visible = !1,
                void this.m_box_Twitter.refresh();
            let t = P.task.twitterName;
            12 < t.length && (t = t.substring(0, 4) + "..." + t.substring(t.length - 4, t.length)),
            this.m_txt_Twitter.text = t,
            this.m_img_TwitterDisconnect.visible = !0,
            this.m_box_Twitter.refresh()
        }
        updateClaimMntStatus() {
            this.m_showClaimMnt && (this.m_btn_Claim.label = 2 == P.task.claimMntStatus ? "Claimed" : "Claim",
            this.m_btn_Claim.visible = 1 != P.task.claimMntStatus,
            this.m_btn_Claim.disabled = 2 == P.task.claimMntStatus,
            this.m_box_ClaimProcessing.visible = 1 == P.task.claimMntStatus)
        }
        updateAchievementRed() {
            var t = 2 != this.m_kind && P.task.checkAchievementReceiveReward();
            this.m_img_Red.visible = t
        }
        updateTask() {
            this.m_totalFish = P.task.taskFish,
            this.m_txt_Fish.text = P.task.taskFish.toLocaleString(),
            this.m_box_Task.destroyChildren(),
            this.m_box_Achievement.destroyChildren(),
            Laya.timer.once(100, this, this.createTask),
            Laya.timer.once(200, this, this.createAchievement)
        }
        createTask() {
            let t = []
              , e = []
              , i = (P.task.checkBasicTaskAllCompleted() ? (t.push({
                type: Yt.Basic,
                tasks: P.task.basicTasks
            }),
            e.push({
                type: Yt.Daily,
                tasks: P.task.dailyTasks
            })) : e.push({
                type: Yt.Basic,
                tasks: P.task.basicTasks
            }, {
                type: Yt.Daily,
                tasks: P.task.dailyTasks
            }),
            (P.task.checkTwitterTaskAllCompleted() ? t : e).push({
                type: Yt.Twitter,
                tasks: P.task.twitterTasks
            }),
            (P.task.checkPremiumTaskAllCompleted() ? t : e).push({
                type: Yt.Premium,
                tasks: P.task.premiumTasks
            }),
            e.concat(t).reverse())
              , s = ()=>{
                var t, e;
                this.destroyed || (e = i.pop()) && (t = e.type,
                (e = e.tasks).length ? _(Pi, {
                    params: [t, e]
                }).then(t=>{
                    this.m_box_Task.addChild(t),
                    s()
                }
                ) : s())
            }
            ;
            s()
        }
        createAchievement() {
            let i = [{
                type: Xt.Recharge,
                achievements: P.task.rechargeAchievements
            }, {
                type: Xt.Signin,
                achievements: P.task.signinAchievements
            }]
              , s = ()=>{
                var t, e;
                this.destroyed || ((e = i.pop()) ? (t = e.type,
                (e = e.achievements).length ? _(Ui, {
                    params: [t, e]
                }).then(t=>{
                    this.m_box_Achievement.addChild(t),
                    s()
                }
                ) : s()) : (P.task.normalInviteAchievements.length || P.task.premiumInvitAchievements.length) && _(Fi, {
                    params: [P.task.normalInviteAchievements, P.task.premiumInvitAchievements]
                }).then(t=>{
                    this.m_box_Achievement.addChild(t)
                }
                ))
            }
            ;
            s()
        }
        playScore(e) {
            if (!(e <= 0)) {
                let t = 10;
                800 <= e ? (this.m_avgFish = Math.floor(e / 60),
                t = 40) : 400 <= e ? (this.m_avgFish = Math.floor(e / 50),
                t = 36) : 200 <= e ? (this.m_avgFish = Math.floor(e / 40),
                t = 32) : 100 <= e ? (this.m_avgFish = Math.floor(e / 30),
                t = 28) : 50 <= e ? (this.m_avgFish = Math.floor(e / 20),
                t = 24) : 20 <= e ? (this.m_avgFish = Math.floor(e / 10),
                t = 20) : 10 <= e ? (this.m_avgFish = Math.floor(e / 5),
                t = 16) : this.m_avgFish = 1,
                this.playFishAni(t, Laya.Handler.create(this, ()=>{
                    this.m_showFish = this.m_totalFish,
                    this.m_totalFish += e,
                    Laya.timer.loop(30, this, this.loopFish)
                }
                ))
            }
        }
        playFishAni(e, i) {
            var s = [.3 * 1.5, .75, .6 * 1.5, .75];
            let a = Laya.Point.create().setTo(0, 0)
              , n = Laya.Point.create().setTo(0, 0);
            this.m_img_Head.localToGlobal(a, !1, this),
            a.x += .5 * this.m_img_Head.width,
            a.y += this.m_img_Head.height,
            this.m_img_Fish.localToGlobal(n, !1, this),
            n.x += .5 * this.m_img_Fish.width,
            n.y += .5 * this.m_img_Fish.height;
            for (let t = 0; t < e; t++) {
                var o = .1 * Math.randRange(8, 10)
                  , o = [150, 600 * o, 400 * o];
                let t = new Laya.Image
                  , e = (t.zOrder = 1e3,
                t.anchorX = t.anchorY = .5,
                t.scale(s[0], s[0]),
                t.skin = "cat/ui_task/icon_fish.png",
                t.pos(a.x, a.y),
                this.addChild(t),
                new Laya.TimeLine);
                e.to(t, {
                    scaleX: s[1],
                    scaleY: s[1]
                }, o[0]).to(t, {
                    y: t.y - Math.randRange(0, 100),
                    x: t.x + Math.randRange(-100, 100),
                    scaleX: s[2],
                    scaleY: s[2]
                }, o[1], Laya.Ease.circOut).to(t, {
                    x: n.x,
                    y: n.y,
                    scaleX: s[3],
                    scaleY: s[3]
                }, o[2], null),
                e.once(Laya.Event.COMPLETE, null, ()=>{
                    e.destroy(),
                    t.destroy(),
                    i && i.run()
                }
                ),
                e.play(0, !1)
            }
        }
        loopFish() {
            this.m_showFish += this.m_avgFish,
            this.m_showFish >= this.m_totalFish && (Laya.timer.clear(this, this.loopFish),
            this.m_showFish = this.m_totalFish),
            this.m_txt_Fish.text = this.m_showFish.toLocaleString()
        }
        onClickMenu(t) {
            this.m_box_Account.visible = !0
        }
        onClickAccount(t) {
            this.m_box_Account.visible = !1
        }
        onClickWallet(t) {
            P.wallet.connected ? ut({
                button: s.Yes,
                msg: "Are you sure you want to disconnect the wallet?",
                okTxt: "Confirm"
            }).then(t=>{
                t.type == h.Yes && P.wallet.disconnect()
            }
            ) : P.wallet.connect()
        }
        onClickTwitter(t) {
            P.task.twitterName ? ut({
                button: s.Yes,
                msg: "Are you sure you want to disconnect the x account?",
                okTxt: "Confirm"
            }).then(t=>{
                t.type == h.Yes && P.task.reqRevokeTwitter()
            }
            ) : (this.stopLoopCheckTwitter(),
            P.task.reqCheckTwitterStatus().then(t=>{
                0 == t.status ? t.url && (P.event(y.START_CHECK_TWITTER),
                window.mbplatform.openLink(t.url)) : 2 == t.status && ut({
                    button: s.Yes,
                    msg: "This Twitter account is already linked to another account.",
                    okTxt: "OK"
                })
            }
            ))
        }
        onClickClaim(t) {
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && (Laya.Browser.onMobile ? d(fe, {
                showEffect: !1,
                retainPopup: !0
            }).then(t=>{
                t.wait().then(t=>{
                    t.type == h.Yes && P.wallet.signMessage(t.data).then(t=>{
                        this.reportClaimMntSignMessage(t.address, t.message)
                    }
                    )
                }
                )
            }
            ) : P.wallet.connected ? P.wallet.signMessage().then(t=>{
                this.reportClaimMntSignMessage(t.address, t.message)
            }
            ) : P.wallet.connect().then(t=>{
                P.wallet.signMessage().then(t=>{
                    this.reportClaimMntSignMessage(t.address, t.message)
                }
                )
            }
            ))
        }
        onClickBasic(t) {
            this.switchTabMenu(1)
        }
        onClickAchievement(t) {
            this.switchTabMenu(2)
        }
        switchTabMenu(t) {
            this.m_kind != t && (this.m_kind = t,
            Laya.Tween.to(this.m_img_Tab, {
                x: 1 == t ? 5 : 224
            }, 200),
            this.m_pan_Task.visible = 1 == t,
            this.m_pan_Achievement.visible = 2 == t,
            this.updateAchievementRed())
        }
        startLoopCheckTwitter() {
            this.stopLoopCheckTwitter(),
            this.m_loopCheckTwitterFlag = !0,
            this.startCheckTwitterTimer(6e3)
        }
        stopLoopCheckTwitter() {
            this.m_loopCheckTwitterFlag = !1,
            this.m_loopCheckTwitterCount = 0,
            Laya.timer.clear(this, this.loopCheckTwitter)
        }
        startCheckTwitterTimer(t=3e3) {
            this.m_loopCheckTwitterFlag && (this.m_loopCheckTwitterCount++,
            20 < this.m_loopCheckTwitterCount ? this.stopLoopCheckTwitter() : Laya.timer.once(t, this, this.loopCheckTwitter))
        }
        loopCheckTwitter() {
            P.task.reqCheckTwitterStatus(!1).then(t=>{
                if (0 != t.status)
                    return 1 == t.status ? (this.stopLoopCheckTwitter(),
                    void ut({
                        button: s.Yes,
                        msg: "Twitter connect successful.",
                        okTxt: "OK"
                    })) : void (2 == t.status && (ut({
                        button: s.Yes,
                        msg: "This Twitter account is already linked to another account.",
                        okTxt: "OK"
                    }),
                    this.stopLoopCheckTwitter()));
                this.startCheckTwitterTimer()
            }
            ).catch(()=>{
                this.startCheckTwitterTimer()
            }
            )
        }
        reportClaimMntSignMessage(t, e) {
            P.task.reqClaimMntSignMessage(t, e).then(t=>{
                t && (this.updateClaimMntStatus(),
                this.m_checkClaimMntNum = 0,
                this.startCheckClaimMntStatus())
            }
            ).catch(t=>{
                32 == t.code && ut({
                    button: s.Yes,
                    msg: "Sorry, this wallet address has already claimed gas. Please switch wallets and try again!"
                })
            }
            )
        }
        startCheckClaimMntStatus() {
            if (this.m_checkClaimMntNum++,
            3 < this.m_checkClaimMntNum)
                return this.m_checkClaimMntNum = 0,
                void Laya.timer.clear(this, this.delayCheckClaimMntStatus);
            Laya.timer.clear(this, this.delayCheckClaimMntStatus),
            Laya.timer.once(2e4, this, this.delayCheckClaimMntStatus)
        }
        delayCheckClaimMntStatus() {
            P.task.reqCheckCalimMntStatus(!1).then(t=>{
                if (2 == t)
                    return this.updateClaimMntStatus(),
                    void ut({
                        button: s.Yes,
                        msg: "Claim 0.05 MNT successfully!"
                    });
                this.startCheckClaimMntStatus()
            }
            ).catch(()=>{
                this.startCheckClaimMntStatus()
            }
            )
        }
    }
    L([A(y.WALLET_CONNECTED), A(y.WALLET_DISCONNECT)], Bi.prototype, "updateWalletConnect", null),
    L([A(y.UPDATE_TWITTER_STATUS)], Bi.prototype, "updateTwitterConnect", null),
    L([A(y.TASK_UPDATE_ACHIEVEMENT)], Bi.prototype, "updateAchievementRed", null),
    L([A(y.TASK_UPDATE_LIST)], Bi.prototype, "updateTask", null),
    L([A(y.TASK_PLAY_SCORE)], Bi.prototype, "playScore", null),
    L([A(y.START_CHECK_TWITTER)], Bi.prototype, "startLoopCheckTwitter", null);
    class Gi extends t.cat.views.home.AutoPlusDlgUI {
        onAwake() {
            super.onAwake(),
            I.exdata.autoMerge ? (this.m_rg_Gift.selected = S.get(S.s_autoPlusGift),
            this.m_rg_Gold.selected = S.get(S.s_autoPlusGold)) : (this.m_rg_Gift.selected = !0,
            this.m_rg_Gold.selected = !0)
        }
        onClickConfirm() {
            this.closeDialog()
        }
        onClickGold() {
            var t = this.m_rg_Gold.selected;
            S.set(S.s_autoPlusGold, t)
        }
        onClickGift() {
            var t = this.m_rg_Gift.selected;
            S.set(S.s_autoPlusGift, t)
        }
    }
    class Oi extends t.cat.views.recharge.DailyBackGiftDlgUI {
        constructor() {
            super()
        }
        onAwake() {
            super.onAwake(),
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE ? this.m_img_Chain.skin = "cat/ui_comm/mantle.png" : this.m_img_Chain.skin = "cat/ui_comm/ton.png",
            this.showView()
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clearAll(this)
        }
        showView() {
            Laya.timer.clear(this, this.delayUnlockChainOperate),
            Laya.timer.clear(this, this.endChainConfirm),
            this.m_tick && this.m_tick.dispose();
            var t, e = S.get(S.s_signInDayGift) || 0;
            let i = 0;
            if (e && (e = e + 4e4,
            t = (new Date).getTime(),
            i = e - t),
            0 < i)
                return this.playWait(),
                void Laya.timer.once(i, this, this.endChainConfirm);
            this.stopWait(),
            S.removeItem(S.s_signInSpeedOrderTime);
            let s = R.create({
                url: "cat/spine/claimpack.json",
                parent: this.m_box_Con,
                px: 50,
                py: 180
            });
            s.play(0, !0)
        }
        onClickChain() {
            S.set(S.s_signInDayGiftLastTime, Date.newDate().getTime()),
            I.BCCheckIn(St.dayGoods).then(t=>{
                if (this.m_payData = t.payData,
                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_LOCAL)
                    return this.closeDialog(),
                    void u(k(1));
                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile || P.wallet.connected ? this.sendTransaction() : this.connectWallet()
            }
            )
        }
        connectWallet() {
            P.wallet.connect().then(t=>{
                this.destroyed || Laya.timer.once(500, this, ()=>{
                    this.sendTransaction()
                }
                )
            }
            )
        }
        sendTransaction() {
            if (this.m_payData) {
                let e = {
                    amount: 8e6,
                    address: this.m_payData.walletAddress,
                    payload: this.m_payData.payload,
                    transactionType: Ht.gameSignin
                }
                  , i = ()=>{
                    P.wallet.sendTransaction(e).then(t=>{
                        I.updateBCCheckIn(St.dayGoods, this.m_payData, t);
                        t = (new Date).getTime();
                        S.set(S.s_signInDayGift, t),
                        this.closeDialog(),
                        u(k(1)),
                        P.event(y.CHANGE_CHARGE_CHAIN_GIFT)
                    }
                    ).catch(t=>{
                        this.unlockChainOperate(),
                        S.removeItem(S.s_signInDayGift),
                        P.event(y.CHANGE_CHARGE_CHAIN_GIFT),
                        t && t.code == oe.insufficientFunds && u("Insufficient gas")
                    }
                    )
                }
                ;
                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile ? d(fe, {
                    showEffect: !1,
                    retainPopup: !0
                }).then(t=>{
                    t.wait().then(t=>{
                        t.type == h.Yes && (this.lockChainOperate(),
                        e.walletType = t.data,
                        i())
                    }
                    )
                }
                ) : (this.lockChainOperate(),
                i())
            }
        }
        showPayProcessing(t=100) {
            Laya.timer.once(t, this, ()=>{
                this.destroyed || d(ke, {
                    retainPopup: !0
                })
            }
            )
        }
        playWait() {
            this.m_btn_Chain.visible = !1,
            this.m_btn_Wait.visible = !0,
            this.ani1.play(0, !0)
        }
        stopWait() {
            this.m_btn_Chain.visible = !0,
            this.m_btn_Wait.visible = !1,
            this.ani1.stop()
        }
        endChainConfirm() {
            S.removeItem(S.s_signInDayGift),
            this.stopWait()
        }
        lockChainOperate() {
            this.playWait(),
            Laya.timer.once(4e4, this, this.delayUnlockChainOperate)
        }
        unlockChainOperate() {
            Laya.timer.clear(this, this.delayUnlockChainOperate),
            this.stopWait()
        }
        delayUnlockChainOperate() {
            this.stopWait()
        }
    }
    class M extends t.cat.views.home.OfficeDlgUI {
        constructor() {
            super(...arguments),
            this.catSpines = [],
            this.m_spineRock = null,
            this.m_spineRandom = null,
            this.m_offLineShowed = !1,
            this.m_tableHelpChecked = !1,
            this.m_customScaleFlag = 50,
            this.m_speedScale = 4,
            this.m_speedFlag = !1,
            this.m_isCustoming = !1,
            this.m_isCustoming2 = !1,
            this.customingCatSpines = [],
            this.m_speedCustomNum = 0,
            this.m_speedTemp = [],
            this.m_speedPeople = [],
            this.m_airDrops = {},
            this.m_mouseCat = -1,
            this.m_checkTime = 0,
            this.m_flag = 0
        }
        onAwake() {
            super.onAwake(),
            this.hitTestPrior = !1,
            this.updateBg(),
            Laya.timer.clearAll(this),
            this.checkNew();
            var t = +Data.gameConf.turnTableCfg.isOpen;
            if (t) {
                let t = R.create({
                    url: "cat/spine/spin.json",
                    parent: this.m_btn_Table,
                    px: 50,
                    py: 50
                });
                t.play(0, !0)
            }
            this.checkOpenMenu(),
            this.checkFreeBoostRed(),
            this.updateView(),
            this.updateOutPut(),
            this.updateGold(),
            this.updateShopRed(),
            this.checkReChargeRed(),
            this.checkTaskRed(),
            this.checkSoundImgShow(),
            this.updateRechargeShow(),
            t ? this.checkTableHelp() : this.checkOffLine(),
            this.checkGoldRain(),
            I.checkRandomBox(),
            this.updateAuto(),
            this.checkCustom(),
            this.checkInviteDouble(),
            this.checkGiftShow(),
            this.checkImgEarnShow(),
            this.checkLink(),
            Laya.timer.loop(2e3, this, this.checkCreateTip),
            Laya.timer.loop(5e3, this, this.checkFreeCat);
            t = Mmobay.adaptOffsetWidth;
            this.m_box_Squad.x = 270 + t / 3,
            this.m_btn_ReCharge.x = .5 - t / 2 * (2 / 3),
            this.m_btn_Earn.x = 94 - t / 2 * (1 / 3),
            this.m_btn_Shop.x = 370 + t / 2 * (1 / 3),
            this.m_btn_Invite.x = 462 + t / 2 * (2 / 3),
            D.instance.playMusic("BGM_Cafe.mp3"),
            this.m_box_Rank.on(Laya.Event.CLICK, this, ()=>{
                this.onClickRank()
            }
            );
            for (let e = 0; e < P.cat.allcats.length; e++) {
                let t = P.cat.allcats[e];
                t && Laya.timer.frameOnce(e % 2 + 1, this, ()=>{
                    this.createIndexCat(e, t)
                }
                )
            }
            Laya.timer.frameLoop(2, this, ()=>{
                for (let e = 0; e < this.m_box_Con.numChildren; e++) {
                    let t = this.m_box_Con.getChildAt(e);
                    "people" == t.name && (this.m_isCustoming2,
                    t.zOrder = t.y),
                    t && (t.zOrder = t.y)
                }
            }
            ),
            Laya.timer.once(1e4, this, this.findCustomCat),
            this.updateClubShow(),
            this.updateRankShow(),
            this.updateSpeed(),
            Laya.timer.once(2e3, this, ()=>{
                this.checkCatSpeed()
            }
            ),
            this.on(Laya.Event.MOUSE_DOWN, this, this.clearSumTip),
            Laya.timer.loop(5e3, this, this.checkSum),
            Laya.timer.loop(5e3, this, this.checkShowRandomEvent),
            P.cat.isAuto && Laya.timer.frameOnce(12, this, ()=>{
                this.buyAuto()
            }
            );
            let e = R.create({
                url: "cat/spine/invite.json",
                parent: this.m_btn_Invite,
                px: 50,
                py: 25,
                zOrder: -1
            });
            e.play(0, !0)
        }
        updateBg(t) {
            let e = P.club.getLeagueByScore(+I.rankGold);
            if (5 <= (e = (e = t ? t : e) < 0 ? 6 : e)) {
                this.m_img_Wall.skin = `cat/ui_bg/wall${e + 1}.png`,
                this.m_img_Hall.skin = `cat/ui_bg/office${e + 1}.png`,
                this.m_img_Bg.skin = `cat/ui_bg/office${e + 1}_1.png`,
                this.m_img_Door.visible = this.m_img_Door2.visible = !1;
                let t = this["rank" + e];
                t.play(0, !1)
            } else
                this.m_img_Wall.skin = "cat/ui_bg/wall1.png",
                this.m_img_Hall.skin = "cat/ui_bg/office1.png",
                this.m_img_Bg.skin = "cat/ui_bg/office1_1.png",
                this.m_img_Door.visible = this.m_img_Door2.visible = !0,
                this.rank1.play(0, !1)
        }
        checkLink() {
            var t = I.releaseLink();
            let e = [p.TaskMain, p.TaskAchievement, p.ConnectWalletForTaskSignIn, p.CheckOrderForTaskSignIn];
            -1 != e.indexOf(t) ? Bi.init(t) : t == p.FishRecharge || t == p.ConnectWalletForBuyFishRecharge ? d(Te) : t == p.ConnectWalletForClubRecharge ? this.onClickSquad() : t == p.ConnectWalletForSignInSpeed || t == p.CheckOrderForSignInSpeed ? d(Ge) : t == p.ConnectWalletForFirstRecharge ? d(Ae) : p.Launchpool
        }
        checkCreateTip() {
            this.checkImgEarnShow(),
            4 <= P.cat.getMyLv() || this.m_finger && this.m_finger.visible ? Laya.timer.clear(this, this.checkCreateTip) : I.gold < P.cat.getNowPrice() || this.m_btn_Delete.visible ? this.m_finger && (this.m_finger.visible = !1) : this.getSumIndex().length || (this.m_finger ? this.m_finger.visible = !0 : _(ei, {
                params: []
            }).then(t=>{
                this.addChild(t),
                t.centerX = +t.width / 2,
                (this.m_finger = t).y = this.m_btn_Generate.y + t.height - 67
            }
            ))
        }
        clearSumTip() {
            this.m_img_SumTip.visible = !1,
            Laya.Tween.clearAll(this.m_img_SumTip),
            Laya.timer.loop(5e3, this, this.checkSum)
        }
        checkOffLine() {
            P.cat.goldMute || (I.offLine ? (n.instance.removeAllPopup(),
            d(ti, {
                params: [I.offLine]
            }).then(t=>{
                t.wait().then(()=>{
                    this.m_offLineShowed = !0,
                    this.checkGiftEvent()
                }
                )
            }
            ),
            I.offLine = null) : (this.m_offLineShowed = !0,
            this.checkGiftEvent()))
        }
        checkGiftEvent() {
            var t = +Data.gameConf.goodsCfg.goodsDayEndTime
              , e = +Data.gameConf.goodsCfg.goodsDayMaxNum
              , i = Date.newDate().getTime()
              , s = I.exdata.dayGoodsNum
              , a = I.exdata.dayGoodsTime
              , n = I.getCountByType(Dt.dayGoods)
              , o = P.cat.getMyLv();
            18e4 < i - S.get(S.s_signInDayGiftLastTime) && 4 <= o && i <= 1e3 * t && n < 1 && (s < e || a < t) ? d(Oi) : this.checkShowRandomEvent(!0)
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clearAll(this)
        }
        updateGold() {
            this.m_txt_Gold.text = f(I.gold),
            this.updateCoinBgSize()
        }
        updateCoinBgSize() {
            this.m_img_SpeedBg.width = this.m_txt_Speed.width + 22;
            let t = Math.max(this.m_txt_Gold.width, 93) + 32;
            Laya.timer.callLater(this, ()=>{
                this.m_img_CoinBg.width = this.m_img_SpeedBg.width + 10 + t + 10 + 50 + 25,
                this.m_box_SpeedBox.width = this.m_img_SpeedBg.width,
                Laya.timer.callLater(this, ()=>{
                    this.m_box_Plus.x = this.m_img_CoinBg.x + this.m_txt_Gold.x + this.m_txt_Gold.width + 2
                }
                )
            }
            )
        }
        updateOutPut(t=!1) {
            this.checkGiftShow(),
            -1 == this.m_mouseCat && this.checkOpenMenu(),
            t || (t = P.cat.nowGenerateCat,
            this.m_txt_Lv.text = t + "",
            !this.m_nowCatSpine || this.m_nowCatSpine.destroyed ? (this.m_nowCatSpine = R.create({
                url: "cat/spine/" + Data.getCat(t).showId + ".json",
                parent: this,
                px: 75,
                py: 60,
                scale: .7,
                autoRemove: !1,
                alpha: 1
            }),
            P.cat.playCat(this.m_nowCatSpine, "squat idle"),
            this.m_btn_Generate.addChildAt(this.m_nowCatSpine, 0)) : +this.m_nowCatSpine.name != t && (this.m_nowCatSpine.destroy(),
            this.m_nowCatSpine = R.create({
                url: "cat/spine/" + Data.getCat(t).showId + ".json",
                parent: this,
                px: 75,
                py: 64,
                scale: .7,
                autoRemove: !1,
                alpha: 1
            }),
            P.cat.playCat(this.m_nowCatSpine, "squat idle"),
            this.m_btn_Generate.addChildAt(this.m_nowCatSpine, 1)),
            this.m_txt_Price.text = f(P.cat.getNowPrice()) + "",
            this.m_txt_Speed.text = f(P.cat.getOutPutSpeed()) + "/s",
            this.m_img_SpeedAdd.visible = 0 < P.cat.getSpeedAdd() - 1,
            this.m_txt_SpeedAdd.text = "+" + 100 * (P.cat.getSpeedAdd() - 1) + "%",
            Laya.timer.callLater(this, ()=>{
                this.destroyed || (this.m_img_SpeedAdd.width = this.m_txt_SpeedAdd.width + 20)
            }
            ),
            this.updateCoinBgSize())
        }
        onClickPlus() {
            m(Le).then(t=>{
                t.wait().then(()=>{
                    this.destroyed || this.checkGoldRain()
                }
                )
            }
            )
        }
        updateView() {
            this.updateCat()
        }
        updateCat() {
            this.m_lst_Cat.array = P.cat.getCats()
        }
        checkShowRandomEvent(t=!1) {
            if (this.m_offLineShowed) {
                var e = I.randomEvent
                  , i = P.cat.getMyLv()
                  , i = Data.getRandomEvent(i)
                  , s = Date.newDate().getTime()
                  , a = e && 1e3 * +e.time || 0;
                if (i)
                    if (this.m_spineRandom)
                        t && this.m_spineRandom.event(Laya.Event.CLICK, [null, !0]);
                    else if (e) {
                        if (e.isDone && s - a > 1e3 * i.interval)
                            I.reqRandomEvent().then(()=>{
                                this.checkShowRandomEvent(t)
                            }
                            );
                        else if (!e.isDone)
                            if (!e.isDone && s - a > 1e3 * i.interval + 1e3)
                                I.reqRandomEvent().then(()=>{
                                    this.checkShowRandomEvent(t)
                                }
                                );
                            else if (t || e.isDone || !(s - a > 1e3 * +Data.gameConf.randomEventCfg.disappearTime)) {
                                let i = ["duck", "pepe", "doge"][Math.randRange(0, 2)]
                                  , e = R.create({
                                    url: "cat/spine/" + i + ".json",
                                    px: Math.randRange(50, 500),
                                    py: Math.randRange(40, 400),
                                    scale: .6,
                                    autoPlay: !0,
                                    autoRemove: !1,
                                    alpha: 1,
                                    zOrder: 1,
                                    offset: [-50, -200]
                                });
                                this.m_box_Con.addChild(e),
                                (this.m_spineRandom = e).size(200, 300),
                                e.pivot(100, 250),
                                e.on(Laya.Event.CLICK, this, (t,e=!1)=>{
                                    P.cat.goldMute || (this.clearRandomSpine(),
                                    Laya.timer.clear(this, this.checkShowRandomEvent),
                                    d(ii, {
                                        params: [i, null, e]
                                    }).then(t=>{
                                        t.wait().then(t=>{
                                            t.type != h.No && t.type != h.None || ii.ChainFlag || I.reqGetRandomEventAward(Pt.close),
                                            Laya.timer.loop(5e3, this, this.checkShowRandomEvent)
                                        }
                                        )
                                    }
                                    ))
                                }
                                ),
                                this.doRandomSpineAni(),
                                Laya.timer.once(1e4, this, ()=>{
                                    _(ei, {
                                        params: []
                                    }).then(t=>{
                                        e.destroyed ? t.destroy() : (e.addChild(t),
                                        t.centerX = +t.width / 2,
                                        t.y = 150)
                                    }
                                    )
                                }
                                ),
                                t && e.event(Laya.Event.CLICK, [null, !0])
                            }
                    } else
                        I.reqRandomEvent().then(()=>{
                            this.checkShowRandomEvent(t)
                        }
                        )
            }
        }
        doRandomSpineAni() {
            let r = this.m_spineRandom;
            if (r) {
                let n = I.randomEvent;
                var i = Date.newDate().getTime()
                  , s = n && 1e3 * +n.time || 0;
                let o = !1
                  , t = (!n.isDone && i - s > 1e3 * +Data.gameConf.randomEventCfg.disappearTime && (o = !0),
                0)
                  , e = 0;
                e = (t = o ? .5 < Math.random() ? Math.randRange(-80, -20) : Math.randRange(580, 640) : Math.randRange(50, 520),
                Math.randRange(50, 400)),
                t > r.x ? r.scaleX = -1 * Math.abs(r.scaleX) : r.scaleX = +Math.abs(r.scaleX),
                r.play(0, !0);
                i = Kt(t, e, r.x, r.y);
                Laya.Tween.to(r, {
                    x: t,
                    y: e
                }, i / .1 * 2 / (this.m_speedFlag ? this.m_speedScale : 1), null, Laya.Handler.create(this, t=>{
                    if (o) {
                        if (P.cat.isAuto) {
                            var e = I.fishCoin >= +Data.gameConf.randomEventCfg.costFish
                              , i = S.get(S.s_autoPlusGift)
                              , s = S.get(S.s_autoPlusGold)
                              , a = n.type;
                            let t = !1;
                            e && (a == Ut.multiple ? s && (t = !0) : i && (t = !0)),
                            t ? I.reqGetRandomEventAward(Pt.fishCoin) : I.reqGetRandomEventAward(Pt.free)
                        }
                        this.clearRandomSpine()
                    } else
                        r.play(1, !1, Laya.Handler.create(this, ()=>{
                            this.doRandomSpineAni()
                        }
                        ))
                }
                ))
            }
        }
        clearRandomSpine() {
            this.m_spineRandom && (Laya.Tween.clearAll(this.m_spineRandom),
            this.m_spineRandom.destroy(),
            this.m_spineRandom = null)
        }
        onClickFish() {
            m(Le).then(t=>{
                t.wait().then(()=>{
                    this.destroyed || this.checkGoldRain()
                }
                )
            }
            )
        }
        updateRechargeShow() {}
        onClickReCharge() {
            d(I.checkFirstReCharge() ? Te : Ae)
        }
        onClickSquad() {
            P.club.clubInfo ? m(Xe, {
                params: [P.club.clubInfo.id]
            }) : m($e)
        }
        onClickGenerate() {
            let e = -1;
            for (let t = 0; t < 12; t++)
                if (!P.cat.allcats[t]) {
                    e = t;
                    break
                }
            if (-1 == e)
                return u(k(1027));
            I.gold < P.cat.getCatCost(P.cat.nowGenerateCat) ? P.cat.showVkittyGainWay() : P.cat.reqCreate()
        }
        refreshOutPut() {
            this.aniOutChange.play(0, !1),
            this.m_txt_Speed.text = f(P.cat.getOutPutSpeed()) + "/s",
            this.m_img_SpeedAdd.visible = 0 < P.cat.getSpeedAdd() - 1,
            this.m_txt_SpeedAdd.text = "+" + 100 * (P.cat.getSpeedAdd() - 1) + "%",
            Laya.timer.callLater(this, ()=>{
                this.destroyed || (this.m_img_SpeedAdd.width = this.m_txt_SpeedAdd.width + 20)
            }
            ),
            this.updateCoinBgSize()
        }
        buyCat(t) {
            this.m_finger && (this.m_finger.visible = !1),
            Laya.timer.loop(2e3, this, this.checkCreateTip),
            this.m_lst_Cat.changeItem(t.index, t.catLvl),
            this.createIndexCat(t.index, t.catLvl),
            this.m_txt_Price.text = f(P.cat.getNowPrice()) + ""
        }
        createIndexCat(t, e=P.cat.nowGenerateCat) {
            this.m_lst_Cat.changeItem(t, e),
            this.catSpines[t] && (this.catSpines[t].destroy(),
            this.catSpines[t] = null);
            let i = .6;
            var s = Data.getCat(e)
              , s = +s.oldShowId || +s.showId;
            200 <= s ? i = .66 : s < 100 && (i = .55);
            let a = this.catSpines[t] = R.create({
                url: "cat/spine/" + Data.getCat(e).showId + ".json",
                px: Math.randRange(50, 500),
                py: Math.randRange(40, 400),
                scale: i,
                autoPlay: !0,
                autoRemove: !1,
                alpha: 1,
                zOrder: 1
            });
            this.m_box_Con.addChild(a),
            a.name = e + "",
            !a.skeleton || a.destroyed ? a._templet.once(Laya.Event.COMPLETE, this, ()=>{
                this.catAniStep(Math.floor(4 * Math.random()), a, t)
            }
            ) : this.catAniStep(Math.floor(4 * Math.random()), a, t)
        }
        catAniStep(e, i, s) {
            if (!i.destroyed && i._templet)
                if (this.m_isCustoming)
                    P.cat.playCat(i, "squat idle");
                else {
                    i._index = -1;
                    let t = 0;
                    switch (e) {
                    case 0:
                        t = i.getAniIndexByName("pose"),
                        .5 < Math.random() ? i.play(t, !1, Laya.Handler.create(this, ()=>{
                            this.catAniStep(1, i, s)
                        }
                        )) : this.catAniStep(1, i, s);
                        break;
                    case 1:
                        0 < Math.random() ? (t = i.getAniIndexByName("tongue"),
                        i.play(t, !1, Laya.Handler.create(this, ()=>{
                            this.catAniStep(2, i, s)
                        }
                        ))) : (t = i.getAniIndexByName("squat"),
                        i.play(t, !1, Laya.Handler.create(this, ()=>{
                            t = .5 < Math.random() ? i.getAniIndexByName("squat idle") : i.getAniIndexByName("squat idle2"),
                            i.play(t, !1, Laya.Handler.create(this, ()=>{
                                this.catAniStep(2, i, s)
                            }
                            ))
                        }
                        )));
                        break;
                    case 2:
                        var a = [["stretch"], ["walk"], ["walk"], ["walk"], ["run"], ["run"], ["break"], ["walk", "fall", "fall idle"], ["walk", "sleep", "stretch"], ["walk", "hungry", "stretch"], ["run", "fall", "fall idle"], ["fall", "run"]]
                          , a = a[Math.randRange(0, a.length - 1)];
                        this.catAniStepEx(i, a, 0, s);
                        break;
                    case 3:
                        .5 < Math.random() ? (t = i.getAniIndexByName("tongue"),
                        i.play(t, !1, Laya.Handler.create(this, ()=>{
                            this.catAniStep(0, i, s)
                        }
                        ))) : (t = i.getAniIndexByName("squat"),
                        i.play(t, !1, Laya.Handler.create(this, ()=>{
                            t = .5 < Math.random() ? i.getAniIndexByName("squat idle") : i.getAniIndexByName("squat idle2"),
                            i.play(t, !1, Laya.Handler.create(this, ()=>{
                                this.catAniStep(0, i, s)
                            }
                            ))
                        }
                        )))
                    }
                }
        }
        catAniStepEx(e, i, s, a) {
            if (this.m_isCustoming)
                P.cat.playCat(e, "squat idle");
            else if (i[s])
                if (e._index = -1,
                "run" == i[s] || "walk" == i[s]) {
                    var n = this.doCatMovePos(e)
                      , o = Kt(n.x, n.y, e.x, e.y);
                    let t = 0;
                    t = "run" == i[s] ? o / .2 * 2 : o / .1 * 2,
                    n.x > e.x ? e.scaleX = -1 * Math.abs(e.scaleX) : e.scaleX = +Math.abs(e.scaleX);
                    o = e.getAniIndexByName(i[s]);
                    e.play(o, !0),
                    s++,
                    Laya.Tween.to(e, {
                        x: n.x,
                        y: n.y
                    }, t / (this.m_speedFlag ? this.m_speedScale : 1), null, Laya.Handler.create(this, t=>{
                        this.catAniStepEx(e, i, t, a)
                    }
                    , [s]))
                } else {
                    o = e.getAniIndexByName(i[s]);
                    "sleep" == i[s] || "hungry" == i[s] ? (Laya.timer.once(3e3, e, ()=>{
                        e && !e.destroyed && (s++,
                        this.catAniStepEx(e, i, s, a))
                    }
                    ),
                    e.play(o, !0)) : e.play(o, !1, Laya.Handler.create(this, ()=>{
                        s++,
                        this.catAniStepEx(e, i, s, a)
                    }
                    ))
                }
            else
                this.catAniStep(3, e, a)
        }
        doCatMovePos(t) {
            let e = {
                x: 0,
                y: 0
            };
            return e.x = Math.randRange(50, 520),
            e.y = Math.randRange(50, 400),
            e
        }
        onClickSpeed() {
            d(Ge).then(t=>{
                t.wait().then(()=>{
                    this.checkFreeBoostRed()
                }
                )
            }
            )
        }
        onClickMine() {
            m(ui)
        }
        updateSpeed() {
            P.cat.checkIsBoost() ? this.ani13.play(0, !0) : this.ani13.stop(),
            this.checkCatSpeed()
        }
        checkCatSpeed() {
            for (var t of this.catSpines)
                t && t._skeleton && t._skeleton.playbackRate(P.cat.checkIsBoost() ? this.m_speedScale : 1)
        }
        onClickShop() {
            d(Ee)
        }
        moveCat(i) {
            if (!this.destroyed) {
                let t = .5;
                var s, a = Data.getCat(i.catId);
                210 < a.id ? (s = +a.oldShowId,
                t = 200 <= s ? .5 : 100 <= s ? .45 : .38) : 200 <= +a.showId && (t = .4),
                this.m_tempCat = R.create({
                    url: "cat/spine/" + a.showId + ".json",
                    parent: this.m_box_Temp,
                    px: 70,
                    py: 130,
                    scale: t,
                    autoPlay: !1,
                    autoRemove: !1,
                    alpha: 1
                }),
                !this.m_tempCat.skeleton || this.m_tempCat.destroyed ? this.m_tempCat._templet.once(Laya.Event.COMPLETE, this, ()=>{
                    P.cat.playCat(this.m_tempCat, "walk")
                }
                ) : P.cat.playCat(this.m_tempCat, "walk");
                let e = this.m_lst_Cat.getCell(i.index);
                this.m_lst_Cat.once(Laya.Event.MOUSE_DOWN, this, t=>{
                    !P.cat.airDropMap[i.index] && P.cat.allcats[i.index] && (P.lunch.checkCatLunch(i.index) ? 0 == P.lunch.m_lunchs.length ? P.lunch.reqLunchList().then(()=>{
                        d(li, {
                            params: [P.lunch.getLunchById(P.lunch.stakeCats[i.index].launchId)]
                        })
                    }
                    ) : d(li, {
                        params: [P.lunch.getLunchById(P.lunch.stakeCats[i.index].launchId)]
                    }) : (this.m_mouseCat = i.index,
                    t = Laya.Point.TEMP.setTo(t.stageX, t.stageY),
                    t = this.m_lst_Cat.globalToLocal(t),
                    this.m_box_Temp.x = t.x,
                    this.m_box_Temp.y = t.y,
                    e.visible = !1,
                    this.m_box_Temp.visible = !0,
                    this.m_img_SumTip.visible = !1,
                    P.event(y.CAT_MATCH, i.catId),
                    this.showDelete(!0)))
                }
                ),
                this.m_lst_Cat.on(Laya.Event.MOUSE_MOVE, this, t=>{
                    t = Laya.Point.TEMP.setTo(t.stageX, t.stageY),
                    t = this.m_lst_Cat.globalToLocal(t);
                    this.m_box_Temp.x = t.x,
                    this.m_box_Temp.y = t.y
                }
                ),
                this.m_lst_Cat.once(Laya.Event.MOUSE_UP, this, t=>{
                    this.m_mouseCat = -1,
                    this.m_box_Temp.visible && (this.m_box_Temp.visible = !1),
                    this.m_tempCat && this.m_tempCat.destroy(),
                    this.m_tempCat = null,
                    this.m_lst_Cat.offAll(),
                    P.event(y.CAT_MATCH),
                    P.cat.airDropMap[i.index] || !P.cat.allcats[i.index] || P.lunch.checkCatLunch(i.index) ? this.showDelete(!1) : (e.visible = !0,
                    this.checkChangeCell(i, i.index, t),
                    this.checkDel(i.index))
                }
                ),
                this.m_lst_Cat.once(Laya.Event.MOUSE_OUT, this, ()=>{
                    this.m_mouseCat = -1,
                    this.m_box_Temp.visible && (this.m_box_Temp.visible = !1),
                    this.m_tempCat && this.m_tempCat.destroy(),
                    this.m_tempCat = null,
                    this.m_lst_Cat.offAll(),
                    P.event(y.CAT_MATCH),
                    this.showDelete(!1),
                    i && P.cat.allcats[i.index] && (e.visible = !0,
                    P.event(y.SHAKE_CAT, !0))
                }
                )
            }
        }
        checkDel(e) {
            this.mouseX > this.m_btn_Delete.x && this.mouseX < this.m_btn_Delete.width + this.m_btn_Delete.x && this.mouseY > this.m_btn_Delete.y && this.mouseY < this.m_btn_Delete.height + this.m_btn_Delete.y ? ut({
                button: s.YesNo,
                msg: k(1044)
            }).then(t=>{
                t.type == h.Yes && P.cat.allcats[e] ? P.cat.reqDelCat(e).then(()=>{
                    this.m_isCustoming ? this.customingCatSpines.push(this.catSpines[e]) : (this.catSpines[e]._templet.offAll(),
                    this.catSpines[e] && this.catSpines[e].destroy()),
                    this.catSpines[e] = null,
                    this.m_lst_Cat.changeItem(e, null);
                    let t = R.create({
                        url: "cat/spine/smoke.json",
                        parent: this,
                        px: this.m_btn_Delete.x + this.m_btn_Delete.width / 2,
                        py: this.m_btn_Delete.y,
                        autoRemove: !0
                    });
                    this.m_img_Del.visible = !1,
                    P.cat.goldMute || D.instance.playSound("Delete.mp3"),
                    t.play(0, !1),
                    this.showDelete(!1),
                    I.checkRandomBox()
                }
                ) : (this.m_img_Del.visible = !1,
                this.showDelete(!1))
            }
            ) : this.showDelete(!1)
        }
        showDelete(t) {
            (this.m_btn_Delete.visible = t) ? (this.ani5.play(0, !0),
            this.m_img_Del.visible = !0) : this.ani5.stop(),
            t ? this.m_btn_AutoSetting.visible = this.m_btn_Auto.visible = this.m_btn_Generate.visible = this.m_btn_ReCharge.visible = this.m_btn_Invite.visible = this.m_btn_Shop.visible = this.m_btn_Earn.visible = !1 : this.checkOpenMenu()
        }
        checkChangeCell(a, n, t) {
            if (Be("checkMouse", 500)) {
                var e = this.m_lst_Cat.cells;
                for (let s = 0; s < e.length; s++) {
                    let i = e[s];
                    if (1 != P.cat.airDropMap[s] && !P.lunch.checkCatLunch(s) && (s != n && i.hitTestPoint(t.stageX, t.stageY))) {
                        if (!i.dataSource || a.catId && i.dataSource != a.catId) {
                            this.m_lst_Cat.changeItem(n, i.dataSource),
                            this.m_lst_Cat.changeItem(s, a.catId),
                            P.cat.reqSwitch([n, s]).then(()=>{}
                            );
                            var o = this.catSpines[n];
                            this.catSpines[n] = this.catSpines[s],
                            this.catSpines[s] = o,
                            P.event(y.SHAKE_CAT, !0),
                            P.cat.allcats = this.m_lst_Cat.array
                        } else {
                            if (a.catId == Data.maxCats)
                                return;
                            let e = P.cat.getMyLv();
                            P.cat.reqSumCat([n, s]).then(t=>{
                                -1 != this.m_mouseCat && P.event(y.CAT_MATCH, [this.m_mouseCat]),
                                Laya.timer.loop(2e3, this, this.checkCreateTip),
                                e != P.cat.getMyLv() ? d(Oe, {
                                    params: [P.cat.getMyLv()]
                                }) : i.playSumAni(t[s]),
                                this.m_lst_Cat.changeItem(n, null),
                                this.m_isCustoming ? this.customingCatSpines.push(this.catSpines[s], this.catSpines[n]) : (this.catSpines[n] && (this.catSpines[n]._templet.offAll(),
                                this.catSpines[n].destroy()),
                                this.catSpines[s] && (this.catSpines[s]._templet.offAll(),
                                this.catSpines[s].destroy())),
                                this.catSpines[s] = null,
                                this.catSpines[n] = null,
                                this.createIndexCat(s, a.catId + 1),
                                i.dataSource = t[s],
                                this.m_lst_Cat.changeItem(s, i.dataSource),
                                P.cat.allcats[s] = i.dataSource,
                                P.cat.allcats[n] = null,
                                this.refreshOutPut(),
                                13 < Date.newDate().getTime() / 1e3 - P.cat.airDropTime && 11 == P.cat.allcats.filter(t=>!!t).length && (P.cat.reqGetAirDropCat(),
                                Laya.timer.loop(13e3, P.cat, P.cat.reqGetAirDropCat)),
                                I.checkRandomBox()
                            }
                            )
                        }
                        return
                    }
                }
                P.event(y.SHAKE_CAT, !0)
            }
        }
        onClickRank() {
            m(Ye, {
                params: [I.rankLeague]
            }).then(t=>{
                t.wait().then(()=>{
                    this.updateRankShow()
                }
                )
            }
            )
        }
        onClickInvite() {
            m(Qe)
        }
        updateClubShow() {
            if (this.m_box_HasSquad.visible = !!P.club.clubInfo,
            this.m_box_NoSquad.visible = !P.club.clubInfo,
            P.club.clubInfo) {
                let t = P.club.clubInfo.name;
                this.m_txt_Squad.text = t;
                var e = this.m_txt_Squad._tf.lines.toString().length;
                t.length > e && (this.m_txt_Squad.text = t.slice(0, 4) + "..." + t.slice(t.length - 3)),
                this.m_txt_SquadScore.text = f(P.club.clubInfo.rankGold),
                this.m_txt_League.text = k(Gt[P.club.clubInfo.league]),
                this.m_img_Cup.skin = `cat/ui_notpack/cup${this.changeImgUrl(P.club.clubInfo.league)}.png`
            }
        }
        updateRankShow() {
            P.club.reqGetMyRank().then(t=>{
                this.m_txt_SelfLeague.text = k(Gt[t.league]),
                this.m_img_RankCup.skin = `cat/ui_notpack/cup${this.changeImgUrl(t.league)}.png`,
                this.m_txt_SelfLeague.y,
                this.m_txt_SelfRank.visible = !0,
                t.rank ? 1 == t.rank ? this.m_txt_SelfRank.text = t.rank + "st" : 2 == t.rank ? this.m_txt_SelfRank.text = t.rank + "nd" : 3 == t.rank ? this.m_txt_SelfRank.text = t.rank + "rd" : this.m_txt_SelfRank.text = t.rank + "th" : this.m_txt_SelfRank.text = ""
            }
            )
        }
        showGoldAni(t=0, e) {
            P.cat.goldMute || D.instance.playSound("CatGem.mp3"),
            zt("cat/ui_item/coin.png", 16, {
                x: 280,
                y: 300
            }, {
                x: this.m_img_Gold.localToGlobal(Laya.Point.TEMP.setTo(0, 0)).x + 40 - Mmobay.adaptOffsetWidth / 2,
                y: 580
            }, ()=>{
                this.updateGold(),
                this.aniGold.play(0, !1)
            }
            , this)
        }
        findCustomCat() {
            this.catSpines.find(t=>!!t && !t.destroyed) ? (this.m_speedFlag = P.cat.checkIsBoost(),
            this.boostCustom()) : Laya.timer.once(1e4, this, this.findCustomCat)
        }
        stopCat(i) {
            for (let t = 0; t < this.catSpines.length; t++) {
                let e = this.catSpines[t];
                var s, a;
                e && this.catSpines[i] && (Laya.Tween.clearAll(e),
                Laya.timer.clearAll(e),
                t != i && (s = [this.catSpines[i].x + Math.randRange(-80, 60), this.catSpines[i].y + Math.randRange(1, 50)],
                a = Kt(e.x, e.y, s[0], s[1]),
                e.x > s[0] ? e.scaleX = Math.abs(e.scaleX) : e.scaleX = -Math.abs(e.scaleX),
                Laya.Tween.to(e, {
                    x: s[0],
                    y: s[1]
                }, a / .2 * 2 / (this.m_speedFlag ? this.m_speedScale : 1) * (Math.random() / 2 + .5), null, Laya.Handler.create(this, t=>{
                    e.scaleX = Math.abs(e.scaleX),
                    P.cat.playCat(e, "squat idle")
                }
                )),
                P.cat.playCat(e, "run")))
            }
        }
        randomPeople(s, a) {
            var t, e, i = s, n = a, o = Math.randRange(1, 3);
            for (t of ["left_shoe", "right_shoe"]) {
                var r = i.getSlotByName(t);
                i.replaceSlotSkinName(t, r.currDisplayData.name, n + "/shoe_0" + o)
            }
            l = s,
            m = a,
            d = Math.randRange(1, 3),
            c = l.getSlotByName("eyes"),
            l.replaceSlotSkinName("eye", c.currDisplayData.name, m + "/eye_0" + d);
            var h, l = s, c = a, m = Math.randRange(1, 3), d = "hair", _ = ("female" == c && .5 < Math.random() ? (e = l.getSlotByName("hair_long"),
            l.replaceSlotSkinName("hair_long", e.currDisplayData ? e.currDisplayData.name : "", "female/hair_long_0" + m)) : (e = l.getSlotByName(d),
            l.replaceSlotSkinName(d, e.currDisplayData ? e.currDisplayData.name : "", c + "/hair_0" + m)),
            l = s,
            d = a,
            e = Math.randRange(1, 3),
            c = "jacket",
            m = l.getSlotByName(c),
            l.replaceSlotSkinName(c, m.currDisplayData.name, d + `/${c}_0` + e),
            l = s,
            m = a,
            d = Math.randRange(1, 3),
            c = "face",
            C = l.getSlotByName(c),
            l.replaceSlotSkinName(c, C.currDisplayData.name, m + "/face_0" + d),
            s), u = a, p = Math.randRange(1, 3);
            for (h of ["sleeve_left", "sleeve_right"]) {
                var g = _.getSlotByName(h);
                _.replaceSlotSkinName(h, g.currDisplayData.name, u + `/jacket_0${p}_sleeve`)
            }
            var l = s
              , c = (0,
            l.getSlotByName("pants_left"))
              , C = ["male/pants_01_f", "male/pants_02_f", "male/pants_03_f"]
              , m = Math.floor(3 * Math.random())
              , c = (l.replaceSlotSkinName("pants_left", c.currDisplayData.name, C[m]),
            l.getSlotByName("pants_right"))
              , C = ["male/pants_01", "male/pants_02", "male/pants_03"];
            l.replaceSlotSkinName("pants_right", c.currDisplayData.name, C[m]);
            {
                d = s,
                l = a;
                let t = Math.randRange(0, 2)
                  , e = "smile mouth"
                  , i = "";
                i = "female" == l ? "skin_base/smile-mouth-girlnew" : "skin_base/smilemouth-man",
                l = d.getSlotByName(e),
                d.replaceSlotSkinName(e, l.currDisplayData ? l.currDisplayData.name : "", i + ["1", "2"][t])
            }
        }
        boostCustom() {
            this.m_speedCustomNum = this.catSpines.filter(t=>!!t).length;
            let e = 0;
            this.m_checkTime = Date.newDate().getTime(),
            this.m_flag++,
            this.m_flag = this.m_flag % 10;
            for (var i of this.catSpines)
                if (i) {
                    e++;
                    let t = new Laya.Templet;
                    t.once(Laya.Event.COMPLETE, this, s, [t, i, e, this.m_flag]),
                    t.loadAni("cat/spine/people.sk")
                }
            function s(o, r, h, l) {
                let c = o.buildArmature(1)
                  , m = (o.showSkinByIndex(c._boneSlotDic, 2, !0),
                c.playbackRate(this.m_speedFlag ? this.m_speedScale : 1),
                c.visible = !0,
                c.x = 146,
                c.y = 45,
                c.zOrder = 1,
                c.name = "people",
                ["female", "male"][Math.floor(2 * Math.random())])
                  , d = (this.randomPeople(c, m),
                this.m_isCustoming = !0,
                +r.name);
                Laya.timer.once(5200 * h / (this.m_speedFlag ? this.m_speedScale : 1), this, ()=>{
                    P.cat.prepareCat(c, d, Laya.Handler.create(this, ()=>{
                        if (!r || r.destroyed || l != this.m_flag)
                            return this.m_speedTemp.push(o),
                            void this.m_speedPeople.push(c);
                        r && (Laya.Tween.clearAll(r),
                        Laya.timer.clearAll(r),
                        r.scaleX = Math.abs(r.scaleX),
                        P.cat.playCat(r, "pose"));
                        let t = r.x - 55;
                        var e = Data.getCat(d)
                          , e = +e.oldShowId || +e.showId;
                        let i = r.y + 31;
                        200 <= e ? (t = r.x - 90 + 16,
                        i = r.y + 34) : e < 100 && (i = r.y + 28);
                        var s = Kt(c.x, c.y, t, i);
                        let a, n = (a = s / .2 * 2,
                        0);
                        n = 200 <= e ? 2 : 100 <= e ? 0 : 6,
                        c.scaleX = 1,
                        this.aniDoor.play(0, !1),
                        P.cat.goldMute || 1 != h || D.instance.playSound("SFX_DoorBell.mp3"),
                        c.play("wave", !0),
                        P.cat.goldMute || D.instance.playSound(P.cat.getCv("Hello", m)),
                        this.m_box_Con.addChildAt(c, 0),
                        Laya.timer.once(2e3 / (this.m_speedFlag ? this.m_speedScale : 1), this, ()=>{
                            c && (c.play("walk", !0),
                            Laya.Tween.to(c, {
                                x: t,
                                y: i
                            }, a / (this.m_speedFlag ? this.m_speedScale : 1), null, Laya.Handler.create(this, t=>{
                                let e = 0;
                                c.zOrder = 0,
                                this.m_isCustoming2 = !0;
                                var i = +Data.getCat(+r.name).showId;
                                e = i < 100 ? 5800 : i < 200 ? 5e3 : 2800,
                                Laya.timer.once(e / (this.m_speedFlag ? this.m_speedScale : 1), this, ()=>{
                                    r.visible = !0,
                                    Laya.timer.once(this.m_speedFlag ? 3800 / this.m_speedScale : 1e3, this, ()=>{
                                        var s, a, t, n, e;
                                        this.m_speedTemp.push(o),
                                        this.m_speedPeople.push(c),
                                        s = c,
                                        a = this,
                                        t = m,
                                        n = l,
                                        s.play("walk", !0),
                                        P.cat.goldMute || D.instance.playSound(P.cat.getCv("Thanks", t)),
                                        s.scaleX = 50 < s.x ? -Math.abs(s.scaleX) : Math.abs(s.scaleX),
                                        t = Kt(s.x, s.y, 146, 20),
                                        e = 0,
                                        e = t / .2,
                                        Laya.Tween.to(s, {
                                            x: 146,
                                            y: 20
                                        }, e / (a.m_speedFlag ? a.m_speedScale : 1), null, Laya.Handler.create(a, t=>{
                                            if (a.aniDoor.play(0, !1),
                                            a.m_speedCustomNum--,
                                            s.visible = !1,
                                            s.removeSelf(),
                                            0 == a.m_speedCustomNum && n == a.m_flag) {
                                                a.m_checkTime = Date.newDate().getTime(),
                                                a.m_isCustoming = !1,
                                                a.m_isCustoming2 = !1;
                                                for (let t = 0; t < a.catSpines.length; t++)
                                                    a.catSpines[t] && a.catAniStep(2, a.catSpines[t], t);
                                                for (let t = 0; t < a.customingCatSpines.length; t++)
                                                    a.customingCatSpines[t] && (a.customingCatSpines[t]._templet && a.customingCatSpines[t]._templet.offAll(),
                                                    a.customingCatSpines[t] && a.customingCatSpines[t].destroy());
                                                a.customingCatSpines = [];
                                                for (var e of a.m_speedTemp)
                                                    e.destroy(),
                                                    e = null;
                                                for (var i of a.m_speedPeople)
                                                    i.destroy(),
                                                    i = null;
                                                a.m_speedTemp = [],
                                                a.m_speedPeople = [],
                                                a.updateGold(),
                                                a.aniGold.play(0, !1),
                                                Laya.timer.once(5e3, a, a.findCustomCat)
                                            }
                                        }
                                        )),
                                        P.cat.goldMute || D.instance.playSound("CatGem.mp3"),
                                        zt("cat/ui_item/coin.png", 16, {
                                            x: r.x,
                                            y: r.y + 180
                                        }, {
                                            x: this.m_img_Gold.localToGlobal(Laya.Point.TEMP.setTo(0, 0)).x + 40 - Mmobay.adaptOffsetWidth / 2,
                                            y: 580
                                        }, ()=>{}
                                        , this)
                                    }
                                    ),
                                    c.play(this.m_speedFlag ? "dance" : "happy", !1)
                                }
                                ),
                                c.play(n, !1),
                                r.visible = !1
                            }
                            )))
                        }
                        )
                    }
                    ))
                }
                )
            }
        }
        airDrop(s, a=!0) {
            if (!a || Be("airdrop", 1e3)) {
                let t = this.m_lst_Cat.getCell(s);
                a = t.localToGlobal(Laya.Point.TEMP.setTo(0, 0));
                let e = this.m_airDrops[s] = R.create({
                    url: "cat/spine/cathome.json",
                    parent: this,
                    px: a.x + 45 - Mmobay.adaptOffsetWidth / 2,
                    py: a.y + 50 - Mmobay.adaptOffsetHeight / 2,
                    scale: .8,
                    autoRemove: !1,
                    alpha: 1
                })
                  , i = P.cat.checkHighAir(s);
                e.play(i ? 3 : 0, !1, Laya.Handler.create(this, ()=>{
                    e && !e.destroyed && (e.play(i ? 4 : 1, !0),
                    Laya.timer.once(5e3, this, (t,e)=>{
                        this.opAirDrop(t, e)
                    }
                    , [s, !1]))
                }
                ))
            }
        }
        opAirDrop(i, s=!0) {
            if (this.m_airDrops[i] && P.cat.airDropMap[i]) {
                let e = P.cat.allcats[i];
                if (this.m_airDrops[i].skeleton) {
                    var t = P.cat.checkHighAir(i);
                    this.m_airDrops[i].skeleton.playbackRate(3),
                    this.m_airDrops[i].play(t ? 5 : 2, !1, Laya.Handler.create(this, ()=>{
                        this.m_airDrops[i].destroy(),
                        this.m_airDrops[i] = null,
                        P.cat.airDropMap[i] = 0
                    }
                    )),
                    Laya.timer.once(700, this, ()=>{
                        !P.cat.goldMute && s && D.instance.playSound("airdrop3.mp3"),
                        this.m_lst_Cat.changeItem(i, e),
                        e && this.createIndexCat(i, e);
                        let t = this.m_lst_Cat.getCell(this.m_mouseCat);
                        -1 != this.m_mouseCat && (t.visible = !1)
                    }
                    )
                } else {
                    this.m_airDrops[i].destroy(),
                    this.m_airDrops[i] = null,
                    P.cat.airDropMap[i] = 0,
                    this.m_lst_Cat.changeItem(i, e),
                    e && this.createIndexCat(i, e);
                    let t = this.m_lst_Cat.getCell(this.m_mouseCat);
                    void (-1 != this.m_mouseCat && (t.visible = !1))
                }
            }
        }
        onClickEarn() {
            this.checkTaskRed(),
            Bi.init()
        }
        checkTaskRed(t=!1) {
            var e = Mmobay.LocalStorage.get(S.s_taskRedCheck)
              , i = Date.newDate().getTime();
            !e || 864e5 < i - e ? (this.m_img_TaskRed.visible = !0,
            Mmobay.LocalStorage.set(S.s_taskRedCheck, i)) : t || (this.m_img_TaskRed.visible = !1)
        }
        checkReChargeRed() {
            var t = I.checkFirstReCharge()
              , e = 0 == I.getCountByType(Dt.goods2001);
            this.m_img_RechargeRed.visible = t && e
        }
        checkNew() {
            P.cat.checkNew() && _(ei, {
                params: []
            }).then(t=>{
                this.addChild(t),
                t.centerX = +t.width / 2,
                (this.m_finger = t).y = this.m_btn_Generate.y + t.height - 67
            }
            )
        }
        checkOpenMenu() {
            var t = P.cat.getMyLv()
              , e = (this.m_btn_Generate.visible = !0,
            Data.gameConf.initCfg.openMenu.split(","))
              , i = P.cat.getMyLv()
              , s = (this.m_box_Plus.visible = i >= +e[0],
            this.m_btn_ReCharge.visible = i >= +e[0],
            this.m_btn_Earn.visible = i >= +e[1],
            this.m_btn_Shop.visible = i >= +e[2],
            this.m_btn_Invite.visible = i >= +e[3],
            this.m_btn_Fish.visible = this.m_txt_Fish.visible = this.m_img_Fish.visible = i >= +e[4],
            this.m_btn_Sound.visible = i >= +e[5],
            this.m_btn_Mine.visible = this.m_txt_Mine.visible = i > +e[6],
            this.m_btn_Speed.visible = i >= +e[7],
            this.m_btn_Auto.visible = i >= +e[8] && this.m_btn_Generate.visible,
            this.m_btn_AutoSetting.visible = i >= +e[8] && !this.m_img_StopAuto.visible && !!P.cat.buyAuto,
            this.m_img_AutoRed.visible = !P.cat.buyAuto && this.m_btn_Auto.visible && !P.cat.clickAuto,
            +Data.gameConf.turnTableCfg.isOpen);
            this.m_txt_Spin.visible = this.m_btn_Table.visible = s && i >= +e[9],
            this.m_btn_Speed.visible && t >= +e[7] && this.checkFreeBoostRed(!0),
            this.m_btn_Shop.visible && t >= +e[0] && this.updateShopRed()
        }
        checkSum() {
            if (!P.cat.isAuto && -1 == this.m_mouseCat) {
                var i = this.getSumIndex();
                if (i.length) {
                    let t = this.m_lst_Cat.getCell(i[0])
                      , e = this.m_lst_Cat.getCell(i[1]);
                    var i = new Laya.Point(10 - Mmobay.adaptOffsetWidth / 2,91 - Mmobay.adaptOffsetHeight / 2 - 24)
                      , i = t.localToGlobal(i)
                      , s = new Laya.Point(10 - Mmobay.adaptOffsetWidth / 2,91 - Mmobay.adaptOffsetHeight / 2 - 24)
                      , s = e.localToGlobal(s);
                    this.doSumTip(i, s)
                }
            }
        }
        getSumIndex() {
            var i = P.cat.allcats;
            let s = [];
            var a = i.length
              , t = Data.maxCats;
            for (let e = 0; e < a && !s.length; e++) {
                var n = i[e];
                if (n && !P.cat.airDropMap[e] && e != this.m_mouseCat && n != t && !P.lunch.checkCatLunch(e))
                    for (let t = e + 1; t < a; t++) {
                        var o = i[t];
                        if (o && !P.cat.airDropMap[t] && t != this.m_mouseCat && !P.lunch.checkCatLunch(t) && n == o) {
                            s = [e, t];
                            break
                        }
                    }
            }
            return s
        }
        doSumTip(t, e) {
            this.m_img_SumTip.visible = !0,
            this.m_img_SumTip.x = t.x,
            this.m_img_SumTip.y = t.y;
            t = Kt(t.x, t.y, e.x, e.y);
            Laya.Tween.to(this.m_img_SumTip, {
                x: e.x,
                y: e.y
            }, 5 * t, null, Laya.Handler.create(this, ()=>{
                Laya.timer.once(200, this, this.checkSum)
            }
            ), 200)
        }
        checkFreeBoostRed(t=!1) {
            Laya.timer.clear(this, this.checkFreeBoostRed);
            var e = Date.newDate().getTime() - 1e3 * +I.exdata.speedFreeTime
              , i = Date.newDate().getTime() - 1e3 * +I.exdata.SpeedChainTime;
            this.m_img_RedSpeed.visible = (0 < e || 0 < i) && (this.m_btn_Speed.visible || t),
            !this.m_img_RedSpeed.visible && e < 0 && i < 0 && Laya.timer.once(1e3 - Math.max(e, i), this, this.checkFreeBoostRed)
        }
        onClickTable() {}
        onClickSound() {
            var t = D.instance.soundEnable;
            D.instance.soundEnable = !t,
            D.instance.musicEnable = !t,
            S.set(S.s_musicDisable, t),
            S.set(S.s_soundDisable, t),
            t ? D.instance.stopAll() : D.instance.playMusic("BGM_Cafe.mp3"),
            this.checkSoundImgShow()
        }
        checkSoundImgShow() {
            var t = D.instance.soundEnable;
            this.m_img_NoSound.visible = !t
        }
        updateShopRed(t=!1) {
            var e = Data.getShopCat(P.cat.getMyLv()).freeCd;
            e && (Laya.timer.once(1e3 * e, this, this.updateShopRed),
            P.cat.reqFreeCat().then(()=>{
                this.m_img_RedShop.visible = (t || this.m_btn_Shop.visible) && !!P.cat.freeCat
            }
            ))
        }
        checkFreeCat() {
            P.cat.freeCat && P.cat.isAuto && 12 != P.cat.allcats.filter(t=>!!t).length && P.cat.reqCreate(P.cat.freeCat, !1, !0).then(()=>{
                u("Auto Feed")
            }
            )
        }
        updateAuto() {
            this.m_img_AutoRed.visible = !P.cat.buyAuto && this.m_btn_Auto.visible && !P.cat.clickAuto
        }
        buyAuto() {
            this.updateAuto(),
            P.cat.isAuto = !0,
            this.ani8.play(0, !0),
            Laya.timer.loop(500, this, this.checkAuto),
            this.checkFreeCat(),
            this.m_btn_AutoSetting.visible = !0
        }
        onClickAuto() {
            if (P.cat.clickAuto = !0,
            this.m_img_AutoRed.visible = !1,
            !P.cat.buyAuto)
                return d(si);
            P.cat.isAuto = !P.cat.isAuto,
            P.cat.isAuto ? (this.ani8.play(0, !0),
            Laya.timer.loop(500, this, this.checkAuto),
            this.checkFreeCat(),
            this.m_btn_AutoSetting.visible = !0) : (Laya.timer.clearAll(this.checkAuto),
            this.ani8.stop(),
            Laya.timer.loop(5e3, this, this.checkSum),
            this.m_btn_AutoSetting.visible = !1),
            this.m_img_StopAuto.visible = !P.cat.isAuto
        }
        checkAuto() {
            if (P.cat.isAuto && !P.lunch.isLunchDlg) {
                let s = this.getSumIndex();
                var t = Date.newDate().getTime() - 1e3 * +I.exdata.speedFreeTime;
                if (P.cat.isAuto && this.m_img_RedSpeed.visible && 0 < t && P.cat.reqSpeed(1).then(()=>{
                    P.event(y.SPEED_FREE),
                    u("Auto Boost")
                }
                ),
                s.length) {
                    let i = P.cat.allcats[s[1]];
                    P.cat.reqSumCat(s).then(t=>{
                        -1 != this.m_mouseCat && P.event(y.CAT_MATCH, [this.m_mouseCat]),
                        Laya.timer.loop(2e3, this, this.checkCreateTip);
                        let e = this.m_lst_Cat.getCell(s[1]);
                        e.playSumAni(i + 1),
                        this.m_lst_Cat.changeItem(s[0], null),
                        this.m_isCustoming ? this.customingCatSpines.push(this.catSpines[s[0]], this.catSpines[s[1]]) : (this.catSpines[s[0]] && (this.catSpines[s[0]]._templet.offAll(),
                        this.catSpines[s[0]].destroy()),
                        this.catSpines[s[1]] && (this.catSpines[s[1]]._templet.offAll(),
                        this.catSpines[s[1]].destroy())),
                        this.catSpines[s[0]] = null,
                        this.catSpines[s[1]] = null,
                        this.createIndexCat(s[1], i + 1),
                        this.m_lst_Cat.changeItem(s[1], t[s[1]]),
                        P.cat.allcats[s[0]] = null,
                        P.cat.allcats[s[1]] = t[s[1]],
                        this.refreshOutPut(),
                        13 < Date.newDate().getTime() / 1e3 - P.cat.airDropTime && 11 == P.cat.allcats.filter(t=>!!t).length && (P.cat.reqGetAirDropCat(),
                        Laya.timer.loop(14e3, P.cat, P.cat.reqGetAirDropCat)),
                        I.checkRandomBox()
                    }
                    )
                } else
                    12 == P.cat.allcats.filter(t=>!!t).length && this.delLastCat()
            }
        }
        onClickAutoSetting() {
            d(Gi)
        }
        delLastCat() {
            let t = !1;
            for (var e in P.cat.airDropMap)
                if (P.cat.airDropMap[e]) {
                    t = !0;
                    break
                }
            if (!t) {
                let e = 0
                  , i = -1;
                var s = Data.getCat(P.cat.getMyLv()).airdrop[0].k;
                for (let t = 0; t < P.cat.allcats.length; t++) {
                    var a = P.cat.allcats[t];
                    s <= a || (!e || a < e) && (e = a,
                    i = t)
                }
                0 <= i && i != this.m_mouseCat && P.cat.reqDelCat(i).then(()=>{
                    let t = this.m_lst_Cat.getCell(i)
                      , e = R.create({
                        url: "cat/spine/smoke.json",
                        parent: this,
                        px: t.localToGlobal(Laya.Point.TEMP.setTo(0, 0)).x + 30,
                        py: t.localToGlobal(Laya.Point.TEMP.setTo(0, 0)).y,
                        autoRemove: !0
                    });
                    P.cat.goldMute || D.instance.playSound("Delete.mp3"),
                    e.play(0, !1),
                    this.m_isCustoming ? this.customingCatSpines.push(this.catSpines[i]) : (this.catSpines[i]._templet.offAll(),
                    this.catSpines[i] && this.catSpines[i].destroy()),
                    this.catSpines[i] = null,
                    this.m_lst_Cat.changeItem(i, null),
                    I.checkRandomBox(),
                    P.event(y.CAT_MATCH),
                    this.showDelete(!1)
                }
                )
            }
        }
        checkGoldRain() {
            var t = I.randomEvent
              , e = I.fishData
              , i = Date.newDate().getTime();
            t && i < 1e3 * +t.multipleTime || e && i < 1e3 * +e.eventTime ? (t = t && 1e3 * +t.multipleTime - i,
            e = e && 1e3 * +e.eventTime - i,
            this.m_box_Rain.numChildren || P.cat.doGoldRain(this.m_box_Rain),
            Laya.timer.clear(this, this.doReCheckGoldRain),
            Laya.timer.once(Math.max(t, e, 0), this, this.doReCheckGoldRain)) : P.cat.clearGoldRain()
        }
        doReCheckGoldRain() {
            P.event(y.UPDATE_SPEED),
            this.checkGoldRain()
        }
        changeImgUrl(t) {
            return 5 == t || 6 == t ? t + 1 : t
        }
        checkCustom() {
            Laya.timer.loop(5e3, this, ()=>{
                if (this.m_checkTime && 90 < (Date.newDate().getTime() - this.m_checkTime) / 1e3) {
                    this.m_checkTime = 0,
                    Laya.timer.clear(this, this.findCustomCat),
                    this.updateGold();
                    for (let t = 0; t < this.customingCatSpines.length; t++)
                        this.customingCatSpines[t] && (this.customingCatSpines[t]._templet && this.customingCatSpines[t]._templet.offAll(),
                        this.customingCatSpines[t] && this.customingCatSpines[t].destroy());
                    this.customingCatSpines = [],
                    this.findCustomCat()
                }
            }
            )
        }
        checkInviteDouble() {
            P.invite.reqFrensInviterDoubleInfo().then(t=>{
                var e = Date.newDate().getTime()
                  , i = 1e3 * +t.startTime
                  , t = 1e3 * +t.endTime;
                this.m_box_Double.visible = i < e && e < t
            }
            )
        }
        checkGiftShow() {
            var t, e;
            this.clearNotGiftTicker(),
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE || I.checkNotcoinGiftReCharge() ? this.m_box_NotCoinGift.visible = !1 : (t = Date.newDate().getTime(),
            (e = 1e3 * +Data.gameConf.goodsCfg.goods1002EndTime) < t || P.cat.getMyLv() < 4 ? this.m_box_NotCoinGift.visible = !1 : (this.m_notGiftTicker = E.create(e, 1e3, this.m_txt_GiftEnd),
            this.m_notGiftTicker.start(),
            this.m_notGiftTicker.onEnd = ()=>{
                this.checkGiftShow()
            }
            ,
            this.m_box_NotCoinGift.visible = !0))
        }
        clearNotGiftTicker() {
            this.m_notGiftTicker && this.m_notGiftTicker.dispose(),
            this.m_notGiftTicker = null
        }
        checkImgEarnShow() {
            var t = Date.newDate().getUTCHours();
            this.m_img_EarnCat.skin = t < 6 || 18 <= t ? "cat/ui_home/earn1.png" : "cat/ui_home/earn2.png"
        }
        checkTableHelp() {
            var t;
            this.m_tableHelpChecked ? this.checkOffLine() : (this.m_tableHelpChecked = !0,
            window.Telegram ? (t = Data.gameConf.initCfg.openMenu.split(",")[9],
            P.cat.getMyLv() < +t ? P.table.reqPreHelpOtherTurn().then(t=>{
                t.tips && u(k(t.tips)),
                t.helpId ? d(Ii, {
                    params: [t]
                }).then(t=>{
                    t.wait().then(()=>{
                        this.checkOffLine()
                    }
                    )
                }
                ) : this.checkOffLine()
            }
            , ()=>{
                this.checkOffLine()
            }
            ) : P.table.reqPreHelpOtherTurn().then(t=>{
                t.hasWaitHelp ? (t.tips && u(k(t.tips)),
                P.table.reqTableInfo().then(()=>{
                    P.table.tableInfo ? m(Ni, {
                        params: [t]
                    }) : I.getCountByType(Dt.turnStartDay) < +Data.gameConf.turnTableCfg.dayMaxCount ? d(Ci, {
                        params: [t],
                        closeOnSide: !1
                    }) : t.helpId ? d(Ii, {
                        params: [t]
                    }).then(t=>{
                        t.wait().then(()=>{
                            this.checkOffLine()
                        }
                        )
                    }
                    ) : this.checkOffLine()
                }
                )) : this.checkOffLine()
            }
            , ()=>{
                this.checkOffLine()
            }
            )) : this.checkOffLine())
        }
        onClickNotCoinGift() {
            d(pi).then(t=>{
                t.wait().then(()=>{
                    this.checkGiftShow(),
                    I.checkRandomBox()
                }
                )
            }
            )
        }
    }
	const consoleRed = 'font-weight: bold; color: red;';
const consoleGreen = 'font-weight: bold; color: green;';
const consolePrefix = '%c [AutoBot] ';

console.clear()
console.log(`${consolePrefix}Injecting...`, consoleGreen);

try {
    function onClickAuto() {
        P.cat.isAuto = !P.cat.isAuto,
        P.cat.isAuto ? (this.ani8.play(0, !0),
        Laya.timer.loop(500, this, this.checkAuto),
        this.checkFreeCat(),
        this.m_btn_AutoSetting.visible = !0) : (Laya.timer.clearAll(this.checkAuto),
        this.ani8.stop(),
        Laya.timer.loop(5e3, this, this.checkSum),
        this.m_btn_AutoSetting.visible = !1),
        this.m_img_StopAuto.visible = !P.cat.isAuto
        u(`AutoBot ${P.cat.isAuto ? 'deactivated' : 'activated'}!\n\nCracked by @clqkx`)
    }
    
    M.prototype.onClickAuto = onClickAuto
    console.log(`${consolePrefix}Script loaded`, consoleGreen);
    console.log(`${consolePrefix}Crack by @clqkx`, consoleGreen);

} catch (e) {
    console.log(`${consolePrefix}An error occurred, the BrakePoint is set incorrectly!`, consoleRed);
    console.log(`${consolePrefix}Please follow the instructions, and you will succeed :*`, consoleRed);
    console.log('https://github.com/clqkx/AutoBot-Catizen');
}
    L([A("leaguechange")], M.prototype, "updateBg", null),
    L([A(y.UPDATE_OUTPUT)], M.prototype, "clearSumTip", null),
    L([A(y.OFFLINE_CHANGE)], M.prototype, "checkOffLine", null),
    L([A(y.UPDATE_ITEM)], M.prototype, "updateGold", null),
    L([A(y.UPDATE_CAT)], M.prototype, "updateOutPut", null),
    L([A(y.UPDATE_ITEM)], M.prototype, "updateRechargeShow", null),
    L([A(y.UPDATE_OUTPUT), A(y.UPDATE_SPEED)], M.prototype, "refreshOutPut", null),
    L([A(y.BUY_CAT)], M.prototype, "buyCat", null),
    L([A(y.UPDATE_SPEED)], M.prototype, "updateSpeed", null),
    L([A(y.MOVE_CAT)], M.prototype, "moveCat", null),
    L([A(y.CLUB_UPDATE)], M.prototype, "updateClubShow", null),
    L([A(y.HOME_GOLD_ANI)], M.prototype, "showGoldAni", null),
    L([A(y.AIR_DROP)], M.prototype, "airDrop", null),
    L([A(y.OPNE_AIR_DROP)], M.prototype, "opAirDrop", null),
    L([A(y.UPDATE_RECHARGE_RED)], M.prototype, "checkReChargeRed", null),
    L([A(y.SPEED_FREE), A("buyAuto")], M.prototype, "checkFreeBoostRed", null),
    L([A("updateShopRed")], M.prototype, "updateShopRed", null),
    L([A("buyAuto")], M.prototype, "buyAuto", null),
    L([A(y.RANDOM_EVENT_TIME_CHANGE)], M.prototype, "checkGoldRain", null),
    L([A(y.RECHARGE_SUCCESS)], M.prototype, "checkGiftShow", null);
    class qi extends t.cat.views.recharge.DailyBackClaimDlgUI {
        constructor(t) {
            super()
        }
        onAwake() {
            super.onAwake();
            var t = Data.gameConf.goodsCfg;
            this.m_txt_FishCoin.text = "x" + t.goodsDayFishCoin,
            this.m_txt_Gold.text = "x" + +t.goodsDayGoldTime / 60 + "min",
            this.m_txt_XZen.text = "x" + t.goodsDayxZen,
            this.m_txt_AirDrop.text = "x" + t.goodsDayCatNum;
            let e = R.create({
                url: "cat/spine/claimpack.json",
                parent: this.m_box_Con,
                px: 50,
                py: 180
            });
            e.play(1, !0)
        }
    }
    class Hi extends t.cat.views.entrance.GameEntranceUI {
        constructor() {
            super(),
            this.m_resArr = [],
            this.size(560, 1120),
            this.zOrder = 100,
            this.centerX = this.centerY = 0,
            this.mouseThrough = !0,
            Laya.timer.loop(12e5, this, ()=>{
                Laya.Scene.gc()
            }
            )
        }
        static init() {
            _t(Hi.instance = new Hi, c.Main)
        }
        play() {
            var t, e;
            this.checkLoadRes(),
            t = M,
            e = j,
            ct(t, c.Main, e).then(t=>{
                Mmobay.gameDispatcher.event(Mmobay.MEvent.PACK_LOAD_DONE)
            }
            )
        }
        onRechargeSuccess(t, e, i, s) {
            d(xe, {
                params: [t, e, i, s],
                retainPopup: !0
            })
        }
        onDayEventGoodsClaim() {
            d(qi, {
                params: [],
                retainPopup: !0
            })
        }
        checkLoadRes() {
            var t = Mmobay.Manager.loginMgr.isNew;
            let e = []
              , i = P.club.getLeagueByScore(+I.rankGold)
              , s = (i < 0 && (i = 6),
            t || (e = 5 <= i ? ["cat/ui_bg/wall" + (i + 1), "cat/ui_bg/office" + (i + 1), `cat/ui_bg/office${i + 1}_1`] : ["cat/ui_bg/wall1", "cat/ui_bg/office1", "cat/ui_bg/office1_1"],
            this.m_resArr = ["cat/atlas/cat/ui_table.atlas"]),
            []);
            e.forEach(t=>{
                s.push({
                    url: t + ".png",
                    type: Laya.Loader.IMAGE,
                    priority: 2
                })
            }
            ),
            Laya.loader.load(s, Laya.Handler.create(this, ()=>{
                this.silenceLoadRes()
            }
            ))
        }
        silenceLoadRes() {
            var t;
            this.m_resArr.length && (t = this.m_resArr.shift(),
            Laya.loader.load(t, Laya.Handler.create(this, ()=>{
                this.silenceLoadRes()
            }
            ), null, Laya.Loader.ATLAS, 2))
        }
    }
    L([A(y.RECHARGE_SUCCESS)], Hi.prototype, "onRechargeSuccess", null),
    L([A(y.DAY_EVENT_GOODS_CLAIM_SUCCESS)], Hi.prototype, "onDayEventGoodsClaim", null);
    class N extends t.cat.views.common.LoadingViewUI {
        static show() {
            if (N.s_count++,
            N.s_instance)
                N.s_instance.play();
            else {
                let t = new N;
                t.openView().then(()=>{
                    N.s_instance || N.s_count <= 0 ? t.destroy() : (_t(N.s_instance = t, c.Loading),
                    t.play())
                }
                )
            }
        }
        static reduce() {
            N.s_count = Math.max(N.s_count - 1, 0),
            !N.s_instance || 0 < N.s_count || N.s_instance.stop()
        }
        static clear() {
            N.s_instance && (N.s_count = 0,
            N.s_instance.stop())
        }
        play() {
            this.visible = !0,
            this.ani1.isPlaying || this.ani1.play(0, !0)
        }
        stop() {
            this.visible = !1,
            this.ani1.stop()
        }
    }
    N.s_count = 0;
    class Vi extends t.cat.views.common.ToastViewUI {
        constructor(t) {
            super(),
            this.m_info = t
        }
        onAwake() {
            super.onAwake(),
            this.centerX = this.centerY = 0,
            this.m_txt_Info.text = this.m_info,
            this.ani1.once(Laya.Event.COMPLETE, null, ()=>{
                this.destroy()
            }
            ),
            this.ani1.play(0, !1)
        }
    }
    class Wi extends t.cat.views.common.MsgBoxUI {
        constructor(t) {
            super(),
            this.m_option = t
        }
        onAwake() {
            super.onAwake(),
            this.m_option.disCloseOnSide && (this.closeOnSide = !1),
            this.m_option.leading && (Wi.s_style.leading = this.m_option.leading),
            this.m_option.fontSize && (Wi.s_style.fontSize = this.m_option.fontSize),
            Object.assign(this.m_div_Msg.style, Wi.s_style),
            this.m_div_Msg.innerHTML = Ot(this.m_option.msg),
            this.m_option.title && (this.m_txt_Title.text = this.m_option.title);
            var t = (this.m_option.button & s.Yes) == s.Yes
              , e = (this.m_option.button & s.No) == s.No;
            this.m_btn_Sure.visible = t,
            this.m_btn_Cancel.visible = e,
            this.m_option.okTxt && (this.m_btn_Sure.label = this.m_option.okTxt),
            t && !e && (this.m_btn_Sure.centerX = 0),
            !t && e && (this.m_btn_Cancel.centerX = 0),
            this.m_div_Msg.x = (this.m_pan_Msg.width - this.m_div_Msg.contextWidth) / 2,
            this.m_div_Msg.y = Math.max(0, (this.m_pan_Msg.height - this.m_div_Msg.contextHeight) / 2)
        }
        onDestroy() {
            super.onDestroy(),
            Wi.s_style.leading = 4
        }
        onClickSure(t) {
            this.closeDialog(h.Yes)
        }
        onClickCancel(t) {
            this.closeDialog(h.No)
        }
    }
    Wi.s_style = {
        fontSize: 24,
        bold: !0,
        color: "#764428",
        leading: 4,
        wordWrap: !0
    };
    class Yi extends t.cat.views.common.WifiViewUI {
        static show() {
            if (Yi.s_instance)
                Yi.s_instance.play();
            else {
                let t = new Yi;
                t.openView().then(()=>{
                    Yi.s_instance ? t.destroy() : (_t(Yi.s_instance = t, c.Loading),
                    t.play())
                }
                )
            }
        }
        static clear() {
            Yi.s_instance && Yi.s_instance.stop()
        }
        play() {
            this.visible = !0,
            this.ani1.isPlaying || this.ani1.play(0, !0)
        }
        stop() {
            this.visible = !1,
            this.ani1.stop()
        }
    }
    function Xi() {
        P.init(),
        mt({
            modelEventsDispatcher: P,
            opCheckLimit: Be,
            msgBoxImpl: Wi,
            wifiImpl: Yi,
            toastImpl: Vi,
            loadingImpl: N
        });
        var t, e = {
            baseUrl: Mmobay.MConfig.loginUrl,
            loadingImpl: ()=>pt(),
            errorSpawnImpl: (t,e)=>{
                -1 != t && -2 != t && u(Ot((e = ee(t) || e) || "unknown error"))
            }
        };
        for (t in e = e || et)
            it[t] = e[t];
        pb.pbContext = protobuf.parse('syntax = "proto3";\tpackage pb; \tmessage ItemInfo {\t  int32 id = 1;    \t  int64 num = 2;   \t  int64 delta = 3; \t}\tmessage ItemDeltaInfo {\t  int32 id = 1;    \t  int32 delta = 2; \t}\tmessage TokensInfo {\t  string fishCoinDelta = 1;    \t  string fishCoin = 2;    \t  string goldDelta = 3;    \t  string gold = 4;    \t}\tmessage TokensChangeInfo {\t  string fishCoinDelta = 1;    \t  string fishCoin = 2;    \t  string goldDelta = 3;    \t  string gold = 4;    \t  string wCatiDelta = 5;    \t  string wCati = 6;    \t  string xZenDelta = 7;    \t  string xZen = 8;    \t}\tmessage Count {\t  int32 count = 1;       \t  int64 refreshTime = 2; \t}\tmessage FishData {\t  map<int32, int32> counts = 1; \t  int64 refreshTime = 2;        \t  int32 fishNum = 3;\t  repeated float sumR = 4;\t  int64 eventTime = 5;\t  int32 eventCount = 6;\t}\tmessage ExData {\t  map<int32, int32> times = 1;     \t  map<int32, int32> catNum = 2;     \t  map<int32, int32> catNumFish = 3;     \t  int32 maxCatLvl = 5; \t  int64 speedFreeTime = 6;\t  int64 offLine = 7;\t  map<int32, int32> buyGoods = 9;     \t  int64 SpeedChainTime = 10;\t  int32 freeCatLvl = 11;\t  repeated int64 pendingCheckIns = 12;     \t  int32 autoMerge = 13;     \t  int32 fishRobLvl = 14;\t  int32 offLineAirDrop = 15;\t  int32 turnId = 16;\t  int32 turnSucc = 17;\t  int32 dayGoodsNum = 18;\t  int32 dayGoodsTime = 19;\t}\tmessage RandomEventData {\t    int32 isDone = 1;\t    int32 type = 2; \t    int64 time = 3; \t    int32 boxNum = 4; \t    int64 multipleTime = 5; \t    int32 isOffLineDone = 6;\t}\tmessage SysMsgParam {\t  string val = 1;    \t  int32 valType = 2; \t}\tmessage UserInfo {\t  int32 id = 1;\t  int32 accountId = 2;\t  string accountName = 3;\t  int32 sex = 4;\t  string name = 5;\t  int64 icon = 6;\t  string gold = 7;\t  string rankGold = 8;\t  repeated int32 cats = 9;\t  int64 goldTime = 10;\t  string offGold = 11;\t  int64 boostEndTime = 12;\t  int64 offTime = 13;\t  string fishCoin = 14; \t  map<int32, int64> bag = 15;\t  map<int32, Count> counts = 16;       \t  ExData exData = 17;                  \t  FishData fishData = 18;              \t  string wallet = 19;   \t  int32 bcId = 20;     \t  int32 Inviter = 21; \t  RandomEventData randomEvent = 22;\t  int64 loginTime = 23; \t  map<int32, StakeCat> stakeCats = 24; \t  string wCati = 25; \t  int32 channelID = 26;         \t  string xZen = 27; \t}\tmessage StakeCat {\t    int32 launchId = 1;\t    int64 endTime = 2;\t}\tmessage ServerTimeInfo {\t  int64 serverTime = 1;       \t  int32 serverZoneTime = 2;   \t  int64 todayZeroTime = 3;    \t  int64 mondayZeroTime = 4;   \t}\tmessage RankUser {\t  int32 userId = 1;\t  int64 rank = 2; \t  string name = 3;\t  int64 icon = 4;\t  string clubName = 5;      \t  string score = 6;          \t  int32 rankKey = 7;        \t  repeated int32 rankKeys = 8;        \t  int32 character = 9;\t  int32 channelID = 10;         \t}\tmessage RankClub {\t  int32 id = 1;\t  int32 rank = 2;\t  string name = 3;\t  int64 icon = 4;\t  int32 population = 5; \t  string score = 6;        \t}\tmessage ArenaClubRank {\t  repeated RankClub rankList = 1; \t}\tmessage Location {\t  int32 x = 1;\t  int32 y = 2;\t}\tmessage CountInfo {\t  int32 countType = 1;\t  int32 count = 2;\t}\tmessage entropy {\t  map<int32, float> Data = 1;\t}\tmessage InviterUser{\t  int32 id = 1;\t  int32 rank = 2;\t  int64 icon = 3;\t  string name = 4;\t  int32 inviteCount = 5;\t  string income = 6;\t  int32 league = 7;\t  string rankGold = 8;\t  int32 channelID = 9;         \t}\tmessage LaunchPool{\t    int32 id = 1; \t    int32 type = 2; \t    int32 scoreRate = 3; \t    int64 totalPlayer = 4;\t    int64 totalStake = 5;\t    int64 myStake = 6;\t    string waitScore = 7;\t    string gotScore = 8;\t    int32 stakeLimit = 9;\t    string hourScoreLimit = 10;\t }\t message Launch {\t    int32 id = 1;\t    int32 name = 2;\t    int64 startTime = 3;\t    int64 endTime = 4;\t    string totalScore = 5;\t    LaunchPool catPool = 6;\t    LaunchPool fishPool = 7;\t}\tmessage TurnWithdrawRecord {\t  string fishCoin = 1;\t  string xZen = 2;\t  int64  createTime = 3;\t}\tmessage ItemChangeNtf {\t  repeated ItemInfo items = 1;\t}\tmessage CountsChangeNtf {\t  map<int32, Count> counts = 1;       \t}\tmessage CSMessage {\t  int32 cmdId = 1; \t  int32 transId = 2;\t  bytes body = 3; \t}\tmessage BindWalletReq {\t  int32 msgId = 1;\t  string wallet = 2;\t  string sign = 3;\t}\tmessage BindWalletAck {}\tmessage GenerateCatReq{\t    int32 lvl = 1;\t    int32 Type = 2;\t}\tmessage GenerateCatAck{\t    int32 index = 1;\t    int32 catLvl = 2;\t    string gold = 3;\t    string fishCoin = 4;\t    int32 catNum = 5;\t    int32 catNumFish = 6;\t}\tmessage MergeCatReq {\t    repeated int32 indexs = 1;\t}\tmessage MergeCatAck {\t    repeated int32 cats = 1;\t}\tmessage MergeCatAutoReq { \t}\tmessage MergeCatAutoAck {\t    string fishCoin = 1;\t    int32 autoMerge = 2;     \t}\tmessage DelCatReq{\t  repeated int32 indexs = 1;\t}\tmessage DelCatAck {\t  repeated int32 cats = 1;\t}\tmessage GetAirDropCatReq{\t}\tmessage GetAirDropCatAck {\t    repeated int32 cats = 1;\t    int32 airdropIndex = 2;\t    int64 airdropTime = 3;\t}\tmessage GetFreeCatReq{\t}\tmessage GetFreeCatAck {\t    int32 catLvl = 1;\t}\tmessage SwitchPosCatReq{\t    repeated int32 indexs = 1;\t}\tmessage SwitchPosCatAck {\t  repeated int32 cats = 1;\t}\tmessage GatherGoldReq{}\tmessage GatherGoldAck{\t    string gold = 1;\t    int64 goldTime = 2;\t}\tmessage OffLineGoldNtf{\t    string offGold = 1;\t    int32 offAirDrop = 2;\t    int32 fishCoin = 3;\t}\tmessage GetOffLineGoldReq{\t    int64 Type = 1;\t}\tmessage GetOffLineGoldAck{\t    string gold = 1;\t    string offGold = 2;\t    int64 goldTime = 3;\t    string fishCoin = 4;\t    RandomEventData randomEventData = 5;\t}\tmessage BoostGoldReq{\t    int32 Type = 1;\t}\tmessage BoostGoldAck{\t    int64 boostEndTime = 1;\t    int64 SpeedFreeTime = 2;\t    string fishCoin = 3;\t    int64 SpeedChainTime = 4;\t}\tmessage BoostGoldNtf {\t    int64 boostEndTime = 1;\t    int64 SpeedFreeTime = 2;\t    int64 SpeedChainTime = 3;\t}\tmessage CreateClubReq {\t    string name = 1;\t    int32 currencyType = 2;\t}\tmessage CreateClubAck {\t    ClubInfo club = 1;\t    repeated MemberInfo members = 2; \t}\tmessage JoinClubReq{\t    int32 id = 1;\t}\tmessage JoinClubAck{\t    ClubInfo club = 1;\t}\tmessage ClubInfo {\t    int32 id = 1;\t    int64 icon = 2;\t    string name = 3;\t    int32 league = 4;\t    int32 population = 5;\t    int32 chairmanId = 6;\t    string rankGold = 7;                  \t    int32 boostVal = 8;           \t    string groupId = 9;\t}\tmessage ClubInfoNtf {\t    ClubInfo club = 1;               \t}\tmessage GetRecruitClubListReq{}\tmessage GetRecruitClubListAck{\t    repeated ClubInfo list = 1;\t}\tmessage QuitClubReq{}\tmessage QuitClubAck{\t    int32 success = 1;\t}\tmessage MemberInfo{\t    int32 id = 1;\t    int32 rank = 2;\t    int64 icon = 3;\t    string name = 4;\t    string rankValue = 5;\t    int32 clubId = 6;\t}\tmessage inviteRankPlayer{\t    string icon = 1;\t    string name = 2;\t    int32 inviteCount = 3;\t    string totalIncome = 4;\t}\tmessage ClubMemberRankReq{\t    int32 id = 1;\t    int32 timeType = 2;\t}\tmessage ClubMemberRankAck{\t    repeated RankUser rankList = 1;\t    RankUser myRank = 2;\t}\tmessage GetStatsReq{}\tmessage GetStatsAck{\t    string totalBalance = 1;\t    int32 totalPlayers = 2;\t    int32 dailyUsers = 3;\t    int32 online = 4;\t    string totalEarned = 5;\t    string spentAndBurned = 6;\t    repeated int64 icons = 7;\t    int32 premiumPlayers = 8;\t}\tmessage GetGoldRankListReq{\t    int32 league = 1; \t    int32 timeType = 2; \t}\tmessage GetGoldRankListAck{\t    RankUser myInfo = 1;\t    repeated RankUser rankList = 2;\t}\tmessage GetMyRankReq{}\tmessage GetMyRankAck{\t    int32 rank = 1;\t    int32 league = 2;\t    string rankGold = 3;\t}\tmessage GetClubGoldRankListReq{\t    int32 league = 1; \t    int32 timeType = 2; \t}\tmessage GetClubGoldRankListAck{\t    repeated RankClub rankList = 1;\t    RankClub myRank = 2;\t}\tmessage clubMemberPlayer{\t    string icon = 1;\t    string name = 2;\t    string rankValue = 3;\t}\tmessage ClubInfoReq{\t    int32 id = 1;\t}\tmessage ClubInfoAck{\t    ClubInfo club = 1;               \t}\tmessage FrensInfoReq{}\tmessage FrensInfoAck{\t    repeated InviterUser friendList = 1;\t    string fishCoin = 2;\t    int32 inviteCount = 3;\t    string xZen = 4;\t}\tmessage FrensInviterDoubleInfoReq{}\tmessage FrensInviterDoubleInfoAck{\t    int64 startTime = 1;\t    int64 endTime = 2;\t}\tmessage InviteRankListReq{}\tmessage InviteRankListAck{\t    InviterUser myInfo = 1;\t    repeated InviterUser rankList = 2;\t}\tmessage GoldChangeNtf {\t    string gold = 1;\t    string fishCoin = 2;\t}\tmessage RandomEventReq {}\tmessage RandomEventAck {\t    RandomEventData randomEventData = 1;\t}\tmessage GetRandomEventAwardReq {\t    int32 opType = 1;\t}\tmessage GetRandomEventAwardAck { \t    string fishCoin = 1;\t    RandomEventData randomEventData = 2;\t}\tmessage GetRandomEventBoxReq {}\tmessage GetRandomEventBoxAck {\t    repeated int32 cats = 1;\t    RandomEventData randomEventData = 2;\t}\tmessage GetFreeBoxNumReq{\t}\tmessage GetFreeBoxNumAck{\t    map<int32, Count> counts = 1;       \t    RandomEventData randomEventData = 2;\t}\tmessage  MessageEventNtf {\t    int32 retCode = 1;    \t    string msg = 2; \t    int32 eventType = 3; \t  }\tmessage ExitClubReq {\t  string pwd = 1;\t}\tmessage ExitClubAck {\t    int64 exitTime = 1;\t} \tmessage ClubGroupUserNameReq {\t  string groupUserId = 1;\t  int32 clubId = 2; \t}\tmessage ClubGroupUserNameAck {\t  string groupUserName = 1;\t}\tmessage ErrorAck {\t  int32 code = 1;\t  int32 langId = 2; \t} \tmessage ServerStateNtf {\t  int32 serverType = 1; \t  int32 offline = 2;    \t}\tmessage HeartBeatReq { \t}\tmessage HeartBeatAck { \t}\tmessage JumpServerReq {\t  int32 jumpTo = 1; \t  int32 serverId = 2; \t}\tmessage JumpServerAck {\t  int32 serverId = 1;  \t  int32 mapId = 2;     \t  int32 logicType = 3; \t  int32 logicId = 4;   \t}\tmessage GetLaunchListReq{}\tmessage GetLaunchListAck{\t    repeated Launch launchList = 1;\t    int32 inviterNum = 2;\t    int64 BoostEndTime = 3;\t}\tmessage LaunchStakeReq{\t    int32 launchId = 1;\t    int32 poolId = 2;\t    int64 stakeNum = 3;\t    int32 isRetrieve = 4; \t}\tmessage LaunchStakeAck{\t    string fishCoin = 1;\t    map<int32, StakeCat> stakeCats = 2;\t    int64 totalPlayer = 3;\t    int64 totalStake = 4;\t    int64 myStake = 5;\t}\tmessage RetrieveStakeReq{\t    int32 launchId = 1;\t    int32 poolId = 2;\t    int64 retrieveNum = 3;\t}\tmessage RetrieveStakeAck{\t    LaunchPool poolInfo = 1;\t    string fishCoin = 2;\t    map<int32, StakeCat> stakeCats = 3;\t}\tmessage ReceiveLaunchProfitReq{\t    int32 launchId = 1;\t    int32 poolId = 2;\t}\tmessage ReceiveLaunchProfitAck{\t    string wCATI = 1;\t    string waitScore = 2;\t    string gotScore = 3;\t} \tmessage LaunchPoolBonusNtf{\t    int32 launchId = 1;\t    int32 poolId = 2;\t    string addWaitScore = 3;\t    string waitScore = 4;\t}\tmessage EnterGameReq {\t  int32 accountId = 1;\t  int32 serverId = 2;\t  string token = 3;\t  string name = 4;\t  int32 time = 5;\t  int32 sex = 6;         \t  string nickName = 7;   \t  string newNickName = 8;   \t  int32 relogin = 9;     \t  string inviteCode = 10; \t  int32 userId = 11;  \t  int32 bcId = 12;    \t  int32 inviterId = 13; \t  int32 inviterClubId = 14; \t}\tmessage EnterGameAck {\t  int32 code = 1;\t  int32 serverId = 2;\t  UserInfo userInfo = 3;\t  ServerTimeInfo serverTimeInfo = 4;\t  int32 bcId = 5;\t}\tmessage CreateRoleReq {\t  int32 sex = 1; \t  string nickName = 2;\t}\tmessage CreateRoleAck {\t  UserInfo userInfo = 1;\t  ServerTimeInfo serverTimeInfo = 2;\t}\tmessage CommandReq { \t    string command = 1; \t    int32 rev = 2;\t}\tmessage CommandAck { string extra = 1;}\tmessage GetCommentTokenReq {}\tmessage GetCommentTokenAck {\t  string token = 1;\t  int64 ts = 2;\t  int32 militaryGrade = 3;\t}\tmessage UserInfoNtf { UserInfo userInfo = 1; }\tmessage RequestPrePayReq { \t  int32 id = 1; \t}\tmessage RequestPrePayAck {\t  int32 id = 1;  \t  string tonPrice = 2;\t  string mntPrice = 3; \t  string notPrice = 4; \t  string starPrice = 5; \t  string tonoffPrice = 6; \t  string notoffPrice = 7; \t}\tmessage RequestPayReq { \t  int32 id = 1; \t  int32 payType = 2;    \t  string currencyCode = 3;   \t}\tmessage RequestPayAck {\t  PayData payData = 1;\t}\tmessage CheckPayReq { \t  string checkData = 1; \t  PayData payData = 2;\t  string  transId = 3;      \t}\tmessage CheckPayAck {\t  int32 isSucc = 1;\t}\tmessage PayData {\t  int32 rechargeId = 1;\t  string productID = 2;\t  string price = 3;   \t  string orderNo = 4;\t  string payload = 5;    \t  string paylink  = 6; \t  string amount = 7;  \t  string walletAddress = 8;  \t}\tmessage PayClubBoosterReq { \t  int32 clubId = 1;     \t  int32 amount = 2;     \t  int32 payType = 3;    \t  string currencyCode = 4;   \t}\tmessage PayClubBoosterAck {\t  PayData payData = 1;\t}\tmessage BCCheckInReq { \t  int32 checkInType = 1;      \t}\tmessage BCCheckInAck {\t  PayData payData = 1;\t}\tmessage BCCheckInDataReq { \t  int32 checkInType = 1;      \t  PayData payData = 2;\t  string checkInData = 3;\t}\tmessage BCCheckInDataAck { \t  int32 isSucc = 1;\t}\tmessage TonExchangeRateReq {\t}\tmessage TonExchangeRateAck { \t  string Ton2Usd = 1;      \t  string Usd2Ton = 2;      \t  string Mnt2Usd = 3;      \t  string Usd2Mnt = 4;      \t  string Not2Usd = 5;      \t  string Usd2Not = 6;      \t  string Star2Usd = 7;      \t  string Usd2Star = 8;      \t}\tmessage SysMsgNtf { SysMsg msg = 1; }\tmessage SysMsg {\t  int32 msgType = 1; \t  int32 msgId = 2;\t  repeated SysMsgParam param = 3;\t  string msg = 4;\t  int32 extra1 = 5;\t  int32 extra2 = 6;\t}\tmessage WatchMsgReq {\t  int32 watchType = 1;\t  int32 extParam = 2; \t}\tmessage WatchMsgAck {}\tmessage UnWatchMsgReq { int32 watchType = 1; }\tmessage UnWatchMsgAck {}\tmessage StartTurnReq{}\tmessage StartTurnAck{\t    TurnInfo info = 2;\t    repeated string initQuotas = 3; \t}\tmessage TurnInfo{\t    int64 endTime  = 1;\t    string quota = 2;\t    string curQuota = 3;\t    int32 count = 4;\t    int32 useCount = 5; \t    int32 canAddCount = 6; \t    int32 isSybil = 8; \t    int32 iTimes = 9; \t    int32 iCount = 10; \t    int32 isPremium = 11; \t    int32 addCountId = 12; \t    int32 preId = 13; \t}\tmessage TurnInfoReq{}\tmessage TurnInfoAck{\t    TurnInfo info = 1; \t}\tmessage TurnReq{}\tmessage TurnAck{\t    TurnInfo info = 1;\t    string addGold = 2;\t    string gold = 3;\t    string addFishCoin = 4; \t    string fishCoin = 5;\t    string addQuota = 6;\t    int32 addGoldTime = 7;\t    int32 freeCount = 8;\t    int32 turnId = 9;\t}\tmessage ClaimTurnCountReq{}\tmessage ClaimTurnCountAck{\t    TurnInfo info = 1; \t}\tmessage TurnRecord{\t    int32 coinType = 1;  \t    string Val = 2;\t    int64 crateTime = 4;\t    int32 count = 5;\t    int32 turnId = 6;\t}\tmessage TurnRecordReq{}\tmessage TurnRecordAck{\t    repeated TurnRecord record = 1;\t}\tmessage PreHelpOtherTurnReq{\t}\tmessage PreHelpOtherTurnAck{ \t    int32 helpId = 1;\t    string name = 2;\t    int64 icon = 3;\t    int32 hasWaitHelp = 4;  \t    int32 tips = 5;\t}\tmessage HelpOtherTurnReq{\t    int32 userId  = 1;\t}\tmessage HelpOtherTurnAck{\t}\tmessage HelpTurnRecord{\t    int32 id = 1;\t    int64 icon = 2;\t    string name = 3;\t    int64 Time = 4;\t}\tmessage HelpTurnRecordReq{\t}\tmessage HelpTurnRecordAck{\t    repeated HelpTurnRecord records = 1;\t}\tmessage GetOffHelpTurnRecordReq{\t}\tmessage GetOffHelpTurnRecordAck{\t    repeated HelpTurnRecord records = 1;\t    int32 count = 2;\t}\tmessage OtherHelpTurnNtf{\t    int32 userId = 1;\t    int64 icon = 2;\t    string name = 3;\t    int64 Time = 4;\t}\tmessage TurnWithdrawReq{}\tmessage TurnWithdrawAck{\t    string fishCoin = 1;\t    string xZen = 2;\t    string addFishCoin = 3;\t    string addXZen = 4;\t}\tmessage TurnWithdrawRecordReq{\t    int32 page = 1;\t}\tmessage TurnWithdrawRecordAck{\t    repeated TurnWithdrawRecord turnWithdrawRecords = 1;\t    int32 total = 2;\t}\tmessage TurnWithdrawHistoryReq{\t}\tmessage TurnWithdrawHistoryAck{\t    repeated SysMsg list = 1;\t}\tmessage ExDataNtf{\t  ExData exData = 1; \t}\tmessage FishingReq {\t  int32 color = 1; \t  int32 num = 2;\t}\tmessage FishingAck {\t  repeated ItemInfo items = 1; \t  int32 weight = 2;\t  int32 fishId = 3;\t  int32 myOldMax = 4; \t  int32 myNewMax = 5; \t  int32 oldMax = 6;   \t  int32 newMax = 7;   \t  string addgold = 8;\t  string gold = 9;\t  string addFishCoin = 10; \t  string fishCoin = 11;\t  FishData fishData = 12;\t  int32 fomo = 13;\t  int32 times = 14;\t}\tmessage FishRodUpReq{\t}\tmessage FishRodUpAck{\t  int32 FishRodLvl = 1;\t  string fishCoin = 3;\t}\tmessage MyFishInfoReq {}\tmessage MyFishInfoAck {\t  int64 myRank = 1;\t  int32 myScore = 2;\t  int32 myRankKey = 3;\t  string gold = 4; \t  string rewardGold = 5; \t  int64 rewardRank = 6; \t  int32 fishRobLvl = 7;\t}\tmessage GetFishRankRewardReq {}\tmessage GetFishRankRewardAck {\t  repeated ItemInfo Reward = 1; \t}\tmessage FishRankListReq {}\tmessage FishRankListAck {repeated RankUser rankList = 1;}\tmessage FishInfoReq {\t  int32 id = 1; \t}\tmessage FishInfoAck {\t  int32 maxWeight = 1;\t  string name = 2; \t}\tmessage FishRewardPoolReq {}\tmessage FishRewardPoolAck {int64 count = 1;}\tmessage FishHistoryReq {}\tmessage FishHistoryAck {repeated SysMsg list = 1;}\tmessage SyncRechargeNtf {\t  repeated int32 ids = 1; \t}\tmessage ReceiveRechargeReq {int32 id = 1;}\tmessage ReceiveRechargeAck {\t  string addFishCoin = 1;\t  string FishCoin = 2; \t  int32 GoodsId = 3;     \t  string addGold = 4; \t  string Gold = 5; \t  string addXZen = 6; \t  string XZen = 7; \t}\tmessage AccountInfoChangeNtf {\t  int32 status = 1;   \t  string wallet = 2; \t  int64 accountStatusEndTime = 3;\t}\tmessage TokensInfoChangeNtf {\t  TokensChangeInfo info = 1;\t}\tmessage RandomEventChangeNtf{\t    RandomEventData randomEventData = 1;\t}\tmessage GetWalletAddrReq {\t  string rawAddress = 1; \t}\tmessage GetWalletAddrAck {\t  string Address = 1; \t}\t'),
        Laya.Stat.enable()
    }
    function $i() {
        Hi.init();
        P.loadData("cat/data.json").then(t=>(Mmobay.gameDispatcher.event(Mmobay.MEvent.LOAD_PROGRESS, Mmobay.MConst.LOAD_NET),
        P.login.enterGame())).then(t=>{
            t || console.log("enter game error"),
            Hi.instance.play()
        }
        )
    }
    class Ki {
        constructor() {
            this._hideDisconnected = !1,
            this._isFirstLogin = !0,
            this._lastSendPackTm = 0,
            this._lastRecvPackTm = 0
        }
        reqEnterGame(e=!1) {
            let t = pb.EnterGameReq.create();
            var i = Mmobay.Manager.loginMgr.loginData;
            return t.accountId = i.accountId,
            t.userId = i.userId,
            t.name = i.name,
            t.token = i.token,
            t.time = i.time,
            t.bcId = window.mbplatform.blockchainId,
            t.sex = Mmobay.Manager.loginMgr.sex,
            t.nickName = i.nickName,
            t.newNickName = Mmobay.Manager.loginMgr.newNickName,
            t.inviterId = +i.inviterId,
            t.inviterClubId = i.inviterClubId,
            t.relogin = e ? 1 : 0,
            t.inviteCode = i.inviteCode,
            x(t, l.EnterGameReq, pb.IEnterGameAck, {
                noLoading: !0
            }).then(t=>t.code == C.Succ && this.onEnterGameAck(t, e))
        }
        handleErrorAck(t) {
            this._disConnectSocket(),
            Laya.timer.clear(this, this._callLateReconnect),
            ut({
                button: s.Yes,
                msg: ee(t),
                hideClose: !0
            }).then(t=>{}
            )
        }
        handleMaintainErrorAck(t) {
            var e;
            console.log("game.handleMaintainErrorAck"),
            this._disConnectSocket(),
            Laya.timer.clear(this, this._callLateReconnect),
            this._hideDisconnected = !0,
            (w.reconnectcount = 0) < I.id ? ut({
                button: s.Yes,
                msg: ee(t),
                hideClose: !0
            }).then(t=>{
                this.reconnect()
            }
            ) : (e = Laya.Handler.create(null, ()=>{
                w.reconnectcount = 0,
                Laya.timer.clear(this, this._callLateReconnect),
                console.log("click to re enterGame ..."),
                $i()
            }
            ),
            t = {
                type: 0,
                msg: ee(t),
                handler: e
            },
            console.log("game.handleMaintainErrorAck send event : CONNECT_GAME_ERROR"),
            Mmobay.gameDispatcher.event(Mmobay.MEvent.CONNECT_GAME_ERROR, t))
        }
        onEnterGameAck(t, e) {
            var i = Mmobay.Manager.loginMgr.loginData;
            return Date.setStandard(t.serverTimeInfo.serverTime, t.serverTimeInfo.serverZoneTime),
            Date.setServerDate(t.serverTimeInfo.todayZeroTime, t.serverTimeInfo.mondayZeroTime),
            this.loginSucc(t.userInfo, t.serverId, e),
            P.account.initAccount(i),
            this._isFirstLogin = !1,
            this._lastSendPackTm = Date.newDate().getTime(),
            this._lastRecvPackTm = Date.newDate().getTime(),
            e && P.event(y.REENTER_GAME),
            Promise.resolve(!0)
        }
        loginSucc(t, e, i) {
            console.log("loginsucc"),
            this.startHeartBeat(),
            I.init(t),
            D.instance.init()
        }
        enterGame() {
            return this.connectGameServer().then(()=>this.reqEnterGame()).catch(t=>{
                console.log("enterGame error");
                var e = Laya.Handler.create(this, t=>{
                    console.log("click to reconnect ..."),
                    t._disConnectSocket(),
                    w.reconnectcount = 0,
                    $i()
                }
                , [this])
                  , e = {
                    type: 0,
                    msg: k(167),
                    handler: e
                };
                return this._hideDisconnected || Mmobay.gameDispatcher.event(Mmobay.MEvent.CONNECT_GAME_ERROR, e),
                this._hideDisconnected = !1,
                Promise.reject("enterGame error")
            }
            )
        }
        connectGameServer() {
            return this._disConnectSocketPromise().then(()=>{
                return this._watchGameSocket(),
                t = Mmobay.MConfig.addr,
                e = Ue,
                w.isConnected && t == w.addr ? Promise.resolve(void 0) : (w.connect(t),
                w.messageHandler = e,
                clearTimeout(qt),
                new Promise((t,e)=>{
                    w.once(Laya.Event.OPEN, null, ()=>{
                        clearTimeout(qt),
                        t(void 0)
                    }
                    ),
                    w.once(Laya.Event.CLOSE, null, ()=>{
                        clearTimeout(qt),
                        e("socket close")
                    }
                    ),
                    w.once(Laya.Event.ERROR, null, t=>{
                        clearTimeout(qt),
                        e(t || "socket error")
                    }
                    ),
                    qt = setTimeout(()=>{
                        var t = {
                            code: 8,
                            message: "connect timeout"
                        };
                        console.error(t),
                        w.disconnect(!1),
                        e(t)
                    }
                    , 2e4)
                }
                ));
                var t, e
            }
            )
        }
        _disConnectSocketPromise() {
            return new Promise((t,e)=>{
                let i = w;
                i.offAll(),
                i.isConnected ? (i.once(Laya.Event.CLOSE, this, t),
                i.disconnect(!1),
                Laya.Render.isConchApp && w.event(Laya.Event.CLOSE)) : t()
            }
            )
        }
        _watchGameSocket() {
            let t = w;
            t.offAll(),
            t.once(Laya.Event.CLOSE, this, ()=>{
                P.event(y.NET_DISCONNECTED),
                w.reconnectcount++,
                w.autoReconnect && w.reconnectcount < 4 ? this.reconnect() : (console.log("_watchGameSocket " + w.reconnectcount),
                Ct(),
                this._isFirstLogin || this.popDisconnectMsg("gameServer closed"))
            }
            ),
            t.once(Laya.Event.ERROR, this, ()=>{}
            )
        }
        reconnect() {
            nt && nt.show(),
            Laya.timer.clear(this, this._callLateReconnect),
            this._disConnectSocket(),
            P.event(y.NET_DISCONNECTED),
            Laya.timer.once(1e3, this, this._callLateReconnect)
        }
        _callLateReconnect() {
            return this.connectGameServer().then(()=>(Ct(),
            this.reqEnterGame(!0))).then(()=>{
                w.reconnectcount = 0,
                console.log("_callLateReconnect reqEnterGame ok, GameEvent.NET_RECONNECTED"),
                P.event(y.NET_RECONNECTED),
                I.retryUpdateBCCheckIn()
            }
            ).catch(t=>{}
            )
        }
        _disConnectSocket() {
            let t = w;
            t.offAll(),
            t.disconnect(!1),
            this.stopHeartBeat()
        }
        startHeartBeat() {
            this.stopHeartBeat(),
            Laya.timer.loop(1e3, this, this.sendHeartBeat)
        }
        stopHeartBeat() {
            this._lastSendPackTm = 0,
            Laya.timer.clear(this, this.sendHeartBeat)
        }
        sendHeartBeat() {
            var t = Date.newDate().getTime();
            if (9e3 <= t - this._lastRecvPackTm)
                this.reconnect();
            else if (!(t - this._lastSendPackTm < 3e3))
                return x(pb.HeartBeatReq.create(), l.HeartBeatReq, pb.IHeartBeatAck, {
                    noLoading: !0
                }).then(t=>t)
        }
        onHookSendPacket(t, e) {
            this._lastSendPackTm = Date.newDate().getTime()
        }
        onHookRecvPacket(t, e) {
            this._lastRecvPackTm = Date.newDate().getTime()
        }
        onServerState(t, e) {
            t == Ft.game && 1 == e && (this._disConnectSocket(),
            this.popDisconnectMsg())
        }
        popDisconnectMsg(t) {
            w.reconnectcount = 0,
            this.reconnect()
        }
    }
    Mmobay.MConfig.showNetLog && (window.sendCommand = function(e) {
        if (Mmobay.MConfig.showNetLog) {
            let t = pb.CommandReq.create();
            return t.command = e,
            x(t, l.CommandReq, pb.ICommandAck).then(t=>(console.log("command:", e),
            t))
        }
    }
    );
    class zi {
        constructor() {
            this.m_lunchs = [],
            this.stakeCats = {},
            this.isLunchDlg = !1,
            this.boostEndTime = 0,
            this.inviterNum = 0
        }
        reqLunchList() {
            return x(new pb.GetLaunchListReq, l.GetLaunchListReq, pb.IGetLaunchListAck, {
                noLoading: !0
            }).then(t=>(this.m_lunchs = (t.launchList || []).sort((t,e)=>+e.startTime - +t.startTime),
            this.inviterNum = t.inviterNum,
            this.boostEndTime = +t.BoostEndTime,
            P.event("updateLunchList"),
            t))
        }
        reqStack(i, t, s, e=0) {
            let a = new pb.LaunchStakeReq;
            return a.poolId = i,
            a.launchId = s,
            a.stakeNum = t,
            a.isRetrieve = e,
            x(a, l.LaunchStakeReq, pb.ILaunchStakeAck, {
                noLoading: !0
            }).then(t=>{
                I.fishCoin = +t.fishCoin,
                this.stakeCats = t.stakeCats;
                for (var e of this.m_lunchs)
                    if (s == e.id) {
                        e.catPool.id == i ? (e.catPool.totalStake = t.totalStake,
                        e.catPool.myStake = t.myStake,
                        e.catPool.totalPlayer = t.totalPlayer) : e.fishPool.id == i && (e.fishPool.myStake = t.myStake,
                        e.fishPool.totalStake = t.totalStake,
                        e.fishPool.totalPlayer = t.totalPlayer);
                        break
                    }
                u(k(1)),
                P.event(y.UPDATE_OUTPUT),
                P.event(y.UPDATE_LUNCH, !0)
            }
            )
        }
        reqReward(i, s) {
            let t = new pb.ReceiveLaunchProfitReq;
            return t.poolId = i,
            t.launchId = s,
            x(t, l.ReceiveLaunchProfitReq, pb.IReceiveLaunchProfitAck, {
                noLoading: !0
            }).then(t=>{
                for (var e of this.m_lunchs)
                    if (s == e.id) {
                        e.catPool.id == i ? (e.catPool.gotScore = t.gotScore,
                        e.catPool.waitScore = t.waitScore) : e.fishPool.id == i && (e.fishPool.gotScore = t.gotScore,
                        e.fishPool.waitScore = t.waitScore);
                        break
                    }
                I.wCati = t.wCATI,
                u(k(1)),
                P.event(y.UPDATE_LUNCH, !0)
            }
            )
        }
        getNowLunch() {
            var t, e = Date.newDate().getTime();
            let i;
            for (t of this.m_lunchs)
                if (1e3 * +t.endTime > e && +t.startTime < e) {
                    i = t;
                    break
                }
            return i
        }
        updateLunchInfo(e) {
            for (let t = 0; t < this.m_lunchs.length; t++) {
                var i = this.m_lunchs[t];
                if (i.catPool.id == e.id) {
                    this.m_lunchs[t].catPool = e;
                    break
                }
                if (i.fishPool.id == e.id) {
                    this.m_lunchs[t].fishPool = e;
                    break
                }
            }
        }
        checkCatLunch(t) {
            var e = Date.newDate().getTime()
              , t = this.stakeCats[t];
            return !!(t && e < 1e3 * +t.endTime)
        }
        getLunchById(t) {
            let e = null;
            for (var i of this.m_lunchs)
                if (t == i.id) {
                    e = i;
                    break
                }
            return e
        }
    }
    class ji {
        constructor() {
            this.clubInfo = null,
            this.statusImgArr = []
        }
        reqClubInfo(e) {
            let t = new pb.ClubInfoReq;
            return t.id = e,
            x(t, l.ClubInfoReq, pb.IClubInfoAck).then(t=>(this.clubInfo && this.clubInfo.id == e && (this.clubInfo = t.club,
            P.event(y.CLUB_UPDATE)),
            t))
        }
        reqJoinClub(t) {
            let e = new pb.JoinClubReq;
            return e.id = t,
            x(e, l.JoinClubReq, pb.IJoinClubAck).then(t=>(this.clubInfo = t.club,
            P.event(y.CLUB_UPDATE),
            t))
        }
        reqQuitClub() {
            return x(new pb.QuitClubReq, l.QuitClubReq, pb.IQuitClubAck).then(t=>(this.clubInfo = null,
            P.event(y.CLUB_UPDATE),
            t))
        }
        reqGetRecruitListClub() {
            return x(new pb.GetRecruitClubListReq, l.GetRecruitClubListReq, pb.IGetRecruitClubListAck).then(t=>t.list)
        }
        reqGetGoldRankList(t=0, e=0) {
            let i = new pb.GetGoldRankListReq;
            return i.league = t,
            i.timeType = e,
            x(i, l.GetGoldRankListReq, pb.IGetGoldRankListAck).then(t=>t)
        }
        reqGetClubGoldRankList(t=0, e=0) {
            let i = new pb.GetClubGoldRankListReq;
            return i.league = t,
            i.timeType = e,
            x(i, l.GetClubGoldRankListReq, pb.IGetClubGoldRankListAck).then(t=>t)
        }
        reqGetMyRank() {
            return x(new pb.GetMyRankReq, l.GetMyRankReq, pb.IGetMyRankAck).then(t=>(I.rankGold = t.rankGold,
            I.rankGoldRank = t.rank,
            I.rankLeague = t.league,
            P.event("leaguechange"),
            t))
        }
        reqClubMemberRank(t, e=0) {
            let i = new pb.ClubMemberRankReq;
            return i.id = t,
            i.timeType = e,
            x(i, l.ClubMemberRankReq, pb.IClubMemberRankAck).then(t=>t)
        }
        reqGetStats() {
            return x(new pb.GetStatsReq, l.GetStatsReq, pb.IGetStatsAck).then(t=>(this.statusImgArr = t.icons || [],
            t))
        }
        getLeagueByScore(e) {
            let t = Data.gameConf.initCfg.minerLeagues.split(",");
            return t.findIndex(t=>e < +t) - 1
        }
        getRandomIco(e) {
            let i = this.statusImgArr.slice();
            for (let t = 0; t < e; t++) {
                var s = t + Math.floor(Math.random() * (i.length - t));
                [i[t],i[s]] = [i[s], i[t]]
            }
            let t = i.slice(0, e);
            return I.icon && -1 == t.indexOf(I.icon) && t.splice(2, 0, I.icon),
            t
        }
    }
    class Zi extends t.cat.views.common.SystemNoticeUI {
        static showSystemMsg(t) {
            Zi.s_msgData.push(t),
            Zi.s_loadinged ? Zi.s_instance && Zi.s_instance.reset() : (Zi.s_loadinged = !0,
            _(Zi, {}).then(t=>{
                (Zi.s_instance = t).top = 200,
                t.centerX = 0,
                _t(t, c.System),
                t.playMsg()
            }
            ))
        }
        onAwake() {
            super.onAwake(),
            this.mouseEnabled = !1,
            this.mouseThrough = !0,
            Object.assign(this.m_div_Tip.style, {
                fontSize: 18,
                bold: !0,
                color: "#FFFFFF",
                leading: 3,
                wordWrap: !0
            }),
            this.m_div_Tip._element.width = 2e3
        }
        onDestroy() {
            super.onDestroy(),
            Zi.s_loadinged = !1,
            Zi.s_instance = null
        }
        reset() {
            this.m_tl && (this.m_tl.destroy(),
            this.m_tl = null),
            Zi.s_msgData.length ? this.playMsg() : (this.m_div_Tip.innerHTML = "",
            this.visible = !1,
            this.destroy())
        }
        playMsg() {
            var t = Zi.s_msgData.shift()
              , t = (this.m_div_Tip._element.width = 2500,
            this.m_div_Tip.innerHTML = t,
            this.m_div_Tip.contextWidth < this.m_pan_Con.width ? (t = (this.m_pan_Con.width - this.m_div_Tip.contextWidth) / 2,
            this.m_div_Tip.x = t < 140 ? 140 : t) : this.m_div_Tip.x = 140,
            this.visible = !0,
            this.m_tl = new Laya.TimeLine,
            +this.m_div_Tip.contextWidth + 100)
              , e = 1e3 * Math.floor(t / 100);
            this.m_tl.to(this.m_div_Tip, {
                x: -t
            }, e, null, 1500),
            this.m_tl.once(Laya.Event.COMPLETE, this, ()=>{
                this.reset()
            }
            ),
            this.m_tl.play()
        }
    }
    Zi.s_loadinged = !1,
    Zi.s_msgData = [];
    class Ji {
        constructor() {
            this.watchTypes = {}
        }
        updateSys(t) {
            switch (t.msg.msgType) {
            case Rt.roll:
                var e = this.parseSysMsg(t.msg);
                Zi.showSystemMsg(e);
                break;
            case Rt.fish:
                P.event(y.UPDATE_FISH_SYS, t.msg)
            }
        }
        reqUnWatch(e) {
            if (e) {
                let t = pb.UnWatchMsgReq.create();
                return t.watchType = e,
                delete this.watchTypes[e],
                x(t, l.UnWatchMsgReq, pb.IUnWatchMsgAck, {
                    noLoading: !0
                })
            }
        }
        reqFishHistory() {
            return x(pb.FishHistoryReq.create(), l.FishHistoryReq, pb.IFishHistoryAck).then(t=>t)
        }
        reqWatch(e) {
            if (e) {
                let t = pb.WatchMsgReq.create();
                return t.watchType = e,
                this.watchTypes[e] = 1,
                x(t, l.WatchMsgReq, pb.IWatchMsgAck, {
                    noLoading: !0
                })
            }
        }
        reEnterGame() {
            for (var t in this.watchTypes)
                this.reqWatch(parseInt(t))
        }
        parseSysMsg(t) {
            if (t.msg && !t.msgId)
                return t.msg;
            var e, i;
            let s = [];
            for (e of t.param)
                e.valType == Mt.lang ? s.push(k(+e.val)) : e.valType == Mt.copper ? (i = e.val,
                s.push(f(i / 60) + "min<img style='height: 20px;width:20px' src='cat/ui_home/img_main_iconsmall_gold.png' />")) : e.valType == Mt.fishcoin ? s.push(+e.val + "<img style='height: 20px;width:20px' src='cat/ui_item/8.png' />") : e.valType == Mt.fishweight ? s.push(+e.val / 1e3 + "t") : s.push((i = e.val,
                !1 ? i.replace(" & ", function(t) {
                    return {
                        " & ": "&amp;"
                    }[t]
                }) : i.replace(/[<>&]/g, function(t) {
                    return {
                        "<": "&lt;",
                        ">": "&gt;",
                        "&": "&amp;"
                    }[t]
                })));
            t = Data.getSysMsg(t.msgId);
            return t ? k(t.msg, s) : ""
        }
    }
    class Qi {
        constructor() {
            this.m_helpShowArr = []
        }
        initTable() {
            this.reqStart()
        }
        reqClaimCount() {
            var t = new pb.ClaimTurnCountReq;
            let e = this.tableInfo.canAddCount;
            return x(t, l.ClaimTurnCountReq, pb.IClaimTurnCountAck).then(t=>{
                this.tableInfo = t.info,
                P.event(y.UPDATE_TABLE),
                m(Li, {
                    params: [e]
                })
            }
            )
        }
        reqTableInfo() {
            return x(new pb.TurnInfoReq, l.TurnInfoReq, pb.ITurnInfoAck).then(t=>(this.tableInfo = t.info,
            t))
        }
        reqSpin() {
            return x(new pb.TurnReq, l.TurnReq, pb.ITurnAck).then(t=>(this.tableInfo = t.info,
            t.addFishCoin ? I.fishCoin = +t.fishCoin : t.addGold ? I.gold = +t.gold : P.event("startSpin", [t.addQuota]),
            this.m_lastInfo = t))
        }
        reqStart() {
            return x(new pb.StartTurnReq, l.StartTurnReq, pb.IStartTurnAck).then(t=>(this.tableInfo = t.info,
            t.initQuotas))
        }
        reqPreHelpOtherTurn() {
            return x(pb.PreHelpOtherTurnReq.create(), l.PreHelpOtherTurnReq, pb.IPreHelpOtherTurnAck).then(t=>t)
        }
        reqHelpRecord() {
            return x(pb.HelpTurnRecordReq.create(), l.HelpTurnRecordReq, pb.IHelpTurnRecordAck).then(t=>t.records)
        }
        reqSpinRecord() {
            return x(pb.TurnRecordReq.create(), l.TurnRecordReq, pb.ITurnRecordAck).then(t=>t.record)
        }
        reqHelpOtherTurn(t=0) {
            let e = pb.HelpOtherTurnReq.create();
            return e.userId = t,
            x(e, l.HelpOtherTurnReq, pb.IHelpOtherTurnAck).then(t=>t)
        }
        reqWithdRecord() {
            return x(pb.TurnWithdrawRecordReq.create(), l.TurnWithdrawRecordReq, pb.ITurnWithdrawRecordAck).then(t=>t.turnWithdrawRecords)
        }
        reqGetOffHelpTurnRecord() {
            return x(pb.GetOffHelpTurnRecordReq.create(), l.GetOffHelpTurnRecordReq, pb.IGetOffHelpTurnRecordAck).then(t=>t)
        }
        reqTurnWithdrawHistory() {
            return x(pb.TurnWithdrawHistoryReq.create(), l.TurnWithdrawHistoryReq, pb.ITurnWithdrawHistoryAck).then(t=>t)
        }
        reqTurnWithdraw() {
            return x(pb.TurnWithdrawReq.create(), l.TurnWithdrawReq, pb.ITurnWithdrawAck).then(t=>(t.fishCoin && (I.fishCoin = +t.fishCoin),
            t.xZen && (I.xZen = t.xZen),
            t))
        }
        getDiamondByPrice(t) {
            let e = (t + "").split(".");
            return e[1] ? +((1e6 * +t - 1e6 * (+e[0] + "." + e[1].slice(0, 2))) / 500).toFixed(3) : 0
        }
        onOtherHelpTurnNtf(t) {
            this.m_helpShowArr.push(t),
            P.event(y.HELP_TURN_ADD_CHECK)
        }
        checkHelpShowArr(e) {
            var t;
            this.m_helpShowArr.length && (t = this.m_helpShowArr,
            d(Ai, {
                params: [t, t.length]
            }).then(t=>{
                t.wait().then(()=>{
                    e && e(),
                    P.event(y.UPDATE_TABLE_TIME),
                    this.checkHelpShowArr()
                }
                )
            }
            ),
            this.m_helpShowArr = [])
        }
        getInviteCopyLink() {
            let t = `https://t.me/${Zt()}/gameapp?startapp=`;
            P.club.clubInfo && P.club.clubInfo.id ? t += `r_${P.club.clubInfo.id}_` + I.id : t += "rp_" + I.id,
            window.mbplatform.clipboard(t),
            u("link copied!")
        }
    }
    class ts {
        constructor() {
            this._userName = "",
            this._twitterName = "",
            this._taskFish = 0,
            this._basicTasks = [],
            this._dailyTasks = [],
            this._twitterTasks = [],
            this._premiumTasks = [],
            this._signinAchievements = [],
            this._normalInviteAchievements = [],
            this._premiumInvitAchievements = [],
            this._rechargeAchievements = [],
            this._signInDays = 0,
            this._normalInvites = 0,
            this._premiumInvites = 0,
            this._rechargeValues = 0,
            this._claimMntStatus = 0
        }
        get initialized() {
            return this._initialized
        }
        get accountName() {
            return this._accountName
        }
        get userName() {
            return this._userName
        }
        get userIcon() {
            return this._userIcon
        }
        get twitterName() {
            return this._twitterName
        }
        get taskFish() {
            return this._taskFish
        }
        get basicTasks() {
            return this._basicTasks
        }
        get dailyTasks() {
            return this._dailyTasks
        }
        get twitterTasks() {
            return this._twitterTasks
        }
        get premiumTasks() {
            return this._premiumTasks
        }
        get signinAchievements() {
            return this._signinAchievements
        }
        get normalInviteAchievements() {
            return this._normalInviteAchievements
        }
        get premiumInvitAchievements() {
            return this._premiumInvitAchievements
        }
        get rechargeAchievements() {
            return this._rechargeAchievements
        }
        get signInDays() {
            return this._signInDays
        }
        get normalInvites() {
            return this._normalInvites
        }
        get premiumInvites() {
            return this._premiumInvites
        }
        get rechargeValues() {
            return this._rechargeValues
        }
        get claimMntStatus() {
            return this._claimMntStatus
        }
        getTaskData(e) {
            let i = this._basicTasks.length;
            for (let t = 0; t < i; t++) {
                var s = this._basicTasks[t];
                if (s.taskId == e)
                    return s
            }
            i = this._dailyTasks.length;
            for (let t = 0; t < i; t++) {
                var a = this._dailyTasks[t];
                if (a.taskId == e)
                    return a
            }
            i = this._twitterTasks.length;
            for (let t = 0; t < i; t++) {
                var n = this._twitterTasks[t];
                if (n.taskId == e)
                    return n
            }
            i = this._premiumTasks.length;
            for (let t = 0; t < i; t++) {
                var o = this._premiumTasks[t];
                if (o.taskId == e)
                    return o
            }
            i = this._normalInviteAchievements.length;
            for (let t = 0; t < i; t++) {
                var r = this._normalInviteAchievements[t];
                if (r.taskId == e)
                    return r
            }
            i = this._premiumInvitAchievements.length;
            for (let t = 0; t < i; t++) {
                var h = this._premiumInvitAchievements[t];
                if (h.taskId == e)
                    return h
            }
            i = this._signinAchievements.length;
            for (let t = 0; t < i; t++) {
                var l = this._signinAchievements[t];
                if (l.taskId == e)
                    return l
            }
            i = this._rechargeAchievements.length;
            for (let t = 0; t < i; t++) {
                var c = this._rechargeAchievements[t];
                if (c.taskId == e)
                    return c
            }
            return null
        }
        checkBasicTaskAllCompleted() {
            var e = this._basicTasks.length;
            for (let t = 0; t < e; t++)
                if (1 != this._basicTasks[t].receiveReward)
                    return !1;
            return !0
        }
        checkTwitterTaskAllCompleted() {
            var e = this._twitterTasks.length;
            for (let t = 0; t < e; t++)
                if (1 != this._twitterTasks[t].receiveReward)
                    return !1;
            return !0
        }
        checkPremiumTaskAllCompleted() {
            var e = this._premiumTasks.length;
            for (let t = 0; t < e; t++)
                if (1 != this._premiumTasks[t].receiveReward)
                    return !1;
            return !0
        }
        checkAchievementReceiveReward() {
            var e = this._signinAchievements.concat(this._normalInviteAchievements, this._premiumInvitAchievements, this._rechargeAchievements)
              , i = e.length;
            for (let t = 0; t < i; t++) {
                var s = e[t];
                if (s.completedValue >= s.targetValue && 0 == s.receiveReward)
                    return !0
            }
            return !1
        }
        reqGetTaskInfo(t=!0) {
            return this.request("api/task/taskinfo", "get", {}, t).then(t=>{
                let e = t.normaltaskcfgs || []
                  , r = t.normaltask.tasks || {}
                  , h = []
                  , l = []
                  , c = []
                  , i = (e.forEach(t=>{
                    var e, i = t.taskid, s = t.eventtype, a = parseInt(t.reward.fishcoin) || 0, n = t.target, o = r[i];
                    !o || Mmobay.MConfig.isTonKeeper && -1 == re.indexOf(s) || (e = o.value || 0,
                    o = o.reward || 0,
                    i = {
                        taskId: i,
                        kind: t.kind,
                        eventType: s,
                        sort: t.sort,
                        icon: t.icon,
                        title: t.title,
                        descript: t.descript,
                        rewardFish: a,
                        targetValue: n,
                        completedValue: e,
                        receiveReward: o
                    },
                    (s == T.becomePremium || s == T.premiumBoots ? l : s == T.retweenTitter ? c : h).push(i))
                }
                ),
                h.sort((t,e)=>t.sort - e.sort),
                c.sort((t,e)=>t.sort - e.sort),
                t.dailytaskcfgs || [])
                  , m = t.dailytask.tasks || {}
                  , d = []
                  , s = (i.forEach(t=>{
                    var e, i = t.taskid, s = t.eventtype, a = parseInt(t.reward.fishcoin) || 0, n = t.target, o = m[i];
                    !o || Mmobay.MConfig.isTonKeeper && -1 == re.indexOf(s) || (e = o.value || 0,
                    o = o.reward || 0,
                    i = {
                        taskId: i,
                        kind: t.kind,
                        eventType: s,
                        sort: t.sort,
                        icon: t.icon,
                        title: t.title,
                        descript: t.descript,
                        rewardFish: a,
                        targetValue: n,
                        completedValue: e,
                        receiveReward: o
                    },
                    d.push(i))
                }
                ),
                d.sort((t,e)=>t.sort - e.sort),
                t.achievementtaskcfgs || [])
                  , _ = t.achievementtask.tasks || {}
                  , u = []
                  , p = []
                  , g = []
                  , C = [];
                s.forEach(t=>{
                    var e, i, s = t.taskid, a = parseInt(t.reward.fishcoin) || 0, n = t.target, o = _[s];
                    o && (e = o.value || 0,
                    o = o.reward || 0,
                    i = t.eventtype,
                    s = {
                        taskId: s,
                        kind: t.kind,
                        eventType: i,
                        sort: t.sort,
                        icon: t.icon,
                        title: t.title,
                        descript: t.descript,
                        rewardFish: a,
                        targetValue: n,
                        completedValue: e,
                        receiveReward: o
                    },
                    i == T.inviteTotalUser ? p.push(s) : i == T.invitePremiumUser ? g.push(s) : i == T.cumulativeRecharge ? C.push(s) : i == T.continuousSignIn && u.push(s))
                }
                ),
                this.formatAchievementIcon(p),
                this.formatAchievementIcon(g),
                this.formatAchievementIcon(C),
                this.formatAchievementIcon(u);
                var a = t.shortaccountinfo
                  , a = (this._accountName = a.name,
                this._userName = a.tguserfirstname + " " + a.tguserlastname,
                this._userIcon = a.icon,
                this._twitterName = a.twittername || "",
                this._claimMntStatus = t.actsignstatus || 0,
                t.fishcoin || 0);
                return this._signInDays = t.currentcumulativecheckindays || 0,
                this._normalInvites = t.currentinvitenewcomertotal || 0,
                this._premiumInvites = t.currentinvitepremiumnewcomercount || 0,
                this._rechargeValues = t.currentcumulativerecharge || 0,
                this._taskFish = a,
                this._basicTasks = h,
                this._dailyTasks = d,
                this._premiumTasks = l,
                this._twitterTasks = c,
                this._signinAchievements = u,
                this._normalInviteAchievements = p,
                this._premiumInvitAchievements = g,
                this._rechargeAchievements = C,
                this._initialized = !0,
                P.event(y.TASK_UPDATE_LIST),
                {
                    fish: a,
                    basicTasks: h,
                    dailyTasks: d,
                    signinAchievements: u,
                    normalInviteAchievements: p,
                    premiumInvitAchievements: g,
                    rechargeAchievements: C
                }
            }
            )
        }
        reqUpdateTask(t, e=!0) {
            return this.request("api/task/update", "post", {
                taskid: t
            }, e).then(t=>{
                console.log("task update")
            }
            )
        }
        reqCheckTask(d, t=!0) {
            return this.request("api/task/check", "post", {
                taskid: d
            }, t).then(i=>{
                var t = i.ret
                  , s = i.addfishcoin || 0;
                if (0 == t && 0 < s) {
                    this._taskFish = i.fishcoin;
                    var a = i.currentcumulativecheckindays || 0
                      , n = i.currentinvitenewcomertotal || 0
                      , o = i.currentinvitepremiumnewcomercount || 0
                      , r = i.currentcumulativerecharge || 0;
                    let t = !1
                      , e = (this._signInDays != a && (this._signInDays = a,
                    t = !0),
                    this._normalInvites != n && (this._normalInvites = n,
                    t = !0),
                    this._premiumInvites != o && (this._premiumInvites = o,
                    t = !0),
                    this._rechargeValues != r && (this._rechargeValues = r,
                    t = !0),
                    t && P.event(y.TASK_UPDATE_COUNT),
                    this.getTaskData(d));
                    if (e.completedValue = i.taskinfo.value,
                    e.receiveReward = i.taskinfo.reward,
                    P.event(y.TASK_PLAY_SCORE, s),
                    P.event(y.TASK_UPDATE_STATE, d),
                    i.achievementtask) {
                        var h = i.achievementtask.tasks || {};
                        let e = [];
                        for (const m in h) {
                            var l, c = parseInt(m);
                            let t = this.getTaskData(c);
                            t ? (l = h[m].value) != t.completedValue && (t.completedValue = l,
                            e.push(c)) : console.log("task data is null==>" + c)
                        }
                        0 < e.length && P.event(y.TASK_UPDATE_ACHIEVEMENT, [e])
                    }
                }
                a = i.twittername || "",
                this._twitterName != a && (this._twitterName = a,
                P.event(y.UPDATE_TWITTER_STATUS)),
                n = i.goto || "",
                o = i.goto2 || n;
                return {
                    ret: t,
                    addFish: s,
                    payload: i.payload || "",
                    goto: n,
                    goto2: o,
                    extra: i.extra || "",
                    twitterStatus: i.twitterstatus
                }
            }
            )
        }
        reqRevokeTwitter(t=!0) {
            return this.request("api/twitter/revoke", "get", {}, t).then(t=>{
                t = t.ret;
                return 0 == t && (this._twitterName = "",
                P.event(y.UPDATE_TWITTER_STATUS)),
                0 == t
            }
            )
        }
        reqCheckTwitterStatus(t=!0) {
            return this.request("api/twitter/check", "get", {}, t).then(t=>{
                var e = t.twittername || "";
                return this._twitterName != e && (this._twitterName = e,
                P.event(y.UPDATE_TWITTER_STATUS)),
                {
                    status: t.twitterstatus,
                    url: t.goto || ""
                }
            }
            )
        }
        reqClaimMntSignMessage(t, e, i=!0) {
            return this.request("api/task/signethmessage", "post", {
                address: t,
                msg: e
            }, i).then(t=>{
                t = t.ret;
                return 0 == t && (this._claimMntStatus = 1),
                0 == t
            }
            )
        }
        reqCheckCalimMntStatus(t=!0) {
            return this.request("api/task/actsigninfo", "get", {}, t).then(t=>{
                t = t.actsignstatus;
                return this._claimMntStatus = t
            }
            )
        }
        request(t, e, i, s=!0) {
            let a = Mmobay.Manager.loginMgr.loginData.webToken;
            if (a || Mmobay.MConfig.channelId != Mmobay.MConst.CHANNEL_LOCAL || (n = window.GameUrlParas || {},
            a = n.webToken),
            !a)
                return Promise.reject({
                    code: 0,
                    message: "Authorization token invalid"
                });
            var n = {
                showLoading: s,
                retryTimes: 3
            }
              , s = "" + Mmobay.MConfig.taskApiUrl + t
              , t = ["Authorization", "bearer " + a];
            return "post" == e.toLocaleLowerCase() && (i = JSON.stringify(i)),
            ie(s, e, i, n, t).then(t=>t.data)
        }
        formatAchievementIcon(t) {
            let e = [].concat(t)
              , i = (e.sort((t,e)=>t.rewardFish - e.rewardFish),
            {});
            for (let t = 0; t < e.length; t++) {
                var s = e[t].taskId
                  , a = t <= 7 ? t : 7;
                i[s] = `cat/ui_task/coin_fish_${a}.png`
            }
            t.forEach(t=>{
                t.icon = i[t.taskId]
            }
            )
        }
    }
    class es {
        constructor() {
            if (this.m_convertAddress = "",
            this.m_jettonWalletAddress = "",
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE)
                return Laya.Browser.onMobile ? void CatizenWallet.Caller.init(Mmobay.MConfig.chainNet, !Mmobay.MConfig.isMantleRelease) : (CatizenWallet.Provider.init(Mmobay.MConfig.chainNet, !Mmobay.MConfig.isMantleRelease),
                void CatizenWallet.Provider.subscribe(t=>{
                    t.connected ? P.event(y.WALLET_CONNECTED) : P.event(y.WALLET_DISCONNECT)
                }
                ));
            let t = this.m_tonConnect = new window.TON_CONNECT_UI.TonConnectUI({
                manifestUrl: Mmobay.MConfig.tonConnectManifestUrl
            });
            t.setConnectRequestParameters({
                state: "ready",
                value: {
                    tonProof: "success"
                }
            }),
            t.connectionRestored.then(t=>{
                t ? (console.log("Connection restored."),
                P.event(y.WALLET_CONNECTED)) : console.log("Connection was not restored.")
            }
            )
        }
        get connected() {
            return Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE ? !Laya.Browser.onMobile && CatizenWallet.Provider.connected : this.m_tonConnect.connected
        }
        connect() {
            return Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE ? Laya.Browser.onMobile ? Promise.reject("not support") : CatizenWallet.Provider.connect() : (Laya.Browser.onPC && window.mbplatform.disableClosingConfirmation(),
            new Promise((e,i)=>{
                const s = this.m_tonConnect.onStatusChange(t=>{
                    if (console.log("onStatusChange==>" + JSON.stringify(t)),
                    s(),
                    !t)
                        return i("wallet info is null");
                    t = t.account.address;
                    P.event(y.WALLET_CONNECTED),
                    e(t)
                }
                )
                  , a = this.m_tonConnect.onModalStateChange(t=>{
                    console.log("onModalStateChange==>" + JSON.stringify(t)),
                    "closed" == t.status && (a(),
                    "wallet-selected" != t.closeReason && (s(),
                    i("failed")))
                }
                );
                this.m_tonConnect.uiOptions = {
                    actionsConfiguration: {
                        twaReturnUrl: this.formatBotLink()
                    }
                },
                this.m_tonConnect.openModal().then(()=>{
                    console.log("openModal success")
                }
                ).catch(t=>{
                    console.log("openModal error==>" + JSON.stringify(t)),
                    s(),
                    a(),
                    i("open modal error")
                }
                )
            }
            ))
        }
        disconnect() {
            return Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE ? Laya.Browser.onMobile ? Promise.reject("not support") : CatizenWallet.Provider.disconnect().then(()=>{
                Laya.timer.once(100, this, ()=>{
                    P.event(y.WALLET_DISCONNECT)
                }
                )
            }
            ) : this.m_tonConnect.disconnect().then(()=>{
                this.m_convertAddress = "",
                this.m_jettonWalletAddress = "",
                Laya.timer.once(100, this, ()=>{
                    P.event(y.WALLET_DISCONNECT)
                }
                )
            }
            )
        }
        sendTransaction(t) {
            let s = t.amount
              , a = t.address
              , n = t.payload;
            var e = t.transactionType
              , i = ae[t.walletType];
            if (Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE) {
                var o = "" + I.id + Date.now();
                if (e == Ht.gameSignin)
                    return Laya.Browser.onMobile ? CatizenWallet.Caller.gameSignIn(i, o, n) : CatizenWallet.Provider.gameSignIn(n);
                if (e == Ht.taskSignin)
                    return Laya.Browser.onMobile ? CatizenWallet.Caller.taskSignIn(i, o, n) : CatizenWallet.Provider.taskSignIn(n);
                if (e == Ht.recharge)
                    return Laya.Browser.onMobile ? CatizenWallet.Caller.recharge(i, o, s + "", n) : CatizenWallet.Provider.recharge(s + "", n);
                if (e == Ht.deposit)
                    return Laya.Browser.onMobile ? CatizenWallet.Caller.deposit(i, o, t.tokenId, s + "", n) : CatizenWallet.Provider.deposit(t.tokenId, s + "", n)
            }
            return Laya.Browser.onPC && window.mbplatform.disableClosingConfirmation(),
            new Promise((e,i)=>{
                this.m_tonConnect.uiOptions = {
                    actionsConfiguration: {
                        twaReturnUrl: this.formatBotLink()
                    }
                };
                var t = {
                    validUntil: Math.floor(Date.now() / 1e3) + 600,
                    messages: [{
                        address: a,
                        amount: s,
                        payload: n
                    }]
                };
                this.m_tonConnect.sendTransaction(t).then(t=>{
                    console.log("transaction success"),
                    e(t.boc)
                }
                ).catch(t=>{
                    console.log("transaction error==>" + JSON.stringify(t)),
                    i()
                }
                )
            }
            )
        }
        signMessage(s=g.Other) {
            return new Promise((e,t)=>{
                return Mmobay.MConfig.channelId != Mmobay.MConst.CHANNEL_MANTLE ? t("not support") : (t = "hello catizen",
                Laya.Browser.onMobile ? (i = P.task.accountName + Date.now(),
                void CatizenWallet.Caller.signMessage(ae[s], i, t).then(t=>{
                    e({
                        address: t.address,
                        message: t.signMessage
                    })
                }
                )) : void CatizenWallet.Provider.signMessage(t).then(t=>{
                    e({
                        address: t.address,
                        message: t.signMessage
                    })
                }
                ));
                var i
            }
            )
        }
        convertAddress() {
            return new Promise((e,t)=>{
                if (this.connected)
                    if (Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE) {
                        if (Laya.Browser.onMobile)
                            return t("not support");
                        var i = CatizenWallet.Provider.address;
                        e(i)
                    } else
                        this.m_convertAddress ? e(this.m_convertAddress) : (i = this.m_tonConnect.wallet.account.address,
                        I.getWalletAddress(i).then(t=>{
                            this.m_convertAddress = t.Address,
                            e(t.Address)
                        }
                        ).catch(()=>{
                            t("convert address error")
                        }
                        ));
                else
                    t("wallet disconnect!")
            }
            )
        }
        getTokenPayload(s, a, n) {
            return new Promise((e,i)=>{
                var t = this.m_tonConnect.wallet.account.address;
                ie(Mmobay.MConfig.payloadUrl + `/api/ton/getTokenPayload/NOT/${t}/${n}/${s}/` + a, "get", {}, {
                    showLoading: !0,
                    retryTimes: 3
                }).then(t=>{
                    t = t.data.payload;
                    e(t)
                }
                ).catch(t=>{
                    i({
                        code: oe.unknow,
                        message: "Net error"
                    })
                }
                )
            }
            )
        }
        getJettonWalletAddress() {
            return new Promise((e,i)=>{
                var t;
                this.m_jettonWalletAddress ? e(this.m_jettonWalletAddress) : (t = {
                    owner_address: this.m_tonConnect.wallet.account.address,
                    jetton_address: Mmobay.MConfig.jettonAddress,
                    limit: "1",
                    offset: "0"
                },
                ie(Mmobay.MConfig.tonCenterUrl, "get", t, {
                    showLoading: !0,
                    retryTimes: 3
                }).then(t=>{
                    t = null == (t = t.jetton_wallets[0]) ? void 0 : t.address;
                    t ? (this.m_jettonWalletAddress = t,
                    e(t)) : i({
                        code: oe.insufficientFunds,
                        message: "insufficient funds"
                    })
                }
                ).catch(t=>{
                    i({
                        code: oe.unknow,
                        message: "Net error"
                    })
                }
                ))
            }
            )
        }
        getWalletType() {
            let t = g.Other;
            if (!this.connected)
                return t;
            var e = {
                Wallet: g.TgWallet,
                Tonkeeper: g.Tonkeeper,
                MetaMask: g.MetaMask,
                "OKX Wallet": g.OKX,
                "Bitget Wallet": g.Bitget
            };
            let i = "";
            if (Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE) {
                if (Laya.Browser.onMobile)
                    return t;
                i = CatizenWallet.Provider.walletName
            } else {
                var s = this.m_tonConnect.walletInfo;
                s && (i = s.name)
            }
            return t = e[i] || g.Other
        }
        formatBotLink() {
            return `https://t.me/${Zt()}/gameapp?startapp=open_` + I.releaseLink()
        }
    }
    class is extends Laya.EventDispatcher {
        constructor() {
            super(...arguments),
            this._dataLoaded = !1,
            this.langJsonUrl = ""
        }
        init() {
            this.table = new Qi,
            this.lunch = new zi,
            this.sysNotice = new Ji,
            this.fish = new Ne,
            this.account = new he,
            this.wallet = new es,
            this.login = new Ki,
            this.bag = new le,
            this.cat = new Me,
            this.club = new ji,
            this.invite = new Pe,
            this.task = new ts
        }
        loadData(i, s=!1) {
            return new Promise((e,t)=>{
                Laya.loader.loadP(i).then(()=>{
                    var t;
                    Data.buildData(Laya.Loader.getRes(i)),
                    Laya.loader.clearRes(i),
                    "" != P.langJsonUrl && (t = Laya.Loader.getRes(P.langJsonUrl)) && (Data.buildData(t),
                    Laya.loader.clearRes(P.langJsonUrl)),
                    s && (this._dataLoaded = !0,
                    this.dispatch(y.DATA_LOADED)),
                    e(0)
                }
                )
            }
            )
        }
        get dataLoaded() {
            return this._dataLoaded
        }
        dispatch(...t) {
            t.forEach(t=>this.event(t))
        }
    }
    var P = new is;
    Mmobay.MConfig.showNetLog && (window.manager = P);
    class ss extends t.cat.views.common.CountViewUI {
        constructor() {
            super(...arguments),
            this.m_count = 0,
            this.m_times = 1,
            this.m_clickTimes = []
        }
        get count() {
            return this.m_count
        }
        set count(t) {
            this.m_count = t,
            this.m_sli_Count.value = this.m_count,
            this.onChangeCount()
        }
        onDestroy() {
            super.onDestroy(),
            this.m_btn_Minus.offAll(),
            this.m_btn_Plus.offAll(),
            Laya.timer.clearAll(this)
        }
        setData(t=10, e=100, i=0, s=1022, a=1, n=1) {
            this.m_txtLang = s,
            this.m_times = n,
            0 < t ? this.m_step = t : (t = Math.abs(t),
            this.m_step = Math.ceil((e - i) * t / 100)),
            this.m_sli_Count.value = 0,
            this.m_sli_Count.max = e,
            this.m_sli_Count.min = i,
            this.m_sli_Count.value = a,
            this.onChangeCount(),
            this.m_btn_Minus.offAll(),
            this.m_btn_Plus.offAll(),
            this.m_btn_Minus.on(Laya.Event.MOUSE_DOWN, this, t=>{
                Laya.timer.once(500, this, ()=>{
                    Laya.timer.loop(100, this, ()=>{
                        this.onClickMinus(t, !1)
                    }
                    )
                }
                ),
                Laya.timer.once(5e3, this, ()=>{
                    Laya.timer.clearAll(this),
                    Laya.timer.loop(30, this, ()=>{
                        this.onClickMinus(t, !1)
                    }
                    )
                }
                ),
                this.m_btn_Minus.scale(.8, .8)
            }
            ),
            this.m_btn_Plus.on(Laya.Event.MOUSE_DOWN, this, t=>{
                Laya.timer.once(500, this, ()=>{
                    Laya.timer.loop(100, this, ()=>{
                        this.onClickPlus(t, !1)
                    }
                    )
                }
                ),
                Laya.timer.once(5e3, this, ()=>{
                    Laya.timer.clearAll(this),
                    Laya.timer.loop(30, this, ()=>{
                        this.onClickPlus(t, !1)
                    }
                    )
                }
                ),
                this.m_btn_Plus.scale(.8, .8)
            }
            ),
            this.m_btn_Minus.on(Laya.Event.MOUSE_UP, this, ()=>{
                Laya.timer.clearAll(this),
                this.m_btn_Minus.scale(1, 1)
            }
            ),
            this.m_btn_Plus.on(Laya.Event.MOUSE_UP, this, ()=>{
                Laya.timer.clearAll(this),
                this.m_btn_Plus.scale(1, 1)
            }
            ),
            this.m_btn_Minus.on(Laya.Event.MOUSE_OUT, this, ()=>{
                Laya.timer.clearAll(this),
                this.m_btn_Minus.scale(1, 1)
            }
            ),
            this.m_btn_Plus.on(Laya.Event.MOUSE_OUT, this, ()=>{
                Laya.timer.clearAll(this),
                this.m_btn_Plus.scale(1, 1)
            }
            )
        }
        onClickPlus(t, e=!0) {
            var i = this.m_sli_Count.max;
            !i || this.m_count >= i || e && !this.setCheckTime(Date.newDate().getTime()) || (e = this.m_count + this.m_step / this.m_times,
            this.m_count = Math.min(i, e),
            this.m_sli_Count.value = this.m_count * this.m_times)
        }
        onClickMinus(t, e=!0) {
            var i = this.m_sli_Count.min;
            this.m_count <= i || e && !this.setCheckTime(Date.newDate().getTime()) || (e = this.m_count - this.m_step / this.m_times,
            this.m_count = Math.max(i, e),
            this.m_sli_Count.value = this.m_count * this.m_times)
        }
        onChangeCount() {
            if (this.m_sli_Count.max <= 0) {
                let t = this.m_sli_Count.getChildAt(1);
                t.x = 0,
                this.m_count = 0
            } else
                this.m_count = this.m_sli_Count.value / this.m_times;
            this.m_txt_Num.text = k(this.m_txtLang, this.m_count),
            P.event(y.COUNT_CHANGE, this.m_count)
        }
        setCheckTime(t) {
            return this.m_clickTimes.push(t),
            4 < this.m_clickTimes.length && this.m_clickTimes.shift(),
            4 == this.m_clickTimes.length && this.m_clickTimes[3] - this.m_clickTimes[0] < 1e3 && Be("limit", 1e3) && u(k(164)),
            !0
        }
    }
    class as extends t.cat.views.common.FishCoinViewUI {
        onAwake() {
            super.onAwake(),
            this.updateCoin()
        }
        updateCoin() {
            this.m_txt_Coin.text = I.fishCoin + ""
        }
        removePlus() {
            this.m_box_Plus.destroy()
        }
        hideBg() {
            this.m_img_Bg.visible = !1
        }
        onClickPlus(t) {
            d(Te, {
                closeOnSide: !0
            })
        }
    }
    L([A(y.UPDATE_ITEM), A(y.FISHCOIN_CHANGE)], as.prototype, "updateCoin", null);
    class ns extends t.cat.views.common.LvViewUI {
        setData(t) {
            this.m_txt_Lv.text = "" + t
        }
    }
    class os extends t.cat.views.fish.FishRankCellViewUI {
        dataChanged(t, e) {
            if (e ? this.dataSource = e : e = this.dataSource,
            e) {
                this.m_txt_Rank.visible = 3 < +e.rankData.rank,
                this.m_img_Rank.visible = +e.rankData.rank <= 3,
                3 < +e.rankData.rank ? this.m_txt_Rank.text = e.rankData.rank + "" : this.m_img_Rank.skin = `cat/ui_rank/img_ranking_number_${e.rankData.rank}.png`,
                this.m_txt_Name.text = e.rankData.name,
                this.m_txt_Score.text = P.fish.formatWeight(+e.rankData.score);
                let t = e.rankData.rankKey;
                Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && 123 == t && (t = 126),
                this.m_img_Fish.skin = `cat/ui_fish/${t}.png`,
                this.m_img_Line.visible = !e.isSelf,
                this.m_view_Head.setHeadShow({
                    isCircle: !0,
                    icoUrl: e.rankData.icon,
                    uname: e.rankData.name,
                    borderLvl: 5,
                    channelId: e.rankData.channelID
                })
            }
        }
    }
    class rs extends t.cat.views.fish.FishRewardDetailCellViewUI {
        dataChanged(t, e) {
            var i;
            e ? this.dataSource = e : e = this.dataSource,
            e && (i = e.settleCfg.id <= 3,
            this.m_txt_Rank.visible = !0,
            this.m_img_Line.visible = !e.isSelf,
            i ? (this.m_txt_Rank.x = 95,
            this.m_txt_Rank.text = k([1017, 1018, 1019][e.settleCfg.id - 1]),
            this.m_img_Rank.skin = `cat/ui_rank/img_ranking_number_${e.settleCfg.id}.png`,
            this.m_img_Rank.visible = !0) : (this.m_txt_Rank.x = 55,
            e.settleCfg.start == e.settleCfg.end ? this.m_txt_Rank.text = k(1021, e.settleCfg.start) : this.m_txt_Rank.text = k(1021, e.settleCfg.start + "~" + e.settleCfg.end),
            this.m_img_Rank.visible = !1),
            this.m_txt_Desc.text = k(1020, e.settleCfg.rewardRate),
            i = f(Math.floor(P.fish.m_fishPool * e.settleCfg.rewardRate / 100)),
            this.m_txt_Reward.text = i + "",
            this.m_img_RewardBg.width = 10 + Math.max(65, this.m_txt_Reward.width) + 50)
        }
    }
    class hs extends t.cat.views.home.AirDropGiftTimesViewUI {
        constructor() {
            super(...arguments),
            this.m_times = 0,
            this.m_aniState = 0
        }
        get aniState() {
            return this.m_aniState
        }
        onAwake() {
            super.onAwake()
        }
        showAni() {
            if (0 != this.m_aniState && 2 != this.m_aniState || (this.m_times = 0),
            this.parent && 0 == this.m_times) {
                let t = this.parent;
                t.ani16.play(0, !1)
            }
            20 == this.x && Laya.Tween.clearAll(this),
            this.alpha = 1,
            this.m_times++,
            this.m_txt_Times.text = "x" + this.m_times,
            Laya.timer.callLater(this, ()=>{
                this.width = 70 + this.m_txt_Times.width + 25,
                this.m_txt_Times.x = 52 + this.m_txt_Times.width / 2
            }
            ),
            this.visible = !0,
            (this.m_aniState = 1) < this.m_times && Laya.Tween.to(this.m_txt_Times, {
                scaleX: 1.5,
                scaleY: 1.5
            }, 100, null, Laya.Handler.create(this, ()=>{
                Laya.Tween.to(this.m_txt_Times, {
                    scaleX: 1,
                    scaleY: 1
                }, 200)
            }
            ), 0, !0),
            this.hideView()
        }
        hideView() {
            0 < I.randomEvent.boxNum || Laya.Tween.to(this, {
                alpha: 0
            }, 800, null, Laya.Handler.create(this, ()=>{
                this.m_aniState = 2,
                this.m_txt_Times.text = "x1",
                this.visible = !1,
                this.m_times = 0
            }
            ), 1e4)
        }
    }
    L([A(y.AIR_DROP)], hs.prototype, "showAni", null);
    class ls extends t.cat.views.home.SumCatViewUI {
        constructor() {
            super(...arguments),
            this.m_index = null
        }
        onAwake() {
            super.onAwake(),
            this.on(Laya.Event.MOUSE_DOWN, this, ()=>{
                1 == P.cat.airDropMap[this.m_index] ? P.event(y.OPNE_AIR_DROP, [this.m_index]) : this.dataSource && 0 < this.dataSource && P.event(y.MOVE_CAT, {
                    cat: this,
                    index: this.m_index,
                    catId: this.dataSource
                })
            }
            )
        }
        onDestroy() {
            super.onDestroy(),
            this.ani1.offAll()
        }
        dataChanged(e, i) {
            if (this.m_view_Lv.visible = !1,
            this.m_index = e,
            i ? this.dataSource = i : i = this.dataSource,
            this.m_spine && this.m_spine.destroy(),
            this.m_view_Lv.visible = !1,
            i && !(i < 0)) {
                this.m_view_Lv.visible = !0,
                this.m_view_Lv.setData(i);
                e = Data.getCat(i).showId;
                let t = .5;
                var s;
                200 <= +e && (t = .4),
                210 < i && (s = +Data.getCat(i).oldShowId,
                t = 200 <= s ? .5 : 100 <= s ? .45 : .38),
                this.m_spine = R.create({
                    url: "cat/spine/" + e + ".json",
                    parent: this.m_box_Cat,
                    px: 30,
                    py: 50,
                    scale: t,
                    autoRemove: !1,
                    alpha: 1
                }),
                P.cat.playCat(this.m_spine, "squat idle"),
                this.addChild(this.m_view_Lv),
                i && i < 0 && (this.m_view_Lv.visible = this.m_spine.visible = !1),
                this.updateLunch()
            }
        }
        matchEquip(t) {
            t && t == this.dataSource ? this.m_img_Sum.visible = !0 : this.m_img_Sum.visible = !1
        }
        playSumAni(s) {
            if (s != Data.maxCats) {
                var a = Data.getCat(s - 1).showId;
                let t = 1
                  , e = (200 <= +a ? t = .8 : 210 < s - 1 && (s = +Data.getCat(s - 1).oldShowId,
                t = 200 <= s ? 1 : 100 <= s ? .9 : .76),
                this.m_box_Cat.visible = !1,
                R.create({
                    url: "cat/spine/" + a + ".json",
                    parent: this.m_box_L,
                    px: 50,
                    py: 100,
                    scale: t,
                    autoRemove: !1,
                    alpha: 1
                }))
                  , i = R.create({
                    url: "cat/spine/" + a + ".json",
                    parent: this.m_box_R,
                    px: 50,
                    py: 100,
                    scale: t,
                    autoRemove: !1,
                    alpha: 1
                });
                i.stop(),
                e.stop(),
                this.ani1.addLabel("boom", 8),
                P.cat.goldMute || D.instance.playSound("UI_Tips.mp3"),
                this.ani1.once(Laya.Event.LABEL, this, ()=>{
                    R.create({
                        url: "cat/spine/boom.json",
                        parent: this,
                        px: 0,
                        py: 0,
                        autoRemove: !0,
                        alpha: 1,
                        autoPlay: !0
                    })
                }
                ),
                this.ani1.once(Laya.Event.COMPLETE, this, ()=>{
                    this.m_box_L.destroyChildren(),
                    this.m_box_R.destroyChildren(),
                    this.m_box_Cat.visible = !0
                }
                ),
                P.cat.playCat(e, "squat idle"),
                P.cat.playCat(i, "squat idle"),
                this.ani1.play(0, !1)
            }
        }
        updateLunch() {
            this.m_img_Mine.visible = P.lunch.checkCatLunch(this.m_index),
            this.dataSource && (this.m_spine.visible = this.m_view_Lv.visible = !this.m_img_Mine.visible)
        }
    }
    L([A(y.CAT_MATCH)], ls.prototype, "matchEquip", null),
    L([A("updateLunch"), A(y.UPDATE_LUNCH), A(y.POOLBONUS)], ls.prototype, "updateLunch", null);
    class cs extends t.cat.views.home.ShopCellViewUI {
        dataChanged(i, s) {
            if (this.m_index = i,
            s ? this.dataSource = +s : s = this.dataSource,
            s) {
                this.m_view_Lv.setData(+s),
                this.m_spine && this.m_spine.destroy();
                var a = Data.getCat(s)
                  , n = P.cat.getGoldCatLv()
                  , t = P.cat.getFishCoinLv()
                  , e = n < s && s <= t
                  , e = (this.m_btn_Buy.skin = `cat/ui_comm/img_public_btn_big_${e ? "green" : "blue"}.png`,
                this.m_txt_Buy.strokeColor = e ? "#4a7408" : "#764428",
                this.m_img_Cost.skin = e ? "cat/ui_item/8.png" : "cat/ui_item/coin.png",
                this.m_txt_Buy.text = f(P.cat.getCatCost(s)) + "",
                this.m_txt_Out.text = "+" + f(a.outGold) + "/s",
                s <= Math.max(n, t));
                if (e) {
                    this.m_btn_Buy.visible = !0;
                    let t = .5
                      , e = 35;
                    a = +Data.getCat(s).showId;
                    200 <= a ? (t = .4,
                    e = 55) : 100 <= a && (e = 50,
                    t = .45),
                    210 < s && (200 <= (n = +Data.getCat(s).oldShowId) ? (t = .4,
                    e = 55) : 100 <= n && (e = 50,
                    t = .45)),
                    this.m_img_Lock.visible = this.m_img_Mask.visible = !1,
                    this.m_spine = R.create({
                        url: "cat/spine/" + Data.getCat(s).showId + ".json",
                        parent: this,
                        px: this.m_img_Mask.x + 30,
                        py: this.m_img_Mask.y + e,
                        scale: 1.44 * t,
                        autoRemove: !1,
                        alpha: 1,
                        zOrder: 1
                    }),
                    this.m_spine.name = i + "",
                    P.cat.playCat(this.m_spine, "squat idle")
                } else
                    this.m_img_Lock.visible = this.m_img_Mask.visible = !0,
                    this.m_btn_Buy.visible = !1;
                this.m_btn_Free.visible = P.cat.freeCat && P.cat.freeCat == s,
                this.m_btn_Free.visible && (this.m_btn_Buy.visible = !1),
                Laya.timer.callLater(this, ()=>{
                    this.m_img_SpeedBg.width = this.m_txt_Out.width + 35 + 15
                }
                ),
                this.addChild(this.m_view_Lv),
                this.m_img_Clip.rotation = s % 2 == 0 ? Math.randRange(-20, 5) : Math.randRange(5, 20)
            }
        }
        onClickFree() {
            P.cat.reqCreate(this.dataSource, !1, !0).then(()=>{
                u(k(1033)),
                this.dataChanged(this.m_index, this.dataSource)
            }
            )
        }
        onClickBuy() {
            let e = -1;
            for (let t = 0; t < 12; t++)
                if (!P.cat.allcats[t]) {
                    e = t;
                    break
                }
            if (-1 == e)
                return u(k(1027));
            var t = this.dataSource > P.cat.getGoldCatLv();
            (t ? I.fishCoin : I.gold) < P.cat.getCatCost(this.dataSource) ? t ? d(Te) : P.cat.showVkittyGainWay() : P.cat.reqCreate(this.dataSource, t).then(()=>{
                u(k(1033)),
                this.m_txt_Buy.text = f(P.cat.getCatCost(this.dataSource)) + ""
            }
            )
        }
    }
    class ms extends t.cat.views.lunchPool.AssetCellViewUI {
        dataChanged(t, e) {
            e ? this.dataSource = e : e = this.dataSource,
            e && (this.m_txt_Cost.text = "",
            this.m_txt_Name.text = e.name,
            "$vKITTY" == e.name ? this.m_txt_Num.text = f(e.num) : this.m_txt_Num.text = Intl.NumberFormat().format(e.num) + "",
            this.m_img_Icon.skin = e.icon)
        }
    }
    class ds extends Laya.Box {
        constructor() {
            super(...arguments),
            this._constructors = [],
            this._items = {},
            this._creatings = {}
        }
        onDestroy() {
            for (const e in this._items) {
                let t = this._items[e];
                t.destroyed || t.destroy()
            }
            this._items = {}
        }
        setupCls(t) {
            this._constructors = t
        }
        changeIndex(t) {
            var e = "item" + t;
            if (this._curName != e) {
                if (this._curName) {
                    let t = this._items[this._curName];
                    t && t.removeSelf()
                }
                this._curName = e;
                e = this._items[e];
                e ? this.addChild(e) : this.createItem(t)
            }
        }
        createItem(t) {
            let e = "item" + t;
            this._creatings[e] || (t = this._constructors[t]) && (this._creatings[e] = !0,
            _(t.cls, {
                params: t.params || []
            }).then(t=>{
                this.destroyed ? t.destroy() : (this._creatings[e] = !1,
                t.name = e,
                this._items[e] = t,
                e == this._curName && this.addChild(t))
            }
            ))
        }
    }
    class _s extends t.cat.views.recharge.RechargeCellViewUI {
        constructor() {
            super(...arguments),
            this.m_ticker = null
        }
        dataChanged(t) {
            var e, i = this.dataSource;
            i && (this.stopWait(),
            this.m_img_Icon.skin = `cat/ui_recharge/fc${i.iconId}.png`,
            this.m_img_Double.visible = i.showDouble,
            this.m_txt_Price.text = "$ " + i.price,
            this.m_txt_FishNum.text = k(1023, i.amount),
            this.m_txt_DoubleNum.text = "+" + i.amount,
            this.m_txt_Price.visible = i.goodsType != At.dayGoods,
            this.m_img_Extra.visible = !i.showDouble && 0 < +i.extra && i.goodsType != At.dayGoods,
            this.m_txt_ExtraFish.text = "+" + i.extra,
            this.m_txt_FishNum.visible = i.goodsType != At.dayGoods,
            this.m_img_Icon.y = i.goodsType == At.dayGoods ? 100 : 110,
            this.clearTimeticker(),
            Laya.timer.clearAll(this),
            this.m_box_Bought.visible = !1,
            i.goodsType == At.dayGoods ? (this.m_box_Daily.visible = !0,
            this.m_txt_FishDay.text = i.amount + "",
            this.m_txt_Gift.text = i.dropBoxNum + "",
            this.m_txt_XenDay.text = i.xenNum + "",
            this.m_box_FishDay.visible = 0 < i.amount,
            this.m_box_Xen.visible = 0 < i.xenNum,
            0 < i.amount || 0 < i.xenNum ? (this.m_box_Gift.centerX = NaN,
            this.m_box_Gift.x = 120,
            this.m_box_Gift.scale(1, 1),
            this.m_box_Gift.y = 165,
            this.m_txt_Add.visible = !0) : (this.m_box_Gift.centerX = 0,
            this.m_box_Gift.scale(1.3, 1.3),
            this.m_box_Gift.y = 155,
            this.m_txt_Add.visible = !1),
            2001 == i.id ? (this.m_txt_PriceDaily.text = "Free",
            this.m_img_DailyChainIcon.visible = !1,
            this.m_txt_PriceDaily.centerX = 0) : 2002 == i.id ? (this.m_txt_PriceDaily.text = "Claim",
            Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile ? this.m_img_DailyChainIcon.skin = "cat/ui_comm/mantle.png" : this.m_img_DailyChainIcon.skin = "cat/ui_comm/ton.png",
            this.m_img_DailyChainIcon.visible = !0,
            this.m_txt_PriceDaily.centerX = 15) : (this.m_txt_PriceDaily.text = "$ " + i.price,
            this.m_img_DailyChainIcon.visible = !1,
            this.m_txt_PriceDaily.centerX = 0),
            e = I.getCountByType(i.id),
            this.m_box_Bought.visible = 0 < e,
            this.m_img_DailyPackage.visible = (2002 == i.id || 2003 == i.id || 2004 == i.id) && 0 == e,
            this.m_txt_Daily.text = 2003 == i.id || 2004 == i.id ? "valuable" : "Daily\nPackage",
            this.m_txt_Daily2.visible = 2003 == i.id || 2004 == i.id,
            this.m_img_Red.visible = 2001 == i.id && 0 == e,
            0 < e ? (this.m_ticker = E.create(Date.newDate().addDays(1).getDateZeroTime().getTime(), 1e3, this.m_txt_RefreshTime),
            this.m_ticker.start(),
            this.m_ticker.onEnd = ()=>{
                this.dataChanged()
            }
            ) : 2002 == i.id && this.checkGoodsChain()) : (this.m_img_Red.visible = !1,
            this.m_box_Daily.visible = !1))
        }
        clearTimeticker() {
            this.m_ticker && (this.m_ticker.dispose(),
            this.m_ticker = null)
        }
        onDestroy() {
            super.onDestroy(),
            this.clearTimeticker(),
            Laya.timer.clearAll(this)
        }
        checkGoodsChain() {
            var t, e = S.get(S.s_signInRechargeGift) || 0;
            let i = 0;
            e && (e = e + 4e4,
            t = (new Date).getTime(),
            i = e - t),
            0 < i && (this.showWait(),
            Laya.timer.once(i, this, this.dataChanged))
        }
        showWait() {
            this.m_box_Bought.visible = !0,
            this.m_img_Done.visible = !1,
            this.m_img_TimeBg.visible = !1,
            this.m_img_Processing.visible = !0,
            this.ani1.play(0, !0)
        }
        stopWait() {
            this.m_img_Done.visible = !0,
            this.m_img_TimeBg.visible = !0,
            this.m_img_Processing.visible = !1,
            this.ani1.stop()
        }
    }
    L([A(y.CHANGE_CHARGE_CHAIN_GIFT)], _s.prototype, "dataChanged", null);
    class us extends t.cat.views.squad.BoostCellViewUI {
        dataChanged(t, e) {
            e ? this.dataSource = e : e = this.dataSource,
            this.m_img_Select.visible = !!e.isSelect;
            let i = "";
            i = 0 == e.pIndex ? "1st" : 1 == e.pIndex ? "2nd" : 2 == e.pIndex ? "3rd" : e.pIndex + 1 + "th",
            this.m_txt_Price.text = i + " - $ " + e.price
        }
    }
    class ps extends t.cat.views.squad.FriendInviteCellViewUI {
        dataChanged(t, e) {
            e ? this.dataSource = e : e = this.dataSource,
            this.m_img_Rank.visible = e.rank <= 3,
            e.rank <= 3 && (this.m_img_Rank.skin = `cat/ui_rank/img_ranking_number_${e.rank}.png`),
            this.m_txt_Rank.visible = 3 < e.rank,
            this.m_txt_Rank.text = e.rank + "",
            this.m_txt_Get.text = "+" + e.income,
            this.m_txt_FrenNum.text = e.inviteCount + " frens",
            this.m_txt_Name.text = e.name;
            var i = this.m_txt_Name.width;
            this.m_txt_Name._tf.lines.toString() != this.m_txt_Name.text ? (this.m_txt_Over.right = i - this.m_txt_Name._tf.textWidth - 25 + 3,
            this.m_txt_Over.visible = !0) : this.m_txt_Over.visible = !1,
            this.m_view_Head.setHeadShow({
                isCircle: !0,
                icoUrl: e.icon,
                uname: e.name,
                borderLvl: 5,
                channelId: e.channelID
            })
        }
    }
    class gs extends t.cat.views.squad.SquadCellViewUI {
        dataChanged(t, e) {
            e ? this.dataSource = e : e = this.dataSource,
            this.m_txt_Level.text = k(Gt[e.league]),
            this.m_txt_Name.text = e.name,
            this.m_img_Cup.skin = `cat/ui_notpack/cup${e.league}.png`,
            this.m_view_Head.setHeadShow({
                isCircle: !1,
                icoUrl: e.icon + "",
                uname: e.name,
                borderLvl: 5,
                notShowChain: !0
            })
        }
    }
    class Cs extends t.cat.views.table.TurnTableClaimCellViewUI {
        dataChanged(t, e) {
            e ? this.dataSource = e : e = this.dataSource,
            this.m_txt_Time.text = xt(Date.newDate(1e3 * +e.createTime)),
            this.m_txt_Fish.text = Intl.NumberFormat().format(+e.fishCoin),
            this.m_txt_Zen.text = Intl.NumberFormat().format(+e.xZen)
        }
    }
    class ys extends t.cat.views.table.TurnTableHelpCellViewUI {
        dataChanged(t, e) {
            e ? this.dataSource = e : e = this.dataSource,
            this.m_view_Head.setHeadShow({
                isCircle: !0,
                icoUrl: e.icon,
                uname: e.name,
                borderLvl: 5,
                notShowChain: !0
            }),
            this.m_txt_Time.text = xt(Date.newDate(1e3 * +e.Time)),
            this.m_txt_Name.text = e.name + " assisted"
        }
    }
    class bs extends t.cat.views.table.TurnTableSpinCellViewUI {
        dataChanged(t, e) {
            e ? this.dataSource = e : e = this.dataSource,
            this.m_txt_Date.text = xt(Date.newDate(1e3 * +e.crateTime)) + "";
            var i = Data.getTurnTable(e.turnId);
            this.m_txt_Desc.text = i ? i.name : "Super Box",
            e.coinType == It.fish ? this.m_txt_Money.text = e.Val + " FishCoins" : e.coinType == It.gold ? this.m_txt_Money.text = f(e.Val) + " $vKitty" : e.coinType == It.usdt && (P.table.getDiamondByPrice(e.Val) ? this.m_txt_Money.text = P.table.getDiamondByPrice(e.Val) + " diamond" : this.m_txt_Money.text = e.Val + " $")
        }
    }
    class vs extends t.cat.views.task.AchievementOneCellViewUI {
        dataChanged(t) {
            this.m_data = this.dataSource,
            this.updateView()
        }
        updateView() {
            var t = 1 == this.m_data.receiveReward
              , e = !t && this.m_data.completedValue >= this.m_data.targetValue
              , i = this.m_data.eventType == T.inviteTotalUser || this.m_data.eventType == T.invitePremiumUser;
            this.m_img_Receive.visible = e,
            this.m_img_Icon.skin = this.m_data.icon,
            this.m_txt_Reward.text = "+" + this.m_data.rewardFish,
            this.m_box_Completed.visible = t,
            this.m_img_Red.visible = e,
            this.m_txt_Title.visible = !i,
            (this.m_box_Persons.visible = i) ? (this.m_img_Person.skin = "cat/ui_task/person_" + (this.m_data.eventType == T.inviteTotalUser ? 0 : 1) + ".png",
            this.m_txt_Persons.text = this.m_data.title) : (8 < this.m_data.title.length && (this.m_txt_Title.fontSize = 16),
            this.m_txt_Title.text = this.m_data.title)
        }
        updateState(t) {
            t == this.m_data.taskId && this.updateView()
        }
        updateAchievement(t) {
            -1 != t.indexOf(this.m_data.taskId) && this.updateView()
        }
        onClickReceive(t) {
            1 == this.m_data.receiveReward ? console.log("reward received") : this.m_data.completedValue >= this.m_data.targetValue ? P.task.reqCheckTask(this.m_data.taskId).then(t=>{
                1 == t.ret && u("Achievement not completed!")
            }
            ).catch(t=>{
                u(t.message)
            }
            ) : console.log("not completed")
        }
    }
    L([A(y.TASK_UPDATE_STATE)], vs.prototype, "updateState", null),
    L([A(y.TASK_UPDATE_ACHIEVEMENT)], vs.prototype, "updateAchievement", null);
    class ks extends t.cat.views.task.BindTwitterDlgUI {
        constructor(t) {
            super(),
            this.m_url = t
        }
        onClickTwitter(t) {
            P.event(y.START_CHECK_TWITTER),
            window.mbplatform.openLink(this.m_url),
            this.closeDialog()
        }
    }
    class fs extends t.cat.views.task.TaskOneCellViewUI {
        constructor() {
            super(...arguments),
            this.m_confirming = !1
        }
        onDestroy() {
            super.onDestroy(),
            Laya.timer.clear(this, this.delayUnlockView),
            Laya.timer.clear(this, this.delayConfirmSignIn)
        }
        dataChanged(t) {
            this.m_data = this.dataSource,
            this.m_img_Icon.skin = "cat/ui_task/" + this.m_data.icon,
            this.m_txt_Title.text = this.m_data.title,
            this.m_txt_Reward.text = "+" + this.m_data.rewardFish,
            this.m_box_Confirming.visible = !1,
            this.ani1.isPlaying && this.ani1.stop(),
            this.ani2.isPlaying && this.ani2.stop(),
            this.updateComplete(),
            this.checkConfirmSignIn()
        }
        onClickCheck(t) {
            1 == this.m_data.receiveReward || this.m_confirming || this.checkTask(!0)
        }
        updateComplete() {
            var t = 1 == this.m_data.receiveReward;
            this.m_box_Go.visible = !t,
            this.m_img_Red.visible = !t && this.m_data.completedValue >= this.m_data.targetValue,
            (this.m_img_Completed.visible = t) && (this.m_box_Confirming.visible = !1,
            this.ani1.isPlaying && this.ani1.stop(),
            this.ani2.isPlaying && this.ani2.stop())
        }
        lockView(t=!1) {
            dt(!0),
            this.m_txt_Go.visible = !1,
            this.m_img_Refresh.visible = !0,
            this.ani1.isPlaying || this.ani1.play(0, !0),
            Laya.timer.clear(this, this.delayUnlockView),
            t && Laya.timer.once(6e4, this, this.delayUnlockView)
        }
        unlockView() {
            dt(!1),
            this.m_txt_Go.visible = !0,
            this.m_img_Refresh.visible = !1,
            this.ani1.stop()
        }
        delayUnlockView() {
            this.unlockView()
        }
        getConfirmLeftTime() {
            var t, e = S.get(S.s_taskSigninTime) || 0;
            let i = 0;
            return e && (e = e + 4e4,
            t = (new Date).getTime(),
            i = e - t),
            i
        }
        autoCheck(t, e) {
            if (this.m_data.taskId == t && 1 != this.m_data.receiveReward)
                return 0 < this.getConfirmLeftTime() ? this.m_data.eventType != T.dailySignIn ? void this.checkConfirmSignIn() : void P.task.reqUpdateTask(t, !1).then(()=>{
                    this.checkConfirmSignIn(!0)
                }
                ).catch(()=>{
                    this.checkConfirmSignIn()
                }
                ) : void this.checkTask(e)
        }
        updateState(t) {
            t == this.m_data.taskId && this.updateComplete()
        }
        checkConfirmSignIn(e=!1) {
            if (1 != this.m_data.receiveReward) {
                let t = [T.dailySignIn, T.okxSignIn, T.bitgetSignIn];
                if (-1 != t.indexOf(this.m_data.eventType)) {
                    var i = this.getConfirmLeftTime();
                    if (i <= 0)
                        this.stopConfirmSignIn();
                    else {
                        this.m_confirming = !0,
                        this.m_box_Confirming.visible = !0,
                        this.ani2.play(0, !0);
                        let t = e ? 3e3 : 3e4 <= i ? 2e4 : i;
                        Laya.timer.clear(this, this.delayConfirmSignIn),
                        Laya.timer.once(t, this, this.delayConfirmSignIn)
                    }
                }
            }
        }
        delayConfirmSignIn() {
            P.task.reqCheckTask(this.m_data.taskId, !1).then(t=>{
                0 == t.ret ? this.stopConfirmSignIn() : this.checkConfirmSignIn()
            }
            ).catch(()=>{
                this.checkConfirmSignIn()
            }
            )
        }
        stopConfirmSignIn() {
            S.removeItem(S.s_taskSigninTime),
            this.m_confirming = !1,
            this.m_box_Confirming.visible = !1,
            this.ani2.stop()
        }
        checkTask(e=!1) {
            this.lockView(),
            P.task.reqCheckTask(this.m_data.taskId, !1).then(t=>{
                0 == t.ret ? this.unlockView() : (this.m_checkInfo = t,
                e ? this.checkGoto() : this.unlockView())
            }
            ).catch(()=>{
                this.unlockView()
            }
            )
        }
        checkGoto() {
            switch (this.m_data.eventType) {
            case T.dailySignIn:
            case T.okxSignIn:
            case T.bitgetSignIn:
                this.signIn();
                break;
            case T.followTwitter:
                this.followTwitter();
                break;
            case T.retweenTitter:
                this.retweenTitter();
                break;
            case T.joinTGGroup:
            case T.joinTGChannel:
                this.joinTelegram();
                break;
            case T.becomePremium:
                this.becomePremium();
                break;
            case T.dailyRecharge:
                this.recharge();
                break;
            case T.dailyInvite:
                this.invite();
                break;
            case T.premiumBoots:
            case T.visitTelegramLink:
                this.visitTelegramLink();
                break;
            case T.visitWebsite:
                this.visitWebsite();
                break;
            default:
                this.unlockView(),
                u("task has not been completed: " + this.m_data.taskId)
            }
        }
        followTwitter() {
            this.unlockView(),
            1 != this.m_checkInfo.twitterStatus && d(ks, {
                params: [this.m_checkInfo.goto]
            })
        }
        retweenTitter() {
            P.task.reqUpdateTask(this.m_data.taskId, !1).then(()=>{
                Laya.timer.once(1e4, this, ()=>{
                    this.checkTask()
                }
                );
                var t = Laya.Browser.onPC ? this.m_checkInfo.goto : this.m_checkInfo.goto2;
                window.mbplatform.openLink(t)
            }
            ).catch(()=>{
                this.unlockView()
            }
            )
        }
        joinTelegram() {
            this.unlockView(),
            window.mbplatform.openTelegramLink(this.m_checkInfo.goto)
        }
        becomePremium() {
            this.unlockView(),
            window.mbplatform.openTelegramLink("https://t.me/premium")
        }
        visitTelegramLink() {
            P.task.reqUpdateTask(this.m_data.taskId, !1).then(()=>{
                Laya.timer.once(1e4, this, ()=>{
                    this.checkTask()
                }
                ),
                window.mbplatform.openTelegramLink(this.m_checkInfo.goto)
            }
            ).catch(()=>{
                this.unlockView()
            }
            )
        }
        recharge() {
            this.unlockView(),
            d(Te)
        }
        invite() {
            this.unlockView(),
            I.doInviteAction()
        }
        visitWebsite() {
            P.task.reqUpdateTask(this.m_data.taskId, !1).then(()=>{
                Laya.timer.once(5e3, this, ()=>{
                    this.checkTask()
                }
                ),
                window.mbplatform.openLink(this.m_checkInfo.goto)
            }
            ).catch(()=>{
                this.unlockView()
            }
            )
        }
        signIn() {
            S.set(S.s_taskId, this.m_data.taskId),
            P.wallet.connected || Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile ? this.checkSignIn() : (I.retainLink(p.ConnectWalletForTaskSignIn),
            this.lockView(!0),
            P.wallet.connect().then(t=>{
                this.destroyed || Laya.timer.once(500, this, ()=>{
                    this.checkSignIn()
                }
                )
            }
            ).catch(()=>{
                this.unlockView()
            }
            ))
        }
        checkSignIn() {
            var t;
            if (this.m_checkInfo)
                return Mmobay.MConfig.channelId == Mmobay.MConst.CHANNEL_MANTLE && Laya.Browser.onMobile ? (t = this.getExcludeWallets(),
                dt(!1),
                void d(fe, {
                    params: [t],
                    showEffect: !1,
                    retainPopup: !0
                }).then(t=>{
                    t.wait().then(t=>{
                        t.type != h.Yes ? this.unlockView() : this.sendTransaction(t.data)
                    }
                    )
                }
                )) : void (Mmobay.MConfig.channelId != Mmobay.MConst.CHANNEL_MANTLE || this.checkSpecificWalletTask() ? this.sendTransaction() : this.unlockView())
        }
        sendTransaction(t=g.Other) {
            I.retainLink(p.CheckOrderForTaskSignIn),
            this.lockView(!0);
            t = {
                amount: 8e6,
                address: this.m_checkInfo.extra,
                payload: this.m_checkInfo.payload,
                transactionType: Ht.taskSignin,
                walletType: t
            };
            P.wallet.sendTransaction(t).then(()=>{
                if (S.removeItem(S.s_taskId),
                !this.destroyed) {
                    let t = [T.dailySignIn, T.okxSignIn, T.bitgetSignIn];
                    if (-1 != t.indexOf(this.m_data.eventType)) {
                        if (S.set(S.s_taskSigninTime, Date.now()),
                        this.m_data.eventType != T.dailySignIn)
                            return this.unlockView(),
                            void this.checkConfirmSignIn();
                        P.task.reqUpdateTask(this.m_data.taskId, !1).then(()=>{
                            this.unlockView(),
                            this.checkConfirmSignIn(!0)
                        }
                        ).catch(()=>{
                            this.unlockView(),
                            this.checkConfirmSignIn()
                        }
                        )
                    }
                }
            }
            ).catch(t=>{
                S.removeItem(S.s_taskId),
                this.unlockView(),
                t && t.code == oe.insufficientFunds && u("Insufficient gas")
            }
            )
        }
        getExcludeWallets() {
            let e = [];
            if (this.m_data.eventType == T.okxSignIn ? e.push(g.OKX) : this.m_data.eventType == T.bitgetSignIn && e.push(g.Bitget),
            0 == e.length)
                return [];
            let t = ne
              , i = [];
            return t.forEach(t=>{
                -1 == e.indexOf(t) && i.push(t)
            }
            ),
            i
        }
        checkSpecificWalletTask() {
            let t = !0;
            var e = P.wallet.getWalletType();
            let i = "Incorrect wallet!";
            return this.m_data.eventType == T.okxSignIn ? e != g.OKX && (t = !1,
            i = "Please use OKX Wallet to complete this task!") : this.m_data.eventType == T.bitgetSignIn && e != g.Bitget && (t = !1,
            i = "Please use Bitget Wallet to complete this task!"),
            t || ut({
                button: s.Yes,
                msg: i
            }),
            t
        }
    }
    L([A(y.TASK_AUTO_CHECK)], fs.prototype, "autoCheck", null),
    L([A(y.TASK_UPDATE_STATE)], fs.prototype, "updateState", null);
    class ws {
        constructor() {}
        static init() {
            var t = Laya.ClassUtils.regClass;
            t("logic/views/common/CountView.ts", ss),
            t("logic/views/common/FishCoinView.ts", as),
            t("logic/views/common/LoadingView", N),
            t("logic/views/common/LvView.ts", ns),
            t("logic/views/common/WifiView.ts", Yi),
            t("logic/views/fish/FishHistoryCellView.ts", de),
            t("logic/views/fish/FishItemView.ts", Se),
            t("logic/views/fish/FishRankCellView.ts", os),
            t("logic/views/squad/HeadView.ts", Di),
            t("logic/views/fish/FishRewardDetailCellView.ts", rs),
            t("logic/views/home/AirDropGiftTimesView.ts", hs),
            t("logic/views/home/SumCatView.ts", ls),
            t("logic/views/home/ShopCellView.ts", cs),
            t("logic/views/lunchPool/AssetCellView.ts", ms),
            t("logic/views/lunchPool/LunchCellView.ts", _i),
            t("logic/base/ui/SuperStack.ts", ds),
            t("logic/views/recharge/RechargeCellView.ts", _s),
            t("logic/views/squad/BoostCellView.ts", us),
            t("logic/views/squad/FriendCellView.ts", je),
            t("logic/views/squad/FriendInviteCellView.ts", ps),
            t("logic/views/squad/SquadCellView.ts", gs),
            t("logic/views/squad/RankCellView.ts", We),
            t("logic/views/turnTable/FinalClaimView.ts", Ei),
            t("logic/views/turnTable/TurnTableClaimCellView.ts", Cs),
            t("logic/views/turnTable/TurnTableHelpCellView.ts", ys),
            t("logic/views/turnTable/TurnTableSpinCellView.ts", bs),
            t("logic/views/task/AchievementOneCellView.ts", vs),
            t("logic/views/task/TaskOneCellView.ts", fs)
        }
    }
    ws.width = 560,
    ws.height = 1120,
    ws.scaleMode = "showall",
    ws.screenMode = "vertical",
    ws.alignV = "middle",
    ws.alignH = "center",
    ws.startScene = "cat/views/common/BuyItemDlg.scene",
    ws.sceneRoot = "",
    ws.debug = !1,
    ws.stat = !1,
    ws.physicsDebug = !1,
    ws.exportSceneToJson = !0,
    ws.init();
    new class {
        constructor() {
            var t;
            this.m_configUrl = "cat/fileconfig.json",
            this.m_uiUrl = "cat/ui.json",
            Mmobay.gameDispatcher.event(Mmobay.MEvent.LOAD_PROGRESS, Mmobay.MConst.LOAD_CFG),
            ws.stat && Laya.Stat.show(),
            Laya.alertGlobalError(!0),
            (t = Laya.ClassUtils.regClass)("Animation", a),
            t("Button", O),
            t("CheckBox", q),
            t("ComboBox", H),
            t("HBox", V),
            t("VBox", W),
            t("Scene", K),
            t("View", z),
            t("Dialog", Q),
            this.createAssistScrollView(),
            this.initTgAnalytics(),
            Laya.AtlasInfoManager.enable(this.m_configUrl, Laya.Handler.create(this, this.onConfigLoaded))
        }
        onConfigLoaded() {
            Xi(),
            Laya.MouseManager.multiTouchEnabled = !1,
            Laya.loader.clearRes(this.m_configUrl);
            let e = []
              , t = (Mmobay.MConfig.loadUI && e.push({
                url: this.m_uiUrl,
                type: Laya.Loader.PLF
            }),
            []);
            if ((t = Mmobay.Manager.loginMgr.isNew ? ["cat/ui_bg/wall1", "cat/ui_bg/office1", "cat/ui_bg/office1_1"] : t).forEach(t=>{
                e.push({
                    url: t + ".png",
                    type: Laya.Loader.IMAGE
                })
            }
            ),
            ["cat/atlas/cat/ui_comm", "cat/atlas/cat/ui_home"].forEach(t=>{
                e.push({
                    url: t + ".atlas",
                    type: Laya.Loader.ATLAS
                })
            }
            ),
            !e.length)
                return this.onResLoaded(!0);
            Laya.loader.load(e, Laya.Handler.create(this, this.onResLoaded))
        }
        onResLoaded(t) {
            window.Telegram && window.Telegram.WebApp.enableClosingConfirmation(),
            $i()
        }
        createAssistScrollView() {
            if (Laya.Browser.onAndroid)
                try {
                    let t = Laya.Browser.getElementById("assist-scroll-container");
                    if (!t)
                        return;
                    t.style.width = window.innerWidth,
                    t.style.height = window.innerHeight;
                    let i = Laya.Browser.createElement("ul");
                    var e = window.innerWidth + 2e3;
                    i.style.width = e,
                    i.style.position = "relative",
                    i.style.left = -1e3,
                    t.appendChild(i);
                    for (let e = 0; e < 20; e++) {
                        let t = Laya.Browser.createElement("li");
                        t.style.height = 200,
                        t.textContent = "" + e,
                        i.appendChild(t)
                    }
                    Laya.timer.once(200, this, ()=>{
                        t.scrollTop = 200
                    }
                    )
                } catch (t) {
                    console.log(t)
                }
        }
        initTgAnalytics() {
            window.telegramAnalytics && Mmobay.MConfig.analyticsToken && window.telegramAnalytics.init({
                token: Mmobay.MConfig.analyticsToken,
                appName: Mmobay.MConfig.analyticsName
            })
        }
    }
}();
