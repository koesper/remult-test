import express from "express";
import swaggerUi from 'swagger-ui-express';
import {remult} from "remult"
import {remultExpress} from "remult/remult-express"

const app = express();

// remult
import {Product} from "../shared/product";
export const api = remultExpress({
    entities: [Product]
})
app.use(api);

// custom endpoint
app.get('/api/foo', api.withRemult, async (req, res) => {
    const productRepo = remult.repo(Product);
    let data = []
    for (const product of await productRepo.find()) {
        product.foo = '1234';
        data.push(await productRepo.save(product));
    }
    res.send(data);
})


/* swagger */
const openApiDocument = api.openApiDoc({title: process.env['npm_package_name'] + ' - v' + process.env['npm_package_version']});
//manually add the non-remult endpoints to the openApiDocument
app._router.stack.forEach(function (r: any) {
    if (r.route && r.route.path) {
        let path = r.route.path;
        let method = r.route.stack[0].method;
        openApiDocument.paths[path] = openApiDocument.paths[path] ?? {};
        openApiDocument.paths[path][method] = openApiDocument.paths[path][method] ?? {};
        openApiDocument.paths[path][method] = {description: 'See code for documentation. \n Non-remult endpoint, thus unknown to swagger', tags: ['manually added endpoint']}
    }
})
app.get("/api/openApi.json", (req, res) => res.json(openApiDocument));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));


app.listen(4201, () => console.log("Server started"));
