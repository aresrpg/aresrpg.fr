export const video = {
    bind: (el, { modifiers }) => {
        for (let mod in modifiers) el[mod] = true
    }
}