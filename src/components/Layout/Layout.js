import style from './Layout.module.css'

export function Layout({children}) {
    return <div className={style.layout}>{children}</div>
}