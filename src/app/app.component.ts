import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'virtual-list-demo';

  public listData = []

  ngOnInit() {
    this.listData = this.getMockData(10);
  }

  public getMockData(num) {
    let res = []
    for (let index = 0; index < num; index++) {
      res.push({
        str: Math.random().toString(36).substring(3, 8),
        // count: Math.floor(Math.random() * 1000)
        count: index
      })

    }
    return res
  }

}
