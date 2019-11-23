import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { datamodel } from '../datamodel';

export class Data {
  tid: string;
  wordsQty: number;
  includeQuote: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  _data: Data = new Data();
  mobile: boolean;
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  isLoading = false;
  nonEmpty = false;
  chapters: datamodel[];
  tidVal = '';
  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService) {
    this._data.tid = '';
    this._data.wordsQty = 400;
    this._data.includeQuote = false;
  }
  ngOnInit() {
    if (window.screen.width < 1100) { // 768px portrait
      this.mobile = true;
    }
  }

  downloadfunc() {
    if (this.chapters != null) {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'India Forums URL links',
        text: "<!doctype html><html lang='en'><head> <meta charset='utf-8'>  <title>WebParser</title>" +
          "  <base href='/'>  <style type='text/css'>    body {      font: 20px Montserrat, sans-serif;  " +
          "    line-height: 3;      color: #f5f6f7;    }        .margin {      margin-bottom: 45px;    }  " +
          "      .bg-1 {      color: #ffffff;      padding-left: 5%;      padding-bottom: 2%;      padding-top: 2%; " +
          "     padding-right: 5%;    }        .cont-form {      box-sizing: border-box !important;    } " +
          "       .navbar {      margin-top: 2%;      text-align: center;    }   " +
          "     .bg-2 {      background-color: #474e5d; /* Dark Blue */      color: #ffffff;      padding: 4%;    }   " +
          "      .bg-3 {      background-color: #ffffff; /* White */      color: #555555;      padding: 5%;    }    " +
          "     .bg-4 {      background-color: #2f2f2f; /* Black Gray */      color: #fff;      padding: 1%;    }    " +
          "     .container-fluid {      padding-top: 70px;      padding-bottom: 70px;    }     " +
          "    .navbar {      padding-top: 15px;      padding-bottom: 15px;      border: 0;    " +
          "   border-radius: 0;      margin-bottom: 0;      font-size: 12px;      letter-spacing: 5px;    }    " +
          "     .navbar-brand a:hover {      color: #1abc9c !important;    } " +
          "    </style>  <meta name='viewport' content='width=device-width, initial-scale=1'>" +
          "   <link rel='icon' type='image/x-icon' href='favicon.ico'> " +
          "  <link  href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' " +
          "  rel='stylesheet'></head><body class='text-center bg2 container'>" +
          " <form class=\"form-style bg-2\"><div class='form-group text-center' style='margin-top:5%;'>" +
          "<div class='container bg-1'>" +
          "      <h3 style='color: white'><a href='http://indiaforumsurlfinder.s3-website.ap-south-1.amazonaws.com' style='color:white;'>India Forums - Author\'s Posts within a thread - Finder</a></h3>" +
          "   </div>"
          + "<div class=\"form-group row text-center\">" +
          " <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">" +
          " <a href=\"https://amzn.to/2NyL11t\" id=\"amazonDiwali\" target=\"_blank\">" +
          "  <img class=\"img-responsive\" src=\"https://indiaforumsurlfinder.s3.ap-south-1.amazonaws.com/assets/amazonDiwali.jpg\" width=\"100%\"" +
          " height=\"100%\" border=\"0\" style=\"border:none !important; margin:0px !important;\" /></a>" + "</div>"
          + "            </div>" + "    <div id=\"amaff\" class=\"text-center\">"
          + "    </div>" + "    <div class=\"form-group row text-center\">"
          + "        <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">"
          + "            <a href=\"https://www.amazon.in/dp/B077S5CVBQ/?ref=assoc_tag_sept19?actioncode=AINOTH066082819002X&tag=she43-21\" id=\"audible\""
          + "                target=\"_blank\">" + 
          "                <img class=\"img-responsive\" src=\"http://indiaforumsurlfinder.s3-website.ap-south-1.amazonaws.com/assets/Amazon_Audible_1068x260.jpg\" width=\"100%\""
          + "                    height=\"100%\" border=\"0\" style=\"border:none !important; margin:0px !important;\" /></a>" + 
          " </div></div>" +
         "Thread Link:<br>" +
          "  <a href=\'" + this._data.tid + "'> " + this._data.tid + "</a><br>Minimum number of " + this._data.wordsQty + " words<div style='color:#2f2f2f'>" +
          document.getElementById("resultTable").innerHTML + " <div style='color:white'>" +
          "  All Members only posts - fetched by default irrespective of word count." +
          "  </div>" + "</div></div></form></body</html>"
      });
    }


  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = 'text/html';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    if (!element.dispatchEvent(event)) {
      window.alert('Unable to downlaod');
    }
  }
  incQuote() {
    this._data.includeQuote = !this._data.includeQuote;
  }


  get_data() {
    console.log(this._data);
    this.chapters = [];
    if (this._data.tid.trim() !== '' && this._data.wordsQty > 0) {
      let burl = '//3.15.179.82:4201/fetchData';
      // let burl = '//localhost:4201/fetchData';
      const headers = new Headers({ 'Content-Type': 'application/json' });
      let params = new HttpParams();
      params = params.set('tid', this._data.tid);
      params = params.set('wordsQty', this._data.wordsQty + '');
      params = params.set('includeQuote', this._data.includeQuote + '');
      this.isLoading = true;
      this.spinner.show();
      this.httpClient.post(burl, params)
        .subscribe(
          (res) => {
            this.chapters = JSON.parse(JSON.stringify(res));
            console.log(this.chapters);

          },
          (error) => {
            console.log('Error happened' + error);
            this.isLoading = false;
            alert("No posts returned. Please ensure it is not members only thread or try later.");
            this.spinner.hide();
          },
          () => {
            console.log('the subscription is completed');
            this.isLoading = false;
            if (this.chapters.length != 0) {
              this.nonEmpty = true;
              this.spinner.hide();
            }
            else {
              alert("No posts returned. Please ensure it is not members only thread or try later.");
              this.spinner.hide();
            }
          });
    } else {
      alert('Word Length should not be less than zero and Thread Link should not be empty');
    }
  }

}
