import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-patient-list-dlg',
  template: `
      <div class="container">
          <div align="center">
              <h3>교육 목록</h3>
          </div>
          <br/>
          <div style="overflow: scroll; height: 500px">
              <table class="table table-fixed table-bordered">
                  <thead>
                  <tr>
                      <th>GID</th>
                      <th>ID</th>
                      <th>제 목</th>
                      <th>환자명</th>
                      <th>교육일</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>11111</td>
                      <td>11111</td>
                      <td>당뇨병에 대한 교육 및 처방 </td>
                      <td>홍길동</td>
                      <td>2019/01/01</td>
                  </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <br/>
      <div align="center">
          <button type="button" class="btn btn-primary">닫 기</button>
      </div>
  `,
  styles: [
      `
      .btn-primary {
          width: 80px;
      }
      table {
          width: 100%;
          margin: 0 auto;
          border-collapse: collapse;
      }

      th {
          background-color: #bbdefb;
      }

      td {
          border: 1px solid #DDD;
          text-align: left;
          padding: 8px;

      }

      tr:nth-child(even) {
          background-color: #e3f2fd;
      }
    `
  ]
})
export class ConsultListDlgComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
