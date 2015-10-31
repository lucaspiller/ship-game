SRC=$(wildcard *.dasm)
DCPU_FILES=$(SRC:.dasm=.dcpu)

build: $(DCPU_FILES)

%.dcpu: %.dasm
	@dasm $< $@
	@echo

clean:
	rm *.dcpu
