import { Selector, RequestLogger } from 'testcafe';

const LoginID = 'testcafe_zentai';
const LoginPass = 'testcafe_zentai';
const logger = RequestLogger('https://dev3.learning-ware.jp/');

fixture `check_200`
    .page `https://dev3.learning-ware.jp/`;

test
    .requestHooks(logger)
    ('login', async t => {

        await t
            .click(Selector('#loginid'))
            .typeText(Selector('#loginid'), LoginID)
            .pressKey('tab')
            .typeText(Selector('#password'), LoginPass)
            .pressKey('enter');

        await t
            .expect(logger.contains(record => record.response.statusCode === 200)).ok()

            //ユーザーの登録
            .navigateTo('https://dev3.learning-ware.jp/admin/user/create')
            .expect(logger.contains(record => record.response.statusCode === 200)).ok()

            //ユーザーの一括登録・変更(CSV)
            .navigateTo('https://dev3.learning-ware.jp/admin/user-csv')
            .expect(logger.contains(record => record.response.statusCode === 200)).ok()

            //ユーザーの管理
            .navigateTo('https://dev3.learning-ware.jp/admin/user/list')
            .expect(logger.contains(record => record.response.statusCode === 200)).ok();

        const logRecord = logger.requests[0];

    });