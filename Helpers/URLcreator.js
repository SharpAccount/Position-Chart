export default {
    json: async (data) => {
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

    },
    csv: async (data) => {
        const blob = new Blob([data], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);

    },
    create: async (data, fileType) => {
        //consts => filetypes,
    }
}