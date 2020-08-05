import {reportKey, reportTable} from '../decorators/ReportDecorators';



export class ReportUtils {
    /**
     * 页面显示的埋点。我们的页面显示可能会上报待服务器，或者上报到数据库表中
     */
    @reportTable('tb_page_show')
    public static reportPageShow(
        @reportKey("report_page") reportPage: string,
        @reportKey("report_type") reportType: string,
        @reportKey("report_content") reportContent: string,
    ): void {}
}
