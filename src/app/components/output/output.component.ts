import { Component, Input, SimpleChanges } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TuiButtonModule } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { EditorView, basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; 

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [ClipboardModule, TuiButtonModule, CommonModule, FormsModule],
  templateUrl: './output.component.html',
  styleUrl: './output.component.scss'
})
export class OutputComponent {
  @Input() code = '';
  
  formattedCode = '';
  highlightedCode: SafeHtml = '';
  isEditMode = false;
  editorView: EditorView | null = null;

  prefix = `
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Т-Банк</title>

    <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900,900i"
        rel="stylesheet">
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900,900i');
        @import url('https://cdn.staticresources.ru/params/common_front/resourses/emails/stylesheet.css');

        :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
        }

        td,
        a,
        p,
        span {
            word-wrap: normal;
            word-break: normal;
            hyphens: none;
            font-family: 'San Francisco', Segoe, Roboto, Arial, Helvetica, sans-serif !important;
        }

        .bullet {
            line-height: 21px !important;
        }

        .btnBack:hover {
            background-color: #fcc521;
        }

        .btn:hover {
            background-color: #E4EBF3;
        }

        @media only screen and (min-width: 600px) {
            .tableItem {
                display: inline-block !important;
                width: 50% !important;
                vertical-align: top !important;
                -webkit-box-sizing: border-box !important;
                -moz-box-sizing: border-box !important;
                box-sizing: border-box !important;
                padding-right: 22px !important;
            }

            .tableNoBackItem {
                display: inline-block !important;
                width: 50% !important;
                vertical-align: top !important;
                -webkit-box-sizing: border-box !important;
                -moz-box-sizing: border-box !important;
                box-sizing: border-box !important;
                padding-left: 12px !important;
                padding-right: 12px !important;
            }
        }

        @media only screen and (max-width: 375px) {

            .btn,
            .btnBack {
                max-width: 100% !important;
            }
        }

        @media (prefers-color-scheme: dark) {
            .bodyTable {
                background-color: #404041 !important;
            }

            .contentTable {
                background-color: #333333 !important;
            }

            .textColor1 {
                color: #ffffff !important;
            }

            .textColor2 {
                color: #adadad !important;
            }

            .textColor3 {
                color: #8d8d8e !important;
            }

            .link {
                color: #336fee !important;
            }

            .line {
                background-color: #6D6F71 !important;
            }

            .accentBlock {
                background-color: #3c4149 !important;
            }

            .alarmBlock {
                background-color: #48453e !important;
            }

            .accentBorder {
                background-color: #6d6f71 !important;
            }

            .promoAccentBlock {
                background-color: #404041 !important;
            }

            .blockBack {
                background-color: #404041 !important;
            }

            .statDown {
                color: #f54444 !important;
            }

            .statUp {
                color: #00b92d !important;
            }

            .btn {
                color: #428bf9 !important;
                background-color: #3c4149 !important;
            }

            .btnBack {
                background-color: #ffdd2d !important;
                color: #333333 !important;
            }
        }

        [data-ogsc] .bodyTable {
            background-color: #404041 !important;
        }

        [data-ogsc] .contentTable {
            background-color: #333333 !important;
        }

        [data-ogsc] .textColor1 {
            color: #ffffff !important;
        }

        [data-ogsc] .textColor2 {
            color: #adadad !important;
        }

        [data-ogsc] .textColor3 {
            color: #8d8d8e !important;
        }

        [data-ogsc] .link {
            color: #336fee !important;
        }

        [data-ogsc] .line {
            background-color: #6D6F71 !important;
        }

        [data-ogsc] .accentBlock {
            background-color: #3c4149 !important;
        }

        [data-ogsc] .alarmBlock {
            background-color: #48453e !important;
        }

        [data-ogsc] .accentBorder {
            background-color: #6d6f71 !important;
        }

        [data-ogsc] .promoAccentBlock {
            background-color: #404041 !important;
        }

        [data-ogsc] .blockBack {
            background-color: #404041 !important;
        }

        [data-ogsc] .statDown {
            color: #f54444 !important;
        }

        [data-ogsc] .statUp {
            color: #00b92d !important;
        }

        [data-ogsc] .btn {
            color: #428bf9 !important;
            background-color: #3c4149 !important;
        }

        [data-ogsc] .btnBack {
            background-color: #ffdd2d !important;
            color: #333333 !important;
        }
    </style>

    <!--[if mso]>
    <style type="text/css">
        td,a,p,span{
            font-family: Arial, sans-serif !important;
        }
    </style>
    <![endif]-->
</head>

<body style="margin:0;padding:0;">
    <table class="bodyTable" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f6f7" width="100%"
        style="border-collapse:collapse;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;word-wrap:normal;word-break:normal;hyphens:none;">
        <tr>
            <td align="center" style="padding-bottom:48px;">
               
                <!--[if gte mso 9]>
                <table border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                        <td>
                <![endif]-->
                <table class="contentTable" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff"
                    style="width:100%;max-width:600px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;">
                    <tr>
                        <td align="center" style="padding:0 20px;">
                            <!--[if gte mso 9]>
                            <table border="0" cellpadding="0" cellspacing="0" width="536">
                                <tr>
                                    <td>
                            <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="width:100%;max-width:536px;">

                                <!-- start: header -->
                                <tr>
                                    <td style="padding:20px 0 16px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
  `

  suffix = `
                                        </table>
                                    </td>
                                </tr>
                                <!-- end: footer variables -->
	
                            </table>
                            <!--[if gte mso 9]>
                                    </td>
                                </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </table>
                <!--[if gte mso 9]>
                        </td>
                    </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
    </table>
</body>

</html>
 `;

  constructor(private sanitizer: DomSanitizer) {}
  
  ngOnChanges(changes: SimpleChanges) {
    (async () => {
      const beautify = await import('js-beautify');
      this.formattedCode = beautify.default.html(this.prefix + changes['code'].currentValue + this.suffix, {});
      
      const rawHtml = hljs.highlight(this.formattedCode, { language: 'xml' }).value;
      this.highlightedCode = this.sanitizer.bypassSecurityTrustHtml(rawHtml);

      if (this.editorView) {
         this.editorView.dispatch({
           changes: { from: 0, to: this.editorView.state.doc.length, insert: this.formattedCode }
         });
      }
    })().catch(console.error);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      setTimeout(() => {
        const el = document.getElementById('cm-editor-container');
        if (el) {
          this.editorView = new EditorView({
            doc: this.formattedCode,
            extensions: [
              basicSetup,
              html(),
              
              EditorView.theme({
                "&": { backgroundColor: "#020304", color: "#BBBEBF" }, // Фон и текст
                ".cm-gutters": { backgroundColor: "#020304", color: "#858889", borderRight: "1px solid #131415" },
                ".cm-activeLine": { backgroundColor: "#0e0f10" },
                ".cm-activeLineGutter": { backgroundColor: "#0e0f10" },
                ".cm-content": { caretColor: "#BBBEBF" },
                ".cm-cursor": { borderLeftColor: "#BBBEBF" },
                ".cm-selectionBackground, ::selection": { backgroundColor: "#27678260 !important" },
              }, { dark: true }),
              
              syntaxHighlighting(HighlightStyle.define([
                // Теги (<html>, <div>, <meta>) - голубые
                { tag: tags.tagName, color: "#569cd6" },       
                { tag: tags.angleBracket, color: "#808080" },  // Скобки < >
                { tag: tags.attributeName, color: "#9cdcfe" }, // Атрибуты (class, style)
                { tag: tags.string, color: "#ce9178" },        // Строки ("utf-8")
                { tag: tags.comment, color: "#6A9955", fontStyle: "italic" }, // Комментарии
                { tag: tags.number, color: "#b5cea8" },        // Числа (100px)
                { tag: tags.propertyName, color: "#9cdcfe" },  // Свойства CSS
                { tag: tags.keyword, color: "#569cd6" },       // Ключевые слова
                { tag: tags.meta, color: "#569cd6" },          // <!DOCTYPE>                
                { tag: tags.processingInstruction, color: "#569cd6" },
                { tag: tags.definitionKeyword, color: "#569cd6" },
                { tag: tags.moduleKeyword, color: "#569cd6" },
                { tag: tags.standard(tags.name), color: "#569cd6" },
                { tag: tags.standard(tags.tagName), color: "#569cd6" },
                { tag: tags.punctuation, color: "#D4D4D4" },   
              ])),
              
              EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                  this.formattedCode = update.state.doc.toString();
                  const newRawHtml = hljs.highlight(this.formattedCode, { language: 'xml' }).value;
                  this.highlightedCode = this.sanitizer.bypassSecurityTrustHtml(newRawHtml);
                }
              })
            ],
            parent: el
          });
        }
      }, 0);
    } else {
      if (this.editorView) {
        this.editorView.destroy();
        this.editorView = null;
        }
    }
  }
}
