/*
Navicat MySQL Data Transfer

Source Server         : djin
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : k8514hotel

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-06-11 13:22:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `in_room_info`
-- ----------------------------
DROP TABLE IF EXISTS `in_room_info`;
CREATE TABLE `in_room_info` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `customer_name` varchar(40) DEFAULT NULL COMMENT '客人姓名',
  `gender` varchar(2) DEFAULT '1' COMMENT '性别(1男 0女)',
  `is_vip` varchar(2) DEFAULT '0' COMMENT '0普通，1vip',
  `idcard` varchar(20) DEFAULT NULL COMMENT '身份证号',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `money` float(10,2) DEFAULT NULL COMMENT '押金',
  `create_date` datetime DEFAULT NULL COMMENT '入住时间',
  `room_id` int(20) DEFAULT NULL COMMENT '房间表主键',
  `status` varchar(2) DEFAULT '1' COMMENT '显示状态：1显示，0隐藏',
  `out_room_status` varchar(2) DEFAULT '0' COMMENT '退房状态：0未退房 1已经退房',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of in_room_info
-- ----------------------------

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_num` varchar(50) DEFAULT NULL COMMENT '订单编号',
  `order_money` float(10,2) DEFAULT NULL COMMENT '订单总价',
  `remark` varchar(100) DEFAULT NULL COMMENT '订单备注',
  `order_status` varchar(2) DEFAULT '0' COMMENT '0未结算，1已结算',
  `iri_id` int(20) DEFAULT NULL COMMENT '入住信息主键',
  `create_date` datetime DEFAULT NULL COMMENT '下单时间',
  `flag` varchar(2) DEFAULT '1' COMMENT '1显示，0隐藏',
  `order_other` varchar(100) DEFAULT NULL COMMENT '退房时的客人信息时间等等',
  `order_price` varchar(100) DEFAULT NULL COMMENT '退房时的各种金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for `role_auth`
-- ----------------------------
DROP TABLE IF EXISTS `role_auth`;
CREATE TABLE `role_auth` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int(20) DEFAULT NULL COMMENT '角色id',
  `auth_id` int(20) DEFAULT NULL COMMENT '权限id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_auth
-- ----------------------------
INSERT INTO `role_auth` VALUES ('1', '1', '1');
INSERT INTO `role_auth` VALUES ('2', '1', '2');
INSERT INTO `role_auth` VALUES ('3', '1', '3');
INSERT INTO `role_auth` VALUES ('4', '1', '4');
INSERT INTO `role_auth` VALUES ('5', '1', '5');
INSERT INTO `role_auth` VALUES ('6', '1', '6');
INSERT INTO `role_auth` VALUES ('7', '1', '11');
INSERT INTO `role_auth` VALUES ('8', '1', '12');
INSERT INTO `role_auth` VALUES ('9', '1', '13');
INSERT INTO `role_auth` VALUES ('10', '1', '21');
INSERT INTO `role_auth` VALUES ('11', '1', '31');
INSERT INTO `role_auth` VALUES ('12', '1', '32');
INSERT INTO `role_auth` VALUES ('13', '1', '41');
INSERT INTO `role_auth` VALUES ('14', '1', '42');
INSERT INTO `role_auth` VALUES ('15', '1', '51');
INSERT INTO `role_auth` VALUES ('16', '1', '52');
INSERT INTO `role_auth` VALUES ('17', '1', '53');
INSERT INTO `role_auth` VALUES ('18', '1', '61');
INSERT INTO `role_auth` VALUES ('19', '2', '1');
INSERT INTO `role_auth` VALUES ('20', '2', '2');
INSERT INTO `role_auth` VALUES ('21', '2', '3');
INSERT INTO `role_auth` VALUES ('22', '2', '4');
INSERT INTO `role_auth` VALUES ('23', '2', '6');
INSERT INTO `role_auth` VALUES ('24', '2', '11');
INSERT INTO `role_auth` VALUES ('25', '2', '12');
INSERT INTO `role_auth` VALUES ('26', '2', '13');
INSERT INTO `role_auth` VALUES ('27', '2', '21');
INSERT INTO `role_auth` VALUES ('28', '2', '31');
INSERT INTO `role_auth` VALUES ('29', '2', '32');
INSERT INTO `role_auth` VALUES ('30', '2', '41');
INSERT INTO `role_auth` VALUES ('31', '2', '42');
INSERT INTO `role_auth` VALUES ('32', '2', '61');
INSERT INTO `role_auth` VALUES ('33', '3', '1');
INSERT INTO `role_auth` VALUES ('34', '3', '2');
INSERT INTO `role_auth` VALUES ('35', '3', '3');
INSERT INTO `role_auth` VALUES ('36', '3', '4');
INSERT INTO `role_auth` VALUES ('37', '3', '11');
INSERT INTO `role_auth` VALUES ('38', '3', '12');
INSERT INTO `role_auth` VALUES ('39', '3', '13');
INSERT INTO `role_auth` VALUES ('40', '3', '21');
INSERT INTO `role_auth` VALUES ('41', '3', '31');
INSERT INTO `role_auth` VALUES ('42', '3', '32');
INSERT INTO `role_auth` VALUES ('43', '3', '41');

-- ----------------------------
-- Table structure for `room_type`
-- ----------------------------
DROP TABLE IF EXISTS `room_type`;
CREATE TABLE `room_type` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `room_type_name` varchar(20) DEFAULT NULL COMMENT '房间类型名',
  `room_price` float(10,2) DEFAULT NULL COMMENT '房间的单价',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of room_type
-- ----------------------------
INSERT INTO `room_type` VALUES ('1', '单人间', '140.00');
INSERT INTO `room_type` VALUES ('2', '双人间', '180.00');
INSERT INTO `room_type` VALUES ('3', '豪华间', '280.00');
INSERT INTO `room_type` VALUES ('5', '总统套房', '500.00');
INSERT INTO `room_type` VALUES ('6', '钟点房', '100.00');
INSERT INTO `room_type` VALUES ('7', '情侣套房', '599.00');
INSERT INTO `room_type` VALUES ('8', '单人间带窗户', '200.00');
INSERT INTO `room_type` VALUES ('9', '双人间(带窗户)', '240.00');
INSERT INTO `room_type` VALUES ('10', '总统房(带窗户)', '1280.00');
INSERT INTO `room_type` VALUES ('11', '棋牌室', '180.00');

-- ----------------------------
-- Table structure for `rooms`
-- ----------------------------
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `room_num` varchar(10) DEFAULT NULL COMMENT '房间编号',
  `room_status` varchar(2) DEFAULT '0' COMMENT '房间的状态(0空闲，1已入住，2打扫)',
  `room_type_id` int(20) DEFAULT NULL COMMENT '房间类型主键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rooms
-- ----------------------------
INSERT INTO `rooms` VALUES ('1', '8201', '0', '1');
INSERT INTO `rooms` VALUES ('2', '8202', '0', '1');
INSERT INTO `rooms` VALUES ('3', '8203', '0', '1');
INSERT INTO `rooms` VALUES ('4', '8204', '0', '2');
INSERT INTO `rooms` VALUES ('5', '8205', '0', '3');
INSERT INTO `rooms` VALUES ('6', '8206', '0', '3');
INSERT INTO `rooms` VALUES ('7', '8207', '0', '2');
INSERT INTO `rooms` VALUES ('8', '8208', '0', '5');
INSERT INTO `rooms` VALUES ('9', '8209', '0', '3');
INSERT INTO `rooms` VALUES ('10', '8210', '0', '5');
INSERT INTO `rooms` VALUES ('11', '8211', '0', '1');
INSERT INTO `rooms` VALUES ('12', '8212', '0', '3');
INSERT INTO `rooms` VALUES ('13', '8301', '0', '5');
INSERT INTO `rooms` VALUES ('14', '8302', '0', '2');
INSERT INTO `rooms` VALUES ('15', '8303', '0', '1');
INSERT INTO `rooms` VALUES ('16', '8304', '0', '3');
INSERT INTO `rooms` VALUES ('17', '8305', '0', '3');
INSERT INTO `rooms` VALUES ('18', '8306', '0', '3');
INSERT INTO `rooms` VALUES ('19', '8307', '0', '6');

-- ----------------------------
-- Table structure for `roomsale`
-- ----------------------------
DROP TABLE IF EXISTS `roomsale`;
CREATE TABLE `roomsale` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '消费id',
  `room_num` varchar(100) DEFAULT NULL COMMENT '房间号',
  `customer_name` varchar(100) DEFAULT NULL COMMENT '客人姓名',
  `start_date` datetime DEFAULT NULL COMMENT '入住时间',
  `end_date` datetime DEFAULT NULL COMMENT '退房时间',
  `days` int(4) DEFAULT NULL COMMENT '天数',
  `room_price` double(22,0) DEFAULT NULL COMMENT '房屋单价',
  `rent_price` double(22,0) DEFAULT NULL COMMENT '住宿费',
  `other_price` double(22,0) DEFAULT NULL COMMENT '其它消费',
  `sale_price` double(22,0) DEFAULT NULL,
  `discount_price` double(22,0) DEFAULT NULL COMMENT '优惠金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roomsale
-- ----------------------------

-- ----------------------------
-- Table structure for `system_authority`
-- ----------------------------
DROP TABLE IF EXISTS `system_authority`;
CREATE TABLE `system_authority` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `authority_name` varchar(20) DEFAULT NULL COMMENT '权限名',
  `authority_url` varchar(200) DEFAULT '#' COMMENT '权限跳转地址',
  `parent` int(20) DEFAULT '0' COMMENT '记住上级的主键，0为一级节点',
  `flag` varchar(2) DEFAULT '0' COMMENT '1超级权限，0普通权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_authority
-- ----------------------------
INSERT INTO `system_authority` VALUES ('1', '入住管理', '#', '0', '0');
INSERT INTO `system_authority` VALUES ('2', '订单管理', '#', '0', '0');
INSERT INTO `system_authority` VALUES ('3', '会员管理', '#', '0', '0');
INSERT INTO `system_authority` VALUES ('4', '客房管理', '#', '0', '0');
INSERT INTO `system_authority` VALUES ('5', '系统用户管理', '#', '0', '0');
INSERT INTO `system_authority` VALUES ('6', '客人意见', '#', '0', '0');
INSERT INTO `system_authority` VALUES ('11', '入住信息管理', 'model/toShowInRoomInfo', '1', '0');
INSERT INTO `system_authority` VALUES ('12', '入住信息添加', 'model/toSaveInRoomInfo', '1', '0');
INSERT INTO `system_authority` VALUES ('13', '消费记录', 'model/toShowRoomSale', '1', '0');
INSERT INTO `system_authority` VALUES ('21', '订单查询', 'model/toShowOrders', '2', '0');
INSERT INTO `system_authority` VALUES ('31', '会员信息管理', 'model/toShowVip', '3', '0');
INSERT INTO `system_authority` VALUES ('32', '添加会员', 'model/toSaveVip', '3', '0');
INSERT INTO `system_authority` VALUES ('41', '客房信息管理', 'model/toShowRooms', '4', '0');
INSERT INTO `system_authority` VALUES ('42', '房型信息管理', 'model/toShowRoomType', '4', '0');
INSERT INTO `system_authority` VALUES ('51', '角色信息管理', 'model/toShowRole', '5', '0');
INSERT INTO `system_authority` VALUES ('52', '用户信息管理', 'model/toShowUser', '5', '0');
INSERT INTO `system_authority` VALUES ('53', '添加用户', 'model/toSaveUser', '5', '0');
INSERT INTO `system_authority` VALUES ('61', '客人意见', 'model/toShowIdd', '6', '0');

-- ----------------------------
-- Table structure for `system_roles`
-- ----------------------------
DROP TABLE IF EXISTS `system_roles`;
CREATE TABLE `system_roles` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_name` varchar(40) DEFAULT NULL COMMENT '角色名',
  `create_date` datetime DEFAULT NULL COMMENT '角色创建时间',
  `status` varchar(2) DEFAULT '0' COMMENT '角色禁用启用状态，1启用,0禁用',
  `flag` varchar(2) DEFAULT '0' COMMENT '1超級角色  0普通角色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_roles
-- ----------------------------
INSERT INTO `system_roles` VALUES ('1', '超级管理员', '2019-04-29 14:19:59', '1', '1');
INSERT INTO `system_roles` VALUES ('2', '主管', '2019-05-05 15:04:35', '1', '0');
INSERT INTO `system_roles` VALUES ('3', '前台', '2019-04-30 16:56:47', '1', '0');

-- ----------------------------
-- Table structure for `system_user`
-- ----------------------------
DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(40) DEFAULT NULL COMMENT '账号',
  `pwd` varchar(40) DEFAULT NULL COMMENT '密码',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `use_status` varchar(2) DEFAULT '1' COMMENT '启用状态：1启用，0禁用',
  `is_admin` varchar(2) DEFAULT '0' COMMENT '1超级管理员，0普通管理员',
  `role_id` int(20) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_user
-- ----------------------------
INSERT INTO `system_user` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '2018-09-20 14:20:19', '1', '1', '1');
INSERT INTO `system_user` VALUES ('13', 'lisi', '4297f44b13955235245b2497399d7a93', '2019-04-29 14:45:50', '1', '0', '2');
INSERT INTO `system_user` VALUES ('15', 'zhangsan', '4297f44b13955235245b2497399d7a93', '2019-05-05 16:01:31', '1', '0', '3');

-- ----------------------------
-- Table structure for `vip`
-- ----------------------------
DROP TABLE IF EXISTS `vip`;
CREATE TABLE `vip` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `vip_num` varchar(50) DEFAULT NULL COMMENT '会员卡编号',
  `customer_name` varchar(40) DEFAULT NULL COMMENT '会员姓名',
  `vip_rate` float(2,1) DEFAULT '0.9' COMMENT '1~9折',
  `idcard` varchar(20) DEFAULT NULL COMMENT '会员身份证',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `create_date` datetime DEFAULT NULL COMMENT '会员办理日期',
  `gender` varchar(2) DEFAULT '1' COMMENT '性别：1男 0女',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vip
-- ----------------------------
INSERT INTO `vip` VALUES ('1', '2019061010230302', '莫容龙城', '0.9', '421123198912120012', '13212321232', '2019-06-10 10:23:03', '1');
INSERT INTO `vip` VALUES ('2', '2019061010244502', '独角大仙', '0.9', '421234199909090099', '13212321232', '2019-06-10 10:24:45', '1');
