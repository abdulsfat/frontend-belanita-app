import moment from "moment";
import "moment/locale/id";

moment.locale("id");

export function formatDate(dateString) {
    return moment(dateString).format("D MMMM YYYY");
}
