package com.cnv.cms.mapper;
import com.cnv.cms.model.ChannelType;
public class Test {

	@org.junit.Test
	public void test() {
		ChannelType ct = ChannelType.NavChannel;
		ct.getName();
		ChannelType.valueOf(ct.toString());
	}

}
