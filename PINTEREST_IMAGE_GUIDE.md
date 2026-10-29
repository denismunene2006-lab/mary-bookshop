# 📸 Product Image Replacement Guide — Page & Palette

Your bookshop website now has **16 new products** across 6 categories. Images are currently **SVG placeholders**. Download real photos from Pinterest and save them into the matching folders below.

## 📁 Folder Structure

All images go in: `assets/images/products/`

| Category | Folder |
|----------|--------|
| Books | `assets/images/products/books/` |
| Mathematical Sets | `assets/images/products/math-sets/` |
| Pens | `assets/images/products/pens/` |
| Pencils | `assets/images/products/pencils/` |
| Notebooks | `assets/images/products/notebooks/` |
| Bags | `assets/images/products/bags/` |
| Accessories | `assets/images/products/accessories/` |

## 🔗 Pinterest Search Links

Click each link to browse Pinterest. Download images you like, rename them to match the filename, and save into the correct folder.

### 📚 Books & 📐 Mathematical Sets
| Product | Filename | Pinterest Search |
|---------|----------|-----------------|
| KCSE Revision Guide | `kcse-revision-guide.jpg` | [kcse revision guide textbook kenya](https://www.pinterest.com/search/pins/?q=kcse%20revision%20guide%20textbook%20kenya) |
| Primary School Textbook | `primary-textbook.jpg` | [primary school textbook kenya curriculum](https://www.pinterest.com/search/pins/?q=primary%20school%20textbook%20kenya%20curriculum) |
| Mathematical Set | `mathematical-set.jpg` | [mathematical geometry set school supplies](https://www.pinterest.com/search/pins/?q=mathematical%20geometry%20set%20school%20supplies) |
| Geometry Set | `geometry-set.jpg` | [geometry set compass protractor school](https://www.pinterest.com/search/pins/?q=geometry%20set%20compass%20protractor%20school) |

### ✍️ Pens & ✏️ Pencils
| Product | Filename | Pinterest Search |
|---------|----------|-----------------|
| Ballpoint Pens (Pack of 10) | `ballpoint-pens.jpg` | [ballpoint pens pack school supplies](https://www.pinterest.com/search/pins/?q=ballpoint%20pens%20pack%20school%20supplies) |
| Gel Pens Set | `gel-pens.jpg` | [gel pens set colorful stationery](https://www.pinterest.com/search/pins/?q=gel%20pens%20set%20colorful%20stationery) |
| Fountain Pen | `fountain-pen.jpg` | [fountain pen classic writing](https://www.pinterest.com/search/pins/?q=fountain%20pen%20classic%20writing) |
| HB Pencils (Pack of 12) | `hb-pencils.jpg` | [hb pencils pack school stationery](https://www.pinterest.com/search/pins/?q=hb%20pencils%20pack%20school%20stationery) |
| Colored Pencils Set | `colored-pencils.jpg` | [colored pencils set art supplies](https://www.pinterest.com/search/pins/?q=colored%20pencils%20set%20art%20supplies) |
| Mechanical Pencils | `mechanical-pencils.jpg` | [mechanical pencils school stationery](https://www.pinterest.com/search/pins/?q=mechanical%20pencils%20school%20stationery) |

### 📓 Notebooks & 🎒 Bags
| Product | Filename | Pinterest Search |
|---------|----------|-----------------|
| Exercise Books (Pack) | `exercise-books.jpg` | [exercise books school notebooks kenya](https://www.pinterest.com/search/pins/?q=exercise%20books%20school%20notebooks%20kenya) |
| Hardcover Notebook | `hardcover-notebook.jpg` | [hardcover notebook journal school](https://www.pinterest.com/search/pins/?q=hardcover%20notebook%20journal%20school) |
| School Backpack | `school-backpack.jpg` | [school backpack students kenya](https://www.pinterest.com/search/pins/?q=school%20backpack%20students%20kenya) |
| Laptop Backpack | `laptop-backpack.jpg` | [laptop backpack student computer](https://www.pinterest.com/search/pins/?q=laptop%20backpack%20student%20computer) |
| Kindergarten Bag | `kindergarten-bag.jpg` | [kindergarten school bag children colorful](https://www.pinterest.com/search/pins/?q=kindergarten%20school%20bag%20children%20colorful) |

### 🧮 Accessories
| Product | Filename | Pinterest Search |
|---------|----------|-----------------|
| Scientific Calculator | `scientific-calculator.jpg` | [scientific calculator student math](https://www.pinterest.com/search/pins/?q=scientific%20calculator%20student%20math) |

## 📋 How to Replace Images

1. Open a Pinterest link above in your browser.
2. Browse and select an image you like for each product.
3. Download the image (right-click → Save image as...).
4. Rename the file to match the filename in the table (use `.jpg` or `.png`).
5. Save it into the correct folder under `assets/images/products/`.
6. In `index.html`, update the `<img src="...">` to point to your new image file.

### Example
Download a school backpack image, save as `assets/images/products/bags/school-backpack.jpg`, then change in `index.html`:
```html
<img src="assets/images/products/bags/school-backpack.svg" alt="School backpack" loading="lazy">
```
to:
```html
<img src="assets/images/products/bags/school-backpack.jpg" alt="School backpack" loading="lazy">
```

## 💡 Image Tips
- Recommended size: 400×400 px or larger (square images work best)
- Formats: JPG or PNG
- Keep file sizes under 500KB for fast page loading
- All products use `loading="lazy"` so they won't slow down initial page load

## 🛒 Current Product List (16 products)

| # | Product | Category | Price |
|---|---------|----------|-------|
| 1 | KCSE Revision Guide | Books | KES 850 |
| 2 | Primary School Textbook | Books | KES 600 |
| 3 | Mathematical Set | Stationery | KES 350 |
| 4 | Geometry Set | Stationery | KES 280 |
| 5 | Ballpoint Pens (Pack of 10) | Stationery | KES 150 |
| 6 | Gel Pens Set | Stationery | KES 200 |
| 7 | Fountain Pen | Stationery | KES 500 |
| 8 | HB Pencils (Pack of 12) | Stationery | KES 180 |
| 9 | Colored Pencils Set | Stationery | KES 300 |
| 10 | Mechanical Pencils | Stationery | KES 250 |
| 11 | Exercise Books (Pack) | Stationery | KES 200 |
| 12 | Hardcover Notebook | Stationery | KES 400 |
| 13 | School Backpack | Accessories | KES 1,200 |
| 14 | Laptop Backpack | Accessories | KES 1,800 |
| 15 | Kindergarten Bag | Accessories | KES 900 |
| 16 | Scientific Calculator | Accessories | KES 1,500 |

**Filter categories:** All, Books, Stationery, Accessories

When you've replaced the images, your bookshop will have real product photos for school bags, mathematical sets, pens, pencils, notebooks, textbooks, and more!