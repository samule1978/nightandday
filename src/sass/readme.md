scss/                               # Import all ‘-dir.scss’ files
|
|- abstracts/                   
|	|- __abstracts-dir.scss     # Import all abstracts .scss files
|	|- _fonts.scss              # Font Import
|	|- _mixins.scss             # Scss Mixins
|	|- _variables.scss          # Scss Variables
|
|- base/
|	|- __base-dir.scss          # Import all base .scss files
|	|- _reset.scss              # Custom Reset/Normalize
|	|- _typography.scss         # Typography Rules
|	…                           # Etc.
|
|- components/
|	|- __components-dir.scss    # Import all components .scss files
|	|- _button.scss             # Button Styles
|	|- _input.scss              # Input Styles
|	|- _modal.scss              # Modal Styles
|	…	                    # Etc.
|
|- layouts/
|	|- __layouts-dir.scss       # Import all layouts .scss files
|	|- _footer.scss             # Footer Styles
|	|- _main-navigation.scss    # Main Navigation Styles
|	…                           # Etc.
|
|- vendor/
|	|- __vendor-dir.scss        # Import vendor folders
|	|- bourbon/                 # Bourbon
|	|- fontawesome/             # Font Awesome
|	|- neat/                    # Bourbon Neat
|	|- normalize/               # Normalize
|	…                           # Etc.
|
styles.scss                        # Main Scss File