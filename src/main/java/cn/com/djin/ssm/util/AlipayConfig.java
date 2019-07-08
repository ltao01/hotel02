package cn.com.djin.ssm.util;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：  ksfxhw3818@sandbox.com   111111
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016091700534569";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCKmJ6057h1H5XkGvuY0xiCNAQ4AfY88XbDx5qIf3V7rEemN6eqFLRCtErFzehBpcIzqrhgg64LDcY4adKTGV2Ym3BMHGUlhN3A4y0g2MTHsTYezdSo+hFQ00D64Y28tBCAK5MklpPxdwM3SK1lpFGM516GT3dazqX5S5EqC1Bu/z0YIn+qzruOQVOgT0OJQmvn9Xu56iZb7ExXqzQTYmPtR983UpIwUPQPyIB8hquSC64eKRp47G4DSktH+d08iHufinHp1Sti843akAaf5BnHIBM7/+Z2aV85mjZC23mUwdYrEe+YGF1St+X2vwxcHn0Yq6/lAj1oWuby2VkJg0qNAgMBAAECggEAdwNpvWUCM6lE2JUHGgujjyNFwCaHIXwkBSihHbd91g5xlF1UX6vZwzH4x3TyjXTel+lw3IgW6y0P2x+cEG8GvWY0/1ae0KIQnnM2LG+YQvZ8x+TuSZA7UFGoCgen47QoOzev6gpXzlDpdQ62v4Jj+QAxXlpc3qB3S+TFKfp/PmAwaXypsksBd1Colt9ggnf4Bf8Xc54WYRkVg1aaxggeaL569fhbJGs+GlZYYFBd/ohjKjSCxEc+4tV7QqLJ3usRaQdqyVQ+/7ksaAAG4X7BcHuRTe6quw4sytugTD6d3ni+TjeksyHBlfl784hVf8KxtrdCwDu13CgDXxaYatYYYQKBgQDOUHIbCjSFiYV3A8BNFUBi+nqwWNpZpDYDqUea/2GtfnafTqSekvcHKcO3SYzS5jKitbK2sGgeH7C4bv7Y2ccQL2iAcLRoG0VrdQXdIdKEuj86SwAGobLqILQYWpQB09cqtfDeRHa4NN3qU4V0ic8V8fXac20sJcqq9VYGlp/b1QKBgQCr+UNN7avyyKx8oHPV8VL9ahsqM+8USiPRvjbYWKWHAaJwHvXdd4nxBZFprFaFMJfIUC+x7PsiRHs1h8Sv3ja2WEK27fsOJXnd2RptZFUe1hPNCgTMPWzHdJgiRAuKKaX9th/d/Q8Hn/bS0MD/DMbS4tqjE2GJaCpZf6vtlDKn2QKBgH9N5krHDkeD5wXcG7G0tkkc082y1fDQQcAamSOMB8KdMSb1yOBMQP97hte3G50bDA2YXlEaIvTLiykS3FAEeS+EgVAXu0ot4bT/vYGImDTsE42tr7Nn3VVYnqgUZBWImNEy+RC9YCAkBvbLWKLjUhPxfEmyRaAjJZ49yjpAgR2NAoGBAIWu6ZvtcqnzRupGTGV2B/5Iej9vSZ1rGLcV90psdpghNCWWW6fCIe/DVUthFYzJvmOPudPFFV+I/oIZPVM9GSjcKVhMXMmdZkOHXdzFjsm+vnu4Gwytfx75Sr3wSUwonglAhzsoWYOi3Nr6PdzGENSkVjNIgJyw5aLW9U5k0o/ZAoGABxRzzrkgfgGqYt8aqsIZ4AF62USsISiZLcIv0DsGvnRyvzA2QAWPME4DLXGHrS3Xerr77PCvmf9FC2todHs8dfZFpzeiHIeV82dBz6UtsxfabzZA7Bi2DAbMvcLppt0kBAG8yEPaM0CKfM3yIBP9T4PFm/843q4iQrxE5Dlvlok=";
	
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7BE968RJrSBlu8Rvr3CFvvOxJjdHzMCT8+NvoGsH8C3zHoR6OJmrw/M1Tp5ubPIpgXmLfQgTGdtiCZlBSU/t7Myi/n38QTroZ0m3pgCXPq9h6vUvSxfqbGjVEOAw4yH6veDREd7Sloh5RTQ9sYwl2t9S/FpnKgDHJoH7hnb0rg5BvrDtkd6SeIyr4B9tRhzewUWFHOWSCRBTKCWeVRwYTiCz5dE1Wem2MJeoibDPXmrmzoxyw5ZGw9HR3m3erAC+i12lncwZ8aGfJx4fJliUKrRtppO4UAbVGP+HnuqmmgjA3NPNxcT5f8wmQvQX2OQCQzg1/7/WMxGD7qBB4IObvwIDAQAB";

	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://工程公网访问地址/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://localhost:8080/orders/myOrdersPay";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

