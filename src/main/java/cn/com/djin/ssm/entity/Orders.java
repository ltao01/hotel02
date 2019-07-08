package cn.com.djin.ssm.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;

@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
public class Orders {
    /** 主键 */
    private Integer id;

    /** 订单编号 */
    private String orderNum;

    /** 订单总价 */
    private Float orderMoney;

    /** 订单备注 */
    private String remark;

    /** 0未结算，1已结算 */
    private String orderStatus;

    /** 入住信息主键 */
    private Integer iriId;

    /** 下单时间 */
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss" ,timezone = "GMT+8")
    private Date createDate;

    /** 1显示，0隐藏 */
    private String flag;

    //订单其它内容（存储消费记录的字段数据）
    private String orderOther;

    //订单其它金额
    private String orderPrice;

    //入住信息的实体类属性
    private InRoomInfo inRoomInfo;

    //查询参数设置
    private Date startTime;

    private Date endTime;

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum == null ? null : orderNum.trim();
    }

    public Float getOrderMoney() {
        return orderMoney;
    }

    public void setOrderMoney(Float orderMoney) {
        this.orderMoney = orderMoney;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus == null ? null : orderStatus.trim();
    }

    public Integer getIriId() {
        return iriId;
    }

    public void setIriId(Integer iriId) {
        this.iriId = iriId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag == null ? null : flag.trim();
    }

    public String getOrderOther() {
        return orderOther;
    }

    public void setOrderOther(String orderOther) {
        this.orderOther = orderOther;
    }

    public InRoomInfo getInRoomInfo() {
        return inRoomInfo;
    }

    public void setInRoomInfo(InRoomInfo inRoomInfo) {
        this.inRoomInfo = inRoomInfo;
    }

    public String getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(String orderPrice) {
        this.orderPrice = orderPrice;
    }
}