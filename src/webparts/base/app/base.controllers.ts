import {
    SPHttpClient,
} from '@microsoft/sp-http'

import { ILists } from './base.models'

export class Controllers {

    public static getLists(client: SPHttpClient, webUrl: string, count: string): Promise<ILists> {
        return client.get(webUrl + '/_api/web/lists?$top='+count, SPHttpClient.configurations.v1)
            .then((resp: Response) => {
                return resp.json();
            });
    }
}