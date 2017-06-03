import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './Base.module.scss';
import * as strings from 'baseStrings';
import { IBaseWebPartProps } from './IBaseWebPartProps';

import { Views } from './app/base.views';
import { Controllers } from './app/base.controllers';

export default class BaseWebPart extends BaseClientSideWebPart<IBaseWebPartProps> {

  public get disableReactivePropertyChanges():boolean{
    return true;
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <!-- span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span -->
              <p class="ms-font-l ms-fontColor-white">SPFx Lists</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <p>
                Web Url : ${this.properties.WebUrl}
              </p>
              <p>
                List Count : ${this.properties.ListCount}
              </p>
              <p>
                <span id="lists" />
              </p>
               
            </div>
          </div>
        </div>
      </div>`;

    Controllers.getLists(this.context.spHttpClient, this.properties.WebUrl, this.properties.ListCount)
      .then((Controllers) => {
        var col = Controllers.value;
        
        this.domElement.querySelector("#lists").innerHTML = Views.getListHtml(col);

      })
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('WebUrl', {
                  label: "Enter Web Url",
                  multiline: true
                }),
                PropertyPaneSlider('ListCount', {
                  label: "List count",
                  max: 70,
                  min: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
