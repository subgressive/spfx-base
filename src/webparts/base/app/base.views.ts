import { IList } from './base.models';

export class Views {

    public static getListHtml(col: IList[]): string {
        var html = '';
        col.forEach((item: IList) => {
            var isHidden = '';
            if (item.Hidden) {
                isHidden = "++ HIDEN ++"
            }
            html += `
            <li>${item.Title} ${isHidden}<br/>
            (Id = ${item.Id})<br/>
            ${item.Description}

            <hr/>

            </li>
            `;
        });
        return `
            <div>
                <ul>
                    ${html}
                </ul>
            </div>
            `
    }
}