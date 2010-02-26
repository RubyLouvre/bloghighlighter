//SyntaxHighlighter.config.clipboardSwf = 'http://bloghighlighter.googlecode.com/files/clipboard.swf';
//SyntaxHighlighter.all();
var guarder = function(mercy){
    mercy = mercy || true;
    var unselect = function(){
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    };
    if(mercy){
        document.onselectstart=unselect;
        document.oncopy=unselect;
        document.onbeforecopy=unselect;
        document.onmouseup=unselect;
        document.onselect=unselect;
        document.onpaste=unselect;       
    };
}
var getElementsByClassName = function (searchClass, node,tag) {
    if(document.getElementsByClassName){
        return  document.getElementsByClassName(searchClass);
    }else{
        node = node || document;
        tag = tag || "*";
        var classes = searchClass.split(" "),
        elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
        patterns = [],
        returnElements = [],
        current,
        match;
        var i = classes.length;
        while(--i >= 0){
            patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
        }
        var j = elements.length;
        while(--j >= 0){
            current = elements[j];
            match = false;
            for(var k=0, kl=patterns.length; k<kl; k++){
                match = patterns[k].test(current.className);
                if (!match) break; 
            }
            if (match)  returnElements.push(current);
        }
        return returnElements;
    }
}

var loadEvent = function(fn) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = fn;
    }else {
        window.onload = function() {
            oldonload();
            fn();
        }
    }
}

var normalizeCode = function(code){
    code = code.replace(/&lt;/g,'<');
    code = code.replace(/&gt;/g,'>');
    code = code.replace(/&amp;/g,'&');
    return code;
};

var runCode = function(code){
    if (code!=""){
        var newwin = window.open('', "_blank", '');
        newwin.document.open('text/html', 'replace');
        newwin.opener = null;
        newwin.document.write(code);
        newwin.document.close();
    }    
};

var evalCode = function(code){
    var head = document.getElementsByTagName("head")[0],
    js = document.createElement("script");
    js.type = "text/javascript";
    js.charset= "utf-8";
    js.text = code;
    head.insertBefore(js, head.firstChild);
    head.removeChild(js);
};

var runCodes = function(){
    document.onclick = function(e){        
        e = e || window.event;
        var target = e.srcElement ? e.srcElement : e.target,
        tag = target.nodeName.toLowerCase();
        if((tag == "button") && hasClass(target,"runcode")){
            var id = target.getAttribute("title"),
            code = document.getElementById(id).innerHTML;
            code = normalizeCode(code);
            hasClass(target,"direct") ? evalCode(code):runCode(code);
        }
    }
};

var hasClass = function(ele,cls) {
    return -1 < (" "+ele.className+" ").indexOf(" "+cls+" ");
};
var addClass = function(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
};
var removeClass = function(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
};
var addEvent = (function () {
    if (document.addEventListener) {
        return function (el, type, fn) {
            el.addEventListener(type, fn, false);
        };
    } else {
        return function (el, type, fn) {
            el.attachEvent('on' + type, function () {
                return fn.call(el, window.event);
            });
        };
    };
})();
var tableManager = function(){
    var tables = getElementsByClassName("filament_table",document,"table");
    if(tables.length > 0){
        for(var i=0,l= tables.length;i<l;i++){
            var table = tables[i],
            rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr"),
            j = rows.length;
            while(--j > 0){
                if(!+"\v1" && j%2 == 1){
                    addClass(rows[j],"even");
                };
            };
            with(table){
                cellSpacing= "0";
                width = table.getAttribute("width") || "700";
                rules = "cols"
                };
            addEvent(table,'mouseover',function(){
                var e = arguments[0] || window.event,
                td = e.srcElement ? e.srcElement : e.target,
                tr =  td.parentNode,
                trn = tr.nodeName.toLowerCase(),
                tbodyn = tr.parentNode.nodeName.toLowerCase();
                if(trn == 'tr' && tbodyn == 'tbody'){
                    addClass(tr,"hover");
                };
            });
            addEvent(table,'mouseout',function(){
                var e = arguments[0] || window.event,
                td = e.srcElement ? e.srcElement : e.target,
                tr =  td.parentNode,
                trn = tr.nodeName.toLowerCase(),
                tbodyn = tr.parentNode.nodeName.toLowerCase();
                if(trn == 'tr' && tbodyn == 'tbody' && hasClass(tr,"hover")){
                    removeClass(tr,"hover");
                };
            });
        };
    };
};

loadEvent(function(){
    runCodes();
    //  activateCodes();
    tableManager();
})