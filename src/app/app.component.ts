import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, of, timer } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private http: HttpClient) {}
  maxDepth = 0;
  reducedArray = (arr, depth = 0, parentSearch = []) => {
    this.maxDepth = Math.max(this.maxDepth, depth);
    if (!arr) {
      return [];
    }

    return arr.reduce((prev, { items, ...otherProps }) => {
      // const depth = this.findDepth({ items, ...otherProps });
      const search = [
        ...this.getProps({ items, ...otherProps }, "id"),
        ...this.getProps({ items, ...otherProps }, "name")
      ];
      const newParentSearch = [...parentSearch, otherProps.name, otherProps.id];
      return [
        ...prev,
        { ...otherProps, search, depth, parentSearch },
        ...this.reducedArray(items, depth + 1, newParentSearch)
      ];
    }, []);
  };

  getProps = (item, prop) => {
    if (!item.items) {
      return [item[prop]];
    } else {
      return [
        item[prop],
        ...item.items.map(x => this.getProps(x, prop))
      ].flat();
    }
  };

  filterString$ = new BehaviorSubject("");
  findDepth = item => {
    let depth = 0;
    if (item.items) {
      depth = 1 + Math.max(...item.items.map(i => this.findDepth(i)));
    }

    return depth;
  };
  data$ = this.http.get<any[]>("my/api/url");
  getStyle = ({ depth, search: { length } }) => ({
    color: depth === 0 ? "darkblue" : depth === 1 ? "green" : "black",
    paddingLeft: depth * 7 + "px",
    fontWeight: 800 - depth * 200,
    cursor: length === 2 ? "pointer" : "default",
  });
  filteredData$ = combineLatest([this.data$, this.filterString$]).pipe(
    map(([data, filterString]) =>
      this.reducedArray(data)
        .filter(
          ({ search, parentSearch }) =>
            !![...search, ...parentSearch].find(x => x.includes(filterString))
        )
        .map(data => ({
          ...data,
          disabled: data.search.length == 2,
          styles: this.getStyle(data)
        }))
    )
  );
  preventSelect(event, disabled) {
    if (!disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
