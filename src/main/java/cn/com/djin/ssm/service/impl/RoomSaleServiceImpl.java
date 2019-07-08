package cn.com.djin.ssm.service.impl;

import cn.com.djin.ssm.entity.RoomSale;
import cn.com.djin.ssm.service.RoomSaleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   消费记录业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomSaleServiceImpl extends BaseServiceImpl<RoomSale> implements RoomSaleService {
}
