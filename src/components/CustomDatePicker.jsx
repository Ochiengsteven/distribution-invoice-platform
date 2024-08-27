import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { ChevronDown } from "lucide-react";

const CustomDatePicker = () => {
  return (
    <div className="flex min-w-[150px] items-center bg-secondary rounded-3xl px-3 py-2">
      <CalendarOutlined className="text-gray-500 mr-2" />
      <DatePicker
        picker="month"
        bordered={false}
        suffixIcon={<ChevronDown size={18} />}
        className="flex-grow bg-transparent"
        dropdownClassName="custom-datepicker-dropdown"
        renderExtraFooter={() => null}
        superNextIcon={null}
        superPrevIcon={null}
        panelRender={(panelNode) => (
          <div className="custom-panel">{panelNode}</div>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
