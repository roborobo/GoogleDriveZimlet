/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Zimlets
 * Copyright (C) 2013 Zimbra, Inc.
 * 
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.3 ("License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 * http://www.zimbra.com/license.
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * ***** END LICENSE BLOCK *****
 */

/**
 * Constructor.
 *
 * @author Stephanie Tung
 */
function com_zimbra_googledrive_HandlerObject() {
	
};

com_zimbra_googledrive_HandlerObject.prototype = new ZmZimletBase();
com_zimbra_googledrive_HandlerObject.prototype.constructor = com_zimbra_googledrive_HandlerObject;

var GoogleDriveZimlet = com_zimbra_googledrive_HandlerObject;

GoogleDriveZimlet.prototype.init = function() {
	this._googleApiKey = this.getConfig("ZimbraGoogleApiKey");
	appCtxt.cacheSet("ZimbraGoogleApiKey", this._googleApiKey);
	this._googleOAuthId = this.getConfig("ZimbraGoogleOAuthId");
	appCtxt.cacheSet("ZimbraGoogleOAuthId", this._googleOAuthId);
	
	this._loadGoogleDriveChooser();
};

GoogleDriveZimlet.prototype.initializeAttachPopup =
function(menu, controller) {
	var mi = controller._createAttachMenuItem(menu, "Google Drive",
			new AjxListener(this, this.showGoogleDriveChooser ));
};

GoogleDriveZimlet.prototype.showGoogleDriveChooser=
function() {
	var options = {
		apiKey: appCtxt.cacheGet("ZimbraGoogleApiKey"),
		clientId: appCtxt.cacheGet("ZimbraGoogleOAuthId"),
	    onSelect: function(file) {
		    var view = appCtxt.getCurrentView();
		    var editor = view.getHtmlEditor();
		    //editor.focus();
		    var editorContent =  editor.getContent();
		    var isHtml = view && view.getComposeMode() === DwtHtmlEditor.HTML;
		    if (isHtml) {
                var endId = tinymce.DOM.uniqueId();

			    var div = '<table style="background-color:rgb(245, 245, 245); padding:10px 14px; margin-right:10px; color:rgb(34, 34, 34); '; 
                div+='font-family:arial; font-style:normal; font-weight:bold; font-size:13px; cursor:default; border:1px solid rgb(221, 221, 221); float:left;">';
                div+='<tbody><tr><td>';
				div+='<a href="' + file.alternateLink + '" target="_blank"><img style="padding-bottom:7px; border:none;" width="64" height="64" src="' + file.thumbnailLink + '"></a>';
				div+='<div dir="ltr" title="' + file.title + '" style="color:rgb(17, 85, 204); text-decoration:initial; vertical-align:bottom;">';
			    div+='<a href="' + file.alternateLink + '" target="_blank" style=" display:inline-block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; text-decoration:none; text-align:center; cursor:pointer;padding:1px 0; border:none; max-width:200px;">' + file.title + '</div></a>';
				div+='</div></td></tbody></table><span id="' + endId + '">&nbsp;</span>';
  
			    var ed = editor.getEditor();
			    editor.restoreFocus(ed);

			    //tinymce modifies the source when using mceInsertContent
			    //ed.execCommand('mceInsertContent', false, html.join(""), {skip_undo : 1});
			    ed.execCommand('mceInsertRawHTML', false, div, {skip_undo : 1});

				//select filler span to jump the cursor to
			    var newNode = ed.dom.select('span#' + endId);
                ed.selection.select(newNode[0]);
		    }
		    else {
			    view.getHtmlEditor().setContent(editorContent + "\n" + file.title + " : " + file.alternateLink + "\n");
		    }
	    }
	};
	var picker = new FilePicker(options);
};

GoogleDriveZimlet.prototype._loadGoogleDriveChooser = function() {

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "filepicker.js";
	script.id = "filepicker";
	document.body.appendChild(script);

	var googleScript = document.createElement("script");
	googleScript.type = "text/javascript";
	googleScript.src = "https://www.google.com/jsapi?key="+this._googleApiKey;
	googleScript.id = "googleScript";
	document.body.appendChild(googleScript);

	var googlePickerScript = document.createElement("script");
	googlePickerScript.type = "text/javascript";
	googlePickerScript.src = "https://apis.google.com/js/client.js?onload=initPicker";
	googlePickerScript.id = "googlePicker";
	document.body.appendChild(googlePickerScript);
};