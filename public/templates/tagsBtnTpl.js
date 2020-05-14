const tagsBtnTpl = (baseUrl = './') => {
    return `
    <select onChange="window.location.href=this.value" class="btn btn-info mx-0 px-0 ">
        <option id="defTag" class="d-none" selected disabled>Tags...</option>
        {{ #tagArrV }}
            <option class="text-info bg-dark" value="${baseUrl}tags/?tag={{.}}">
                {{ . }}
            </option>
        {{ /tagArrV }}
    </select>
`
};
