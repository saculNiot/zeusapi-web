import React from "react";
import { FillForm } from "../../utils/components";
import { FormLabel, Button as ChakraButton, Text } from "@chakra-ui/react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Space } from "antd";
import { ClientRepo } from "../../services/api/repositories/client_repo";
import { LocalStorage } from "../../utils/localStorage";
import { RoleRepo } from "../../services/api/repositories/role_repo";

export const CreateRole: React.FC<any> = () => {
	const [form] = Form.useForm();
	const roleRepo = new RoleRepo();
	const children = (
		<>
			<FormLabel>Name</FormLabel>
			<Form.Item
				name="name"
				rules={[
					{
						required: true,
						message: "Please input the name of the role",
					},
				]}
			>
				<Input placeholder="Name" style={{ width: "50%" }} />
			</Form.Item>
			
		</>
	);

	const onSubmit = async (values: any) => {
		let userId = await LocalStorage.getUserID();
		console.log(values['attribute'])
		let apiResult = await roleRepo.saveRole({
			createdById: userId ?? "",
			name: values["name"],
		});
		if (apiResult.isSuccess) {
			message.success("Role has created");
			form.resetFields();
		} else {
			message.error("Fail to save");
		}
	};

	return (
		<FillForm
			formComponents={children}
			title={"Role Details"}
			subtitle={"Please fill in the name of the role"}
			initialValue={[]}
			form={form}
			onSubmit={onSubmit}
		>
			{" "}
		</FillForm>
	);
};
